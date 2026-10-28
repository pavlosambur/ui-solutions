import { useRef, useState } from "react";
import type { PointerEvent } from "react";

const SETTLE_DURATION_MS = 360;

export function useDragScroll<TElement extends HTMLElement>() {
    const containerRef = useRef<TElement>(null);
    const dragStateRef = useRef({ scrollLeft: 0, startX: 0 });
    const settleTimeoutRef = useRef<number | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [isSettling, setIsSettling] = useState(false);

    const scrollToNearestItem = () => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        const items = Array.from(container.children);
        const containerLeft = container.getBoundingClientRect().left;
        const nearestItem = items.reduce<HTMLElement | null>((nearest, item) => {
            if (!(item instanceof HTMLElement)) {
                return nearest;
            }

            if (!nearest) {
                return item;
            }

            const itemLeft = item.getBoundingClientRect().left - containerLeft + container.scrollLeft;
            const nearestLeft = nearest.getBoundingClientRect().left - containerLeft + container.scrollLeft;

            return Math.abs(itemLeft - container.scrollLeft) < Math.abs(nearestLeft - container.scrollLeft)
                ? item
                : nearest;
        }, null);

        if (!nearestItem) {
            return;
        }

        const targetLeft = nearestItem.getBoundingClientRect().left - containerLeft + container.scrollLeft;
        setIsSettling(true);
        container.scrollTo({ behavior: "smooth", left: targetLeft });

        if (settleTimeoutRef.current) {
            window.clearTimeout(settleTimeoutRef.current);
        }

        settleTimeoutRef.current = window.setTimeout(() => {
            setIsSettling(false);
        }, SETTLE_DURATION_MS);
    };

    const handlePointerDown = (event: PointerEvent<TElement>) => {
        const container = containerRef.current;
        if (!container) {
            return;
        }

        if (settleTimeoutRef.current) {
            window.clearTimeout(settleTimeoutRef.current);
        }

        setIsSettling(false);
        dragStateRef.current = {
            scrollLeft: container.scrollLeft,
            startX: event.clientX,
        };

        container.setPointerCapture(event.pointerId);
        setIsDragging(true);
    };

    const handlePointerMove = (event: PointerEvent<TElement>) => {
        const container = containerRef.current;
        if (!container || !isDragging) {
            return;
        }

        const dragDistance = event.clientX - dragStateRef.current.startX;
        container.scrollLeft = dragStateRef.current.scrollLeft - dragDistance;
    };

    const stopDragging = (event: PointerEvent<TElement>) => {
        const container = containerRef.current;
        if (container?.hasPointerCapture(event.pointerId)) {
            container.releasePointerCapture(event.pointerId);
        }

        if (isDragging) {
            scrollToNearestItem();
        }

        setIsDragging(false);
    };

    return {
        containerRef,
        dragScrollProps: {
            onPointerCancel: stopDragging,
            onPointerDown: handlePointerDown,
            onPointerLeave: stopDragging,
            onPointerMove: handlePointerMove,
            onPointerUp: stopDragging,
        },
        isDragging,
        isSettling,
    };
}
