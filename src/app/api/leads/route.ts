import { env } from "@/lib/env";
import { NextRequest, NextResponse } from "next/server";

const API_KEY = env.API_KEY;
const LEADS_ENDPOINT = `${env.SERVER_URL || "https://api.skilldeck.net"}/api/v1/content/leads/submit`;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // The token is collected by the form but not verified here yet — see
    // /api/company-leads for the Turnstile check this route still needs.
    const cleanBody = { ...body };
    delete cleanBody.turnstileToken;

    // Without this the backend geolocates whoever called it — Cloudflare's edge —
    // and every lead lands in Ashburn, VA. The browser knows its own public IP
    // (cached by useIpLocation) and sends it as x-user-ip; the edge headers are
    // the fallback for when that lookup was blocked.
    const userIp =
      cleanBody.ip ||
      request.headers.get("x-user-ip") ||
      request.headers.get("cf-connecting-ip") ||
      request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      request.headers.get("x-real-ip");

    const backendHeaders: Record<string, string> = {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "Authorization": `Bearer ${API_KEY}`,
    };
    if (userIp) {
      backendHeaders["x-user-ip"] = userIp;
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    try {
      const response = await fetch(LEADS_ENDPOINT, {
        method: "POST",
        headers: backendHeaders,
        body: JSON.stringify(cleanBody),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      let data;
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        data = await response.json();
      } else {
        data = await response.text();
      }

      if (!response.ok) {
        console.error("[API/Leads] Backend rejected submission:", { status: response.status, data });
        // Pass the real status through instead of flattening everything to a 500,
        // so a validation error reads as one on the client.
        return NextResponse.json(
          {
            success: false,
            message: typeof data === "string" ? data : data?.message || "Submission failed from backend",
            backendStatus: response.status,
          },
          { status: response.status }
        );
      }

      return NextResponse.json({ success: true, data });
    } catch (fetchError: any) {
      clearTimeout(timeoutId);
      console.error("[API/Leads] Fetch error:", fetchError.message);

      if (fetchError.name === "AbortError") {
        return NextResponse.json(
          { success: false, message: "Backend request timed out (15s)." },
          { status: 504 }
        );
      }

      return NextResponse.json(
        { success: false, message: `Failed to connect to backend: ${fetchError.message}` },
        { status: 502 }
      );
    }
  } catch (error: any) {
    console.error("[API/Leads] Unexpected error:", error);
    return NextResponse.json(
      { success: false, message: error.message || "An unexpected error occurred." },
      { status: 500 }
    );
  }
}
