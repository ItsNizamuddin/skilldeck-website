"use client";

import Ui2Hero from "./Ui2Hero";
import Ui2Impact from "./Ui2Impact";
import Ui2Problem from "./Ui2Problem";
import Ui2Outcomes from "./Ui2Outcomes";
import Ui2Approach from "./Ui2Approach";
import Ui2Strategy from "./Ui2Strategy";
import Ui2Credentials from "./Ui2Credentials";
import Ui2Addons from "./Ui2Addons";
import Ui2Faq from "./Ui2Faq";
import Ui2BottomContent from "./Ui2BottomContent";
import Ui2ChapterDots, { Ui2ChapterItem } from "./Ui2ChapterDots";
import Ui2MobileCta from "./Ui2MobileCta";
import { webchatServiceData } from "@/components/demo-ui/data";
import DemoHero from "../demo-ui/DemoHero";

export default function Ui2Root() {
    const data = webchatServiceData;

    const hasWhy = Boolean(data.whyservice?.title) || (data.whyservice?.points || []).length > 0;
    const hasBenefits = Boolean(data.benefits?.title) || (data.benefits?.points || []).length > 0;
    const hasApproach = Boolean(data.approach?.title) || (data.approach?.steps || []).length > 0;
    const hasStrategy = Boolean(data.strategy?.title) || (data.strategy?.points || []).length > 0;
    const hasCredentials =
        (data.whyopt?.points || []).length > 0 || (data.business?.points || []).length > 0;
    const hasAddons = Boolean(data.addons?.title) || (data.addons?.cards || []).length > 0;
    const hasFaq = (data.faqs?.accordions || []).some((f) => f?.title);

    const chapters: Ui2ChapterItem[] = [
        ...(hasWhy ? [{ id: "why", label: "The Reality" }] : []),
        ...(hasBenefits ? [{ id: "benefits", label: "The Outcome" }] : []),
        ...(hasApproach ? [{ id: "approach", label: "How We Work" }] : []),
        ...(hasStrategy ? [{ id: "strategy", label: "Strategy" }] : []),
        ...(hasCredentials ? [{ id: "credentials", label: "Why SkillDeck" }] : []),
        ...(hasAddons ? [{ id: "addons", label: "Add-Ons" }] : []),
        ...(hasFaq ? [{ id: "faq", label: "FAQ" }] : []),
    ];

    return (
        <>
            {/* <Ui2Hero data={data} /> */}
            <DemoHero data={data} />
            <Ui2Impact stats={data.servicestats} />
            <Ui2ChapterDots items={chapters} />

            <Ui2Problem data={data.whyservice} />
            <Ui2Outcomes data={data.benefits} />
            <Ui2Approach data={data.approach} />
            <Ui2Strategy data={data.strategy} />
            <Ui2Credentials whyopt={data.whyopt} business={data.business} />
            <Ui2Addons data={data.addons} />
            <Ui2Faq data={data.faqs} />

            <Ui2BottomContent bottomSection={data.bottomSection} internalSection={data.internalSection} />

            <Ui2MobileCta serviceName={data.name} />
        </>
    );
}
