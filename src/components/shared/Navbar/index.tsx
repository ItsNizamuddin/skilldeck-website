import MainNavClient from "./elements/MainNavClient";
import { getCategories } from "@/lib/categories";
import { getServicesCategories } from "@/lib/services";

interface NavbarProps {
    isHidden?: boolean;
}

export default async function MainNav({ isHidden }: NavbarProps) {
    const [categories, servicesCategories] = await Promise.all([
        getCategories(),
        getServicesCategories()
    ]);
    return <MainNavClient isHidden={isHidden} categories={categories} servicesCategories={servicesCategories} />;
}
