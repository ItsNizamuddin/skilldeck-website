"use client";

import { ArrowLeft } from "lucide-react";

export default function BackButton() {
    return (
        <button
            type="button"
            data-no-loader="true"
            onClick={() => window.history.back()}
            className="inline-flex items-center justify-center gap-2 bg-slate-100 text-slate-700 px-6 py-3 rounded-xl font-semibold hover:bg-slate-200 transition-colors"
        >
            <ArrowLeft className="w-5 h-5" />
            Go Back
        </button>
    );
}
