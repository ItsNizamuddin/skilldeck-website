import FAQ from "@/components/shared/FAQ";
import { figmaCategories, figmaDesigns } from "@/lib/figmaDesigns";
import {
    templateCategories,
    websiteTemplates,
    type WebsiteTemplate,
} from "@/lib/templates";
import CustomWebsiteSection from "./elements/CustomWebsiteSection";
import FeaturedTemplate from "./elements/FeaturedTemplate";
import FigmaGallery from "./elements/FigmaGallery";
import TemplateGallery from "./elements/TemplateGallery";
import TemplateIncludes from "./elements/TemplateIncludes";
import TemplateProcess from "./elements/TemplateProcess";
import TemplatesCta from "./elements/TemplatesCta";
import TemplatesHero from "./elements/TemplatesHero";

interface TemplatesWrapperProps {
    faqs: Array<{ question: string; answer: string }>;
}

export default function TemplatesWrapper({ faqs }: TemplatesWrapperProps) {
    const featured: WebsiteTemplate | undefined = websiteTemplates.find((t) => t.featured);

    return (
        <main className="flex flex-col overflow-hidden w-full bg-white">
            <TemplatesHero templates={websiteTemplates} />

            {featured && <FeaturedTemplate template={featured} />}

            <TemplateGallery templates={websiteTemplates} categories={templateCategories} />

            <FigmaGallery designs={figmaDesigns} categories={figmaCategories} />

            <TemplateIncludes />

            <TemplateProcess />

            <CustomWebsiteSection />

            {/* FAQ ships its own heading block, so this section adds none. */}
            <section className="section-y bg-white">
                <div className="container mx-auto px-4 lg:px-0">
                    <FAQ items={faqs.map((f) => ({ title: f.question, value: f.answer }))} />
                </div>
            </section>

            <TemplatesCta />
        </main>
    );
}
