import Link from "next/link";
import { Linkedin, Twitter, Instagram, Youtube } from "lucide-react";

const SocialLinks = () => {
    return (
        <div className="flex items-center gap-4">
            <Link href="#" rel="nofollow" aria-label="LinkedIn" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors">
                <Linkedin className="w-4 h-4" />
            </Link>
            <Link href="#" rel="nofollow" aria-label="Twitter" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors">
                <Twitter className="w-4 h-4" />
            </Link>
            <Link href="#" rel="nofollow" aria-label="Instagram" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors">
                <Instagram className="w-4 h-4" />
            </Link>
            <Link href="#" rel="nofollow" aria-label="YouTube" className="w-10 h-10 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white hover:border-blue-500 transition-colors">
                <Youtube className="w-4 h-4" />
            </Link>
        </div>
    );
};

export default SocialLinks;
