import "./OddsBoosterWidget.css";
import type { OddsBoosterWidgetProps } from "./types";
import { BoostIcon } from "./ui/BoostIcon";

export default function OddsBoosterWidget({
    label,
    marketName,
    eventInfo,
    competitors,
    originalOdds,
    boostedOdds,
}: OddsBoosterWidgetProps) {
    return (
        <section className="odds-booster-widget flex min-h-[90px] w-[332px] items-center justify-between gap-3 rounded-[20px] bg-[#202626] px-4 py-3 text-left shadow-[0_10px_24px_rgba(0,0,0,0.28)]">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex shrink-0 items-center -space-x-2">
                    {competitors.map((competitor) => (
                        <img
                            alt={competitor.name}
                            className="h-[26px] w-[26px] rounded-full object-cover"
                            key={`${competitor.name}-${competitor.imageSrc}`}
                            src={competitor.imageSrc}
                        />
                    ))}
                </div>

                <div className="min-w-0">
                    <h2 className="odds-booster-widget__title">{label}</h2>
                    <p className="m-0 max-w-[152px] text-[13px] leading-[16px] text-[#c4c9c7]">{marketName}</p>
                    <p className="m-0 max-w-[152px] text-[13px] leading-[16px] text-[#c4c9c7]">{eventInfo}</p>
                </div>
            </div>

            <div className="flex h-[48px] w-[80px] shrink-0 flex-col items-center justify-center rounded-[16px] bg-[#21614f] text-center">
                <span className="relative text-[10px] leading-[12px] font-semibold text-[#9cb4ad] after:absolute after:left-0 after:right-0 after:top-1/2 after:h-px after:bg-[#9cb4ad]">
                    {originalOdds}
                </span>
                <strong className="flex items-center gap-0.5 text-[17px] leading-[22px] font-black text-[#00ffb0]">
                    {boostedOdds}
                    <BoostIcon className="h-[16px] w-[16px] text-[#00ffb0]" />
                </strong>
            </div>
        </section>
    );
}
