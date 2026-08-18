"use client";
import BlogSticky from '@/components/Utils/BlogSticky';
import BlogBanner from './elements/BlogBanner';
import BlogCategory, { BlogCategoryProps } from './elements/BlogCategory';
import SkillDeckIntro from './elements/SkillDeckInfo';

const CategoryAndBlogsListing = ({ categories, initialBlogs, initialCategory, initialMeta, partnerBlogs }: BlogCategoryProps) => {
    return (
        <div>
            <BlogBanner />
            <div className="container mx-auto py-4">
                <div className="lg:grid lg:grid-cols-12 gap-x-4">
                    <div className="col-span-9">
                        <BlogCategory
                            categories={categories}
                            initialBlogs={initialBlogs}
                            initialCategory={initialCategory}
                            initialMeta={initialMeta}
                            partnerBlogs={partnerBlogs}
                        />
                    </div>
                    <div className="hidden lg:block col-span-3 px-4 lg:px-0 md:py-6 lg:py-6">
                        <BlogSticky />
                    </div>
                </div>
            </div>
            <SkillDeckIntro />
        </div>
    )
}

export default CategoryAndBlogsListing