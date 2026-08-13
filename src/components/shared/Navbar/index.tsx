import MainNavClient from "./elements/MainNavClient";
import { getCategories } from "@/lib/categories";

interface NavbarProps {
    isHidden?: boolean;
}

export default async function MainNav({ isHidden }: NavbarProps) {
    const categories = await getCategories();
    return <MainNavClient isHidden={isHidden} categories={categories} />;
}
