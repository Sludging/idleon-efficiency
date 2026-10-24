import { useSyncExternalStore } from 'react';

const subscribe = () => () => {};
const getSnapshot = () => true;
const getServerSnapshot = () => false;

export default function useHydrated(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
