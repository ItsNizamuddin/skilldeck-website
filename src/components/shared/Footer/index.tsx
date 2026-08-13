import InteractiveDotBackground from "@/components/ui/InteractiveDotBackground";
import Image from "next/image";
import mainLogo from "../../../../public/logos/mainlogo.svg";
import FooterCTA from "./elements/FooterCTA";
import FooterLinks from "./elements/FooterLinks";
import ScrollToTop from "./elements/ScrollToTop";
import SocialLinks from "./elements/SocialLinks";

function Footer() {

    return (
        <footer className="bg-slate-900 relative overflow-hidden" id="footer">
            {/* Interactive Dot Grid Background */}
            <InteractiveDotBackground />

            <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

            <FooterCTA />

            <div className="relative z-10 border-t border-slate-800 py-6 md:py-12">
                <div className="container mx-auto px-2 xl:px-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
                        <div className="lg:col-span-4">
                            <div className="flex items-center gap-2 mb-4 bg-white px-4 py-2 rounded-full w-fit">
                                <Image alt="Logo" src={mainLogo} width={110} height={28} className="w-auto h-7" style={{ width: 'auto', height: 'auto' }} />
                            </div>

                            <p className="text-slate-400 text-sm mb-6 w-full md:max-w-xs">
                                The all-in-one platform for training companies. Website, LMS, CRM, and marketing—all in one place.
                            </p>

                            <SocialLinks />
                        </div>
                        <FooterLinks />
                    </div>
                </div>
            </div>

            <div className="relative z-10 border-t border-slate-800 py-3">
                <div className="container mx-auto px-4">
                    <div className="flex flex-row items-center justify-between gap-4">
                        <p className="text-slate-400 text-sm text-center md:text-left">
                            © {new Date().getFullYear()} Skilldeck. All rights reserved.
                        </p>

                        <ScrollToTop />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
