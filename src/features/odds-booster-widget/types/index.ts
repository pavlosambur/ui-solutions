export interface OddsBoosterCompetitor {
    name: string;
    imageSrc: string;
}

export interface OddsBoosterCard {
    competitors: OddsBoosterCompetitor[];
    outcomeName: string;
    marketName: string;
    eventInfo: string;
    previousOdd: string;
    promoOdd: string;
}

export interface OddsBoosterWidgetProps {
    label: string;
    marketName: string;
    eventInfo: string;
    competitors: OddsBoosterCompetitor[];
    originalOdds: string;
    boostedOdds: string;
}
