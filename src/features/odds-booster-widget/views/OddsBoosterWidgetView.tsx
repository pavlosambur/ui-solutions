import oddsBoosterCards from "../data/oddsBoosterCards.json";
import OddsBoosterWidget from "../OddsBoosterWidget";
import { TAXONOMY_ICON_BASE_URL } from "../constants";
import { useDragScroll } from "../hooks/useDragScroll";
import type { OddsBoosterCard } from "../types";

const cards = oddsBoosterCards as OddsBoosterCard[];

const buildTaxonomyIconUrl = (imageSrc: string) => `${TAXONOMY_ICON_BASE_URL}/${imageSrc}`;

const OddsBoosterWidgetView: React.FC = () => {
    const { containerRef, dragScrollProps, isDragging, isSettling } = useDragScroll<HTMLDivElement>();
    const carouselClassName = [
        "odds-booster-widget-carousel",
        isDragging ? "odds-booster-widget-carousel--dragging" : "",
        isSettling ? "odds-booster-widget-carousel--settling" : "",
    ]
        .filter(Boolean)
        .join(" ");

    return (
        <div
            className={carouselClassName}
            ref={containerRef}
            {...dragScrollProps}
        >
            {cards.map((card) => (
                <div
                    className="odds-booster-widget-carousel__item"
                    key={`${card.eventInfo}-${card.outcomeName}-${card.previousOdd}-${card.promoOdd}`}
                >
                    <OddsBoosterWidget
                        boostedOdds={card.promoOdd}
                        competitors={card.competitors.map((competitor) => ({
                            ...competitor,
                            imageSrc: buildTaxonomyIconUrl(competitor.imageSrc),
                        }))}
                        eventInfo={card.eventInfo}
                        label={card.outcomeName}
                        marketName={card.marketName}
                        originalOdds={card.previousOdd}
                    />
                </div>
            ))}
        </div>
    );
};

export default OddsBoosterWidgetView;
