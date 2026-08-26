import { Metadata } from "next";
import MainNav from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import DemoUiRoot from "@/components/demo-ui/DemoUiRoot";

export const metadata: Metadata = {
    title: "Service Page UI Redesign — Design Reference",
    description: "Internal design reference for the revamped Service Page UI. Not a public page.",
    robots: {
        index: false,
        follow: false,
    },
};

// Internal-only design reference — showcases the revamped Service Page UI
// against the real "Digital Marketing Service" payload. Does not touch or
// replace the production /services/[slug] route.
export default function DemoUiPage() {
    return (
        <div className="flex flex-col min-h-screen bg-white">
            <MainNav />
            <main className="flex-1">
                <DemoUiRoot />
            </main>
            <Footer />
        </div>
    );
}
