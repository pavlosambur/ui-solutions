from __future__ import annotations

import json
from html.parser import HTMLParser
from pathlib import Path


SOURCE_PATH = Path("tmp/code.html")
OUTPUT_PATH = Path("src/features/odds-booster-widget/data/oddsBoosterCards.json")


class OddsBoosterParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.cards: list[dict[str, object]] = []
        self.current_card: dict[str, object] | None = None
        self.current_text_field: str | None = None
        self.image_src: str | None = None

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attr_map = dict(attrs)
        test_id = attr_map.get("data-testid")

        if test_id == "odds-booster-slim-card":
            self.current_card = {
                "competitors": [],
                "outcomeName": "",
                "marketName": "",
                "eventInfo": "",
                "previousOdd": "",
                "promoOdd": "",
            }
            return

        if self.current_card is None:
            return

        if tag == "img":
            alt = attr_map.get("alt")
            src = attr_map.get("src") or self.image_src
            if alt and src:
                competitors = self.current_card["competitors"]
                if isinstance(competitors, list):
                    competitors.append({"name": alt, "imageSrc": src})
            return

        if tag == "source" and attr_map.get("srcset"):
            self.image_src = attr_map["srcset"]
            return

        field_by_test_id = {
            "odds-booster-outcome-name": "outcomeName",
            "odds-booster-market-name": "marketName",
            "odds-booster-card-event-info": "eventInfo",
            "custom-outcome-previous-odd": "previousOdd",
            "custom-outcome-promo-odd": "promoOdd",
        }

        if test_id in field_by_test_id:
            self.current_text_field = field_by_test_id[test_id]

    def handle_data(self, data: str) -> None:
        if self.current_card is None or self.current_text_field is None:
            return

        text = data.strip()
        if not text:
            return

        self.current_card[self.current_text_field] = text

    def handle_endtag(self, tag: str) -> None:
        if tag == "span":
            self.current_text_field = None
            return

        if tag == "picture":
            self.image_src = None
            return

        if tag == "div" and self.current_card is not None and self._card_is_complete(self.current_card):
            self.cards.append(self.current_card)
            self.current_card = None

    @staticmethod
    def _card_is_complete(card: dict[str, object]) -> bool:
        competitors = card.get("competitors")
        return (
            isinstance(competitors, list)
            and len(competitors) >= 2
            and all(card.get(field) for field in ["outcomeName", "marketName", "eventInfo", "previousOdd", "promoOdd"])
        )


def main() -> None:
    parser = OddsBoosterParser()
    parser.feed(SOURCE_PATH.read_text(encoding="utf-8"))

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(parser.cards, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Parsed {len(parser.cards)} odds booster cards into {OUTPUT_PATH}")


if __name__ == "__main__":
    main()
