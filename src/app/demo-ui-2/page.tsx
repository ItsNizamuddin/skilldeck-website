import { Metadata } from "next";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import Ui2Root from "@/components/demo-ui-2/Ui2Root";

export const metadata: Metadata = {
    title: "Service Page UI Redesign v2 — Design Reference",
    description: "Internal design reference for the revamped Service Page UI (v2, free-hand redesign). Not a public page.",
    robots: {
        index: false,
        follow: false,
    },
};

// Internal-only design reference #2 — a from-scratch redesign of the Service
// Page UI (no reference to /demo-ui), against the real "Digital Marketing
// Service" payload. Does not touch or replace the production
// /services/[slug] route, nor /demo-ui.
export default function DemoUi2Page() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <MainNav />
            <main className="flex-1">
                <Ui2Root />
            </main>
            <Footer />
        </div>
    );
}
