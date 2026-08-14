import { seoContentMap } from './seo-content';

export interface SEOData {
    title: string;
    content: string; // Changed to string as we now use HTML strings
    cityContent?: string;
}

export const globalSeoRegistry: Record<string, SEOData> = {
    '/': {
        title: "Unlock Your Training Company’s Potential with a Fully Automated, Plug & Play Platform",
        content: seoContentMap['/'],
        cityContent: '<a href=\"https://skilldeck.net/competitive/aiims-coaching-centres/luxembourg\">Aiims Coaching Centres training institute in luxembourg</a> | <a href=\"https://skilldeck.net/agile/asm-training/qatar\">asm training in qatar</a> | <a href=\"https://skilldeck.net/marketing/sfmc-training/new-york\">Sfmc training in new-york</a> | <a href=\"https://skilldeck.net/healthcare/pharmacovigilance-database-training/italy\">pharmacovigilance database training in italy</a><a href=\"https://skilldeck.net/healthcare/clinical-sas-training/denmark\">clinical sas course in denmark</a> | <a href=\"https://skilldeck.net/agile/pal-training/saudi-arabia\">pal course online in saudi-arabia</a> | <a href=\"https://skilldeck.net/agile/csd-training/canada\">csd training in canada</a> | <a href=\"https://skilldeck.net/vlsi/rtl-design-verification-course/washington\">Rtl Design Verification certification provider in washington</a> | <a href=\"https://skilldeck.net/agile/csd-training/cameroon\">csd course job assistance in cameroon</a> | <a href=\"https://skilldeck.net/agile/safe-ai-empowered-popm-course/ontario\">safe ai empowered popm training institute in ontario</a>'
    },
};



export function getSeoDataByPath(path: string): SEOData | null {
    // Exact match
    if (globalSeoRegistry[path]) {
        return globalSeoRegistry[path];
    }

    // Handle trailing slashes
    const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : path;
    if (globalSeoRegistry[normalizedPath]) {
        return globalSeoRegistry[normalizedPath];
    }

    return null;
}


// Manual mapping for paths not in the global registry
export const manualCityContentMap: Record<string, string> = {
    '/companies': '<a href=\"https://skilldeck.net/agile/icp-tst-training\">icp tst course comparision</a> | <a href=\"https://skilldeck.net/agile/safe-ai-empowered-rte-training/qatar\">safe ai empowered rte placement course in qatar</a> | <a href=\"https://skilldeck.net/marketing/affiliate-marketing-training/australia\">Affiliate Marketing course job assistance in australia</a> | <a href=\"https://skilldeck.net/agile/cspo-training\">cspo training institute</a><a href=\"https://skilldeck.net/agile/icp-acc-training/saudi-arabia\">icp acc course in saudi-arabia</a> | <a href=\"https://skilldeck.net/project-management/prince2-agile-practitioner-training/united-arab-emirates\">prince2 agile practitioner course comparision in united-arab-emirates</a> | <a href=\"https://skilldeck.net/agile/safe-for-teams-training/cochin\">safe for teams training institute in cochin</a> | <a href=\"https://skilldeck.net/healthcare/pharmacovigilance-database-training/france\">pharmacovigilance database institute in france</a> | <a href=\"https://skilldeck.net/marketing/amazon-seller-central-course/south-africa\">Amazon Seller Central placement course in south-africa</a> | <a href=\"https://skilldeck.net/marketing/seo-training/indonesia\">Seo institute in indonesia</a>',
    '/blog': '<a href=\"https://skilldeck.net/vlsi/asic-verification-course/south-africa\">Asic Verification institute in south-africa</a> | <a href=\"https://skilldeck.net/agile/agile-pm-foundation-course/india\">agile pm foundation course in india</a> | <a href=\"https://skilldeck.net/project-management/pmp-certification-training/cochin\">pmp training institute in cochin</a> | <a href=\"https://skilldeck.net/marketing/amazon-seller-central-course/saudi-arabia\">Amazon Seller Central training institute in saudi-arabia</a><a href=\"https://skilldeck.net/vlsi/physical-design-verification-course/california\">Physical Design Verification course in california</a> | <a href=\"https://skilldeck.net/agile/pspo-training/hyderabad\">pspo course in hyderabad</a> | ',
    '/careers': '<a href=\"https://skilldeck.net/agile/safe-ai-empowered-scrum-master-training/poland\">safe ai empowered scrum master course online in poland</a> | <a href=\"https://skilldeck.net/healthcare/clinical-sas-training/italy\">clinical sas institute in italy</a> | <a href=\"https://skilldeck.net/agile/pspo-training/washington\">pspo training in washington</a> | <a href=\"https://skilldeck.net/marketing/digital-marketing-training/chennai\">Digital Marketing classes in chennai</a><a href=\"https://skilldeck.net/finance/ea-us-training/malaysia\">ea us institute in malaysia</a> | <a href=\"https://skilldeck.net/marketing/ecommerce-marketing-course/italy\">Ecommerce Marketing course in italy</a> | <a href=\"https://skilldeck.net/agile/asf-training/morocco\">asf classes in morocco</a> | <a href=\"https://skilldeck.net/agile/cspo-training/argentina\">cspo certification provider in argentina</a> | <a href=\"https://skilldeck.net/agile/safe-for-teams-training/nigeria\">safe for teams training institute in nigeria</a> | <a href=\"https://skilldeck.net/project-management/pfmp-training/morocco\">pfmp training certification provider in morocco</a>',
};

export function getCityContentByPath(path: string): string | null {
    const normalizedPath = path.endsWith('/') && path !== '/' ? path.slice(0, -1) : (path || '/');
    if (globalSeoRegistry[normalizedPath]?.cityContent) return globalSeoRegistry[normalizedPath].cityContent;
    return manualCityContentMap[normalizedPath] || null;
}