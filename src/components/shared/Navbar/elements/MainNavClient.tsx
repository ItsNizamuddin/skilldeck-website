"use client";

import { Button } from "@/components/ui/Button";
import { HoveredLink, MenuItem, Menu as NavMenu, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import { ArrowRight, Layers, Layout, Menu, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import mainLogo from "../../../../../public/logos/mainlogo.svg";
import { MobileMenu } from "./MobileMenu";
import NavCategoriesDropdown from "./NavCategoriesDropdown";
import { services } from "./navConfig";

interface Props {
    isHidden?: boolean;
    categories: any[];
}

function MainNav({ isHidden, categories }: Props) {
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [active, setActive] = useState<string | null>(null);
    const [isCompaniesLoading, setIsCompaniesLoading] = useState(false);

    const handleCompaniesClick = () => {
        if (pathname !== "/companies") {
            setIsCompaniesLoading(true);
        }
    };

    const sortedCategories = [...categories]
        .sort((a, b) => (a.order || 0) - (b.order || 0))
        .map(cat => ({
            ...cat,
            courses: [...(cat.courses || [])].sort((a, b) => (a.order || 0) - (b.order || 0))
        }));

    const isHomePage = pathname === "/";

    const isBusinessPage = pathname.startsWith("/blog") ||
        pathname.startsWith("/companies") ||
        (pathname !== "/" && !["/about-us", "/contact-us", "/services", "/register", "/careers", "/web-templates"].some(p => pathname.startsWith(p)));

    const ctaText = isBusinessPage ? "List your Institute" : "Try for free";

    const scrollToSection = (sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            const navHeight = 100;
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - navHeight,
                behavior: "smooth"
            });
        }
    };

    const handleNavClick = (e: React.MouseEvent, sectionId: string | null) => {
        if (isHomePage && sectionId) {
            e.preventDefault();
            scrollToSection(sectionId);
        }
        closeMenu();
    };

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = () => {
        setIsMenuOpen(false);
        if (typeof document !== "undefined") {
            document.body.style.overflow = "auto";
        }
    };

    const openMenu = () => {
        setIsMenuOpen(true);
        if (typeof document !== "undefined") {
            document.body.style.overflow = "hidden";
        }
    };

    useEffect(() => {
        let touchStartX = 0;
        let touchStartY = 0;

        const handleTouchStart = (e: TouchEvent) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        };

        const handleTouchEnd = (e: TouchEvent) => {
            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;

            const diffX = touchStartX - touchEndX; // positive for right-to-left
            const diffY = Math.abs(touchStartY - touchEndY);

            // Swipe from right edge to left (Open Menu)
            if (
                diffX > 50 &&
                diffY < 60 &&
                touchStartX > window.innerWidth * 0.8 &&
                !isMenuOpen
            ) {
                openMenu();
            }

            // Swipe from left to right (Close Menu)
            if (
                diffX < -50 &&
                diffY < 60 &&
                isMenuOpen
            ) {
                closeMenu();
            }
        };

        window.addEventListener("touchstart", handleTouchStart, { passive: true });
        window.addEventListener("touchend", handleTouchEnd, { passive: true });

        return () => {
            window.removeEventListener("touchstart", handleTouchStart);
            window.removeEventListener("touchend", handleTouchEnd);
        };
    }, [isMenuOpen]);

    useEffect(() => {
        closeMenu();
        setIsCompaniesLoading(false);
    }, [pathname]);

    return (
        <>
            {/* Main Navbar */}
            <header
                id="main-navbar"
                className={cn(
                    "fixed -top-4 md:-top-4 left-0 right-0 z-50 px-2 py-4 transition-all duration-500 ease-in-out",
                    isHidden ? "-translate-y-full opacity-0 invisible pointer-events-none" : "translate-y-0 opacity-100 visible pointer-events-auto"
                )}
            >
                <nav className="container mx-auto pt-2 ">
                    <div className={cn(
                        "bg-white/95 backdrop-blur-md rounded-full px-4 md:px-6 shadow-lg border border-gray-100 flex items-center justify-between transition-all duration-300",
                        isScrolled && "shadow-xl"
                    )}>
                        <Link href="/" className="flex items-center gap-2 flex-shrink-0" data-no-loader="true">
                            <Image src={mainLogo} alt="Logo" width={128} height={32} className="w-28 md:w-32 h-auto" priority style={{ height: 'auto' }} />
                        </Link>

                        {/* Desktop Navigation */}
                        <div className="hidden lg:flex items-center">
                            <NavMenu setActive={setActive}>
                                <MenuItem setActive={setActive} active={active} item="Services" centered>
                                    <div className="w-[85vw] max-w-5xl bg-white rounded-xl grid grid-cols-12 gap-6 p-4 h-full border border-slate-100 shadow-xl">
                                        <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
                                            <Link href="/services" className="flex-1 relative overflow-hidden rounded-2xl p-6 group">
                                                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-purple-600 transition-transform duration-500 group-hover:scale-110" />
                                                <div className="relative z-10 h-full flex flex-col justify-between text-white">
                                                    <div>
                                                        <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-4">
                                                            <Layers className="w-6 h-6" />
                                                        </div>
                                                        <h4 className="text-xl font-bold mb-2">All Services</h4>
                                                        <p className="text-sm text-white leading-relaxed">
                                                            Explore our comprehensive suite of tools designed to scale your business.
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2 text-sm font-semibold mt-4">
                                                        <span>View Catalog</span>
                                                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                                                    </div>
                                                </div>
                                            </Link>

                                            <Link href="/web-templates" className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 group hover:border-blue-200 hover:shadow-lg transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <Layout className="w-5 h-5 text-blue-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 group-hover:text-blue-600 transition-colors">Web Templates</h4>
                                                        <p className="text-xs text-slate-500">Premium ready-to-use designs</p>
                                                    </div>
                                                </div>
                                            </Link>

                                            <Link href="/services/marketplace" className="relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-slate-50 to-slate-100 border border-slate-200 group hover:border-purple-200 hover:shadow-lg transition-all">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                                                        <ShoppingCart className="w-5 h-5 text-purple-600" />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-slate-800 group-hover:text-purple-600 transition-colors">Marketplace</h4>
                                                        <p className="text-xs text-slate-500">Discover and buy tools</p>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>

                                        <div className="col-span-12 lg:col-span-9 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
                                            <div className="px-2 pb-2 text-xs font-semibold text-slate-400 uppercase tracking-wider col-span-full">
                                                Core Platform
                                            </div>
                                            {services.slice(0, 4).map((service) => (
                                                <ProductItem
                                                    key={service.name}
                                                    title={service.name}
                                                    description={service.description}
                                                    href={service.href}
                                                    icon={service.icon}
                                                />
                                            ))}

                                            <div className="px-2 pb-2 pt-4 text-xs font-semibold text-slate-400 uppercase tracking-wider col-span-full border-t border-slate-100 mt-2">
                                                Additional Services
                                            </div>
                                            {services.slice(4).map((service) => (
                                                <ProductItem
                                                    key={service.name}
                                                    title={service.name}
                                                    description={service.description}
                                                    href={service.href}
                                                    icon={service.icon}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </MenuItem>

                                <HoveredLink
                                    href="/companies"
                                    onClick={handleCompaniesClick}
                                >
                                    <span className="relative inline-block py-1">
                                        Companies
                                    </span>
                                </HoveredLink>

                                <HoveredLink href={isHomePage ? "#features" : "/#features"} data-no-loader="true" onClick={(e: React.MouseEvent) => handleNavClick(e, "features")}>
                                    Features
                                </HoveredLink>

                                <HoveredLink href={isHomePage ? "#plans" : "/#plans"} data-no-loader="true" onClick={(e: React.MouseEvent) => handleNavClick(e, "plans")}>
                                    Plans
                                </HoveredLink>

                                <HoveredLink href={isHomePage ? "#platform" : "/#platform"} data-no-loader="true" onClick={(e: React.MouseEvent) => handleNavClick(e, "platform")}>
                                    Platform
                                </HoveredLink>

                                <MenuItem setActive={setActive} active={active} item="About">
                                    <div className="flex flex-col space-y-3 min-w-[180px] bg-white p-3 shadow-lg rounded-md border border-slate-100">
                                        <HoveredLink href="/about-us">About Us</HoveredLink>
                                        <HoveredLink href="/contact-us">Contact Us</HoveredLink>
                                        <HoveredLink href="/blog">Blog</HoveredLink>
                                        <HoveredLink href="/careers">Careers</HoveredLink>
                                    </div>
                                </MenuItem>

                                <NavCategoriesDropdown
                                    initialCategories={sortedCategories}
                                    active={active}
                                    setActive={setActive}
                                />
                            </NavMenu>
                        </div>

                        <div className="flex flex-row items-center gap-2">
                            <div className="hidden lg:flex items-center">
                                <Button
                                    as={Link}
                                    href="https://knowledge.skilldeck.net/"
                                    target="_blank"
                                    rel="nofollow"
                                    variant="outline"
                                    size="md"
                                    className="rounded-full"
                                >
                                    SaaS Guide
                                </Button>
                            </div>
                            <div className="hidden lg:flex items-center">
                                <Button
                                    as={Link}
                                    href="/register"
                                    rel="nofollow"
                                    variant="primary"
                                    size="md"
                                    className="flex items-center gap-2 rounded-full"
                                >
                                    {ctaText}
                                    <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center">
                                        <ArrowRight className="w-3 h-3" />
                                    </div>
                                </Button>
                            </div>
                        </div>

                        {/* Mobile Menu Button */}
                        <button
                            type="button"
                            data-no-loader="true"
                            onClick={openMenu}
                            className="lg:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
                            aria-label="Open menu"
                        >
                            <Menu className="h-6 w-6" />
                        </button>
                    </div>
                </nav>
            </header>

            {/* Mobile Menu Slide-in Drawer */}
            <MobileMenu
                isMenuOpen={isMenuOpen}
                closeMenu={closeMenu}
                ctaText={ctaText}
                categories={categories}
                isHomePage={isHomePage}
                isCompaniesLoading={isCompaniesLoading}
                handleCompaniesClick={handleCompaniesClick}
                handleNavClick={handleNavClick}
            />
        </>
    );
}

export default MainNav;
