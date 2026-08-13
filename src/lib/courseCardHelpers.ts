export function formatDate(iso?: string): string {
    if (!iso) return "—";
    try {
        const date = new Date(iso);
        if (isNaN(date.getTime())) return "—";
        return date.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        });
    } catch {
        return "—";
    }
}

export function getCurrencySymbol(code?: string): string {
    if (!code) return "₹";
    const c = code.toUpperCase();
    if (c === "USD") return "$";
    if (c === "EUR") return "€";
    if (c === "GBP") return "£";
    if (c === "INR") return "₹";
    return "$"; // Fallback to USD instead of INR
}

export function formatPrice(num: number, symbol: string): string {
    try {
        const locale = symbol === "₹" ? "en-IN" : "en-US";
        return `${symbol}${num.toLocaleString(locale)}`;
    } catch {
        return `${symbol}${num}`;
    }
}

export function formatNumber(num: number, symbol: string): string {
    try {
        const locale = symbol === "₹" ? "en-IN" : "en-US";
        return num.toLocaleString(locale);
    } catch {
        return String(num);
    }
}
