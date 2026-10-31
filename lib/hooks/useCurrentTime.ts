import { useSyncExternalStore } from 'react';

const listeners = new Set<() => void>();
let currentTime: number | undefined;
let interval: number | undefined;

function updateTime() {
    currentTime = Date.now();
    listeners.forEach(listener => listener());
}

function subscribe(listener: () => void) {
    listeners.add(listener);

    if (listeners.size === 1) {
        updateTime();
        interval = window.setInterval(updateTime, 1000);
    }

    return () => {
        listeners.delete(listener);

        if (listeners.size === 0) {
            clearInterval(interval);
            interval = undefined;
            currentTime = undefined;
        }
    };
}

const getSnapshot = () => currentTime;
const getServerSnapshot = () => undefined;

export default function useCurrentTime(): number | undefined {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
