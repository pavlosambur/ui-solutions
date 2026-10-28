import { IconStar } from "@/ui/Icons";

export function FavoriteButton() {
    return (
        <button
            className="[grid-area:favorite-button] self-center bg-transparent border-none cursor-pointer text-(--text) p-0"
            type="button"
        >
            <IconStar colour="currentColor" />
        </button>
    );
}
