import { env } from '@/lib/env';
import { NextRequest, NextResponse } from 'next/server';

// Ensure env variables are properly loaded or provide defaults/checks
const API_KEY = env.API_KEY;
const TURNSTILE_SECRET_KEY = env.TURNSTILE_SECRET_KEY || '';
const LEADS_ENDPOINT = `${env.SERVER_URL || 'https://api.skilldeck.net'}/api/v1/skilldeck/leads`;

// Verify Turnstile token with Cloudflare
async function verifyTurnstileToken(token: string): Promise<boolean> {
    if (!TURNSTILE_SECRET_KEY) {
        console.warn('[API/CompanyLeads] TURNSTILE_SECRET_KEY is not set, skipping verification');
        return true;
    }

    try {
        const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: new URLSearchParams({
                secret: TURNSTILE_SECRET_KEY,
                response: token,
            }),
        });

        const data = await response.json();
        return data.success === true;
    } catch (error) {
        console.error('[API/CompanyLeads] Turnstile verification error:', error);
        return false;
    }
}

export async function POST(req: NextRequest) {
    const targetUrl = LEADS_ENDPOINT;

    try {
        const body = await req.json();

        // Verify Turnstile token
        const turnstileToken = body.turnstileToken;
        if (turnstileToken) {
            const isValid = await verifyTurnstileToken(turnstileToken);
            if (!isValid) {
                console.warn('[API/CompanyLeads] Turnstile verification failed');
                return NextResponse.json({ message: 'Captcha verification failed. Please try again.' }, { status: 400 });
            }
        } else if (TURNSTILE_SECRET_KEY) {
            console.warn('[API/CompanyLeads] No Turnstile token provided');
            return NextResponse.json({ message: 'Captcha verification required.' }, { status: 400 });
        }

        // Remove turnstileToken from body before forwarding to backend
        const { turnstileToken: _, ...cleanBody } = body;

        // Get the x-user-ip header from the incoming request or use the one from the body (client-side)
        const userIp = cleanBody.ip || req.headers.get('x-user-ip');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 15000); // 15s timeout

        // Build headers for backend request
        const backendHeaders: Record<string, string> = {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
            'Authorization': `Bearer ${API_KEY}`,
        };

        // Forward the x-user-ip header if present
        if (userIp) {
            backendHeaders['x-user-ip'] = userIp;
        }

        try {
            const response = await fetch(targetUrl, {
                method: 'POST',
                headers: backendHeaders,
                body: JSON.stringify(cleanBody),
                signal: controller.signal
            });

            clearTimeout(timeoutId);

            let data;
            const contentType = response.headers.get("content-type");
            if (contentType && contentType.indexOf("application/json") !== -1) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            if (!response.ok) {
                console.error('[API/CompanyLeads] Backend rejected submission:', {
                    status: response.status,
                    data: data
                });
                return NextResponse.json({
                    message: typeof data === 'string' ? data : (data.message || 'Submission failed from backend'),
                    backendStatus: response.status
                }, { status: response.status });
            }

            return NextResponse.json(data);

        } catch (fetchError: any) {
            clearTimeout(timeoutId);
            console.error('[API/CompanyLeads] Fetch error:', fetchError.message);

            if (fetchError.name === 'AbortError') {
                return NextResponse.json({ message: 'Backend request timed out (15s). Please check server connectivity.' }, { status: 504 });
            }

            // Return actual connection error
            return NextResponse.json({
                message: `Failed to connect to backend: ${fetchError.message}`,
                code: fetchError.code
            }, { status: 502 });
        }
    } catch (error: any) {
        console.error('[API/CompanyLeads] Unexpected error:', error);
        return NextResponse.json({ message: 'Internal Server Error', error: error.message }, { status: 500 });
    }
}
