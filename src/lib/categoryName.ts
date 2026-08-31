/**
 * Category names arrive from the CMS already suffixed ("Marketing Courses"),
 * so headings that append their own noun read as "Marketing Courses Courses".
 * Strip the trailing noun before composing such a heading.
 */
export function bareCategoryName(name?: string): string {
    if (!name) return "";
    return name.replace(/\s+(courses?|trainings?|programs?|programmes?)\s*$/i, "").trim() || name.trim();
}
