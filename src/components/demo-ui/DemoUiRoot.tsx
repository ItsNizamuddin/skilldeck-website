"use client";

import ServiceLandingView from "./ServiceLandingView";
import { webchatServiceData } from "./data";

export default function DemoUiRoot() {
    return <ServiceLandingView data={webchatServiceData} />;
}
