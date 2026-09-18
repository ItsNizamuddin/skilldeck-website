/**
 * Course names for headings.
 *
 * The CMS stores a course name that already carries its own trailing noun —
 * "Certified Scrum Developer Training", "Prompt Engineering Course" — while the
 * headings around the partner sections supply their own ("… Training Institutes",
 * "… Batches & Course Fee"). Pasting the two together reads as "Prompt
 * Engineering Course Training Institutes", so the name is trimmed back to its
 * subject first.
 */

/** "clinical-sas-training" -> "Clinical Sas Training" */
export function titleFromSlug(slug: string): string {
    return (slug || "")
        .split("-")
        .filter(Boolean)
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
}

// Anchored with (?:^|\s+) rather than \s+ so a name that is nothing but the noun
// still matches, while "Retraining" is not chewed down to "Re".
const TRAILING_NOUNS = /(?:^|\s+)(trainings?|courses?|certifications?|programs?|bootcamps?)$/i;

/**
 * The subject of a course, with its trailing noun removed.
 *
 * Falls back to the slug when the CMS has no name — several courses return null.
 * Returns "" when the name was nothing but a noun, which leaves the caller's
 * heading reading exactly as it did before any course was known.
 */
export function courseSubject(courseTitle: string | undefined, courseSlug?: string): string {
    const base = (courseTitle || "").trim() || titleFromSlug(courseSlug || "");
    let out = base;
    // Repeat: "Digital Marketing Training Course" sheds both.
    while (TRAILING_NOUNS.test(out)) {
        out = out.replace(TRAILING_NOUNS, "").trim();
    }
    return out;
}
