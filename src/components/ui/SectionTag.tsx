
interface SectionTagProps {
    text: string;
}

export default function SectionTag({ text }: SectionTagProps) {
    return (
        <div className="flex items-center gap-2 text-[11px] 2xl:text-xs font-semibold text-[#] uppercase">
            <span className="w-5 h-[3px] bg-[linear-gradient(125deg,rgba(92,63,250,1)_0%,rgba(203,59,149,1)_48%,rgba(254,106,27,1)_100%)] rounded-full shrink-0" />
            <span>{text}</span>
        </div>
    );
}
