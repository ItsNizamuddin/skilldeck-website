import FloatingIconsHero from "@/components/ui/FloatingIconsHero";

export default function HeroSection() {
    return (
        <FloatingIconsHero
            title={
                <>
                    <span className="text-slate-900">One Platform. </span>
                    <span className="bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] bg-clip-text text-transparent whitespace-nowrap">
                        Zero Chaos.
                    </span>
                    <br />
                    <span className="text-lg md:text-xl 2xl:text-2xl font-bold text-slate-700 mt-4 block">
                        Run Your Training Business at{" "}
                        <span className="text-blue-600">90% Lower Cost</span>
                    </span>
                </>
            }
            subtitle={
                <>
                    90% of training companies overspend on the wrong technology, bloated marketing teams,
                    and fragmented tools. <span className="font-semibold text-slate-800">Skilldeck replaces 10+ tools</span> with
                    one powerful platform.
                </>
            }
            ctaText="Experience the Platform For Free"
            ctaHref="/register"
            secondaryCtaText="Explore Features"
            secondaryCtaHref="#features"
            className="pt-20 px-4 md:pt-36"
        />
    );
}
