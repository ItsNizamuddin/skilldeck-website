"use client";

import { useIpLocation } from "@/hooks/useIpLocation";

export default function GeoLocationInitializer() {
    useIpLocation();
    return null;
}
