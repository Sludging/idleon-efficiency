import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

interface RampProps {
    pwUnits: { type: string }[],
    forcePath?: string,
    PUB_ID: string,
    WEBSITE_ID: string
}

declare const window: Window &
    typeof globalThis & {
        gtag: any
        ramp: any
        _pwGA4PageviewId: string
        dataLayer: any
    }

const Ramp = ({ pwUnits, forcePath, PUB_ID, WEBSITE_ID }: RampProps) => {
    const [rampComponentLoaded, setRampComponentLoaded] = useState(false);
    const router = useRouter();

    // Function to add ad units
    const addUnits = () => {
        window.ramp.que.push(() => {
            window.ramp.addUnits(pwUnits)
                .catch((e: any) => console.warn('Error adding units:', e))
                .finally(() => window.ramp.displayUnits());
        });
    };

    // Cleanup function to remove ad units
    const cleanUp = () => {
        if (!window.ramp?.settings?.slots) return;
        const slotsToRemove = Object.keys(window.ramp.settings.slots);
        window.ramp.destroyUnits(slotsToRemove).then(addUnits);
    };

    useEffect(() => {
        if (!PUB_ID || !WEBSITE_ID) {
            console.log('Missing Publisher Id and Website Id');
            return;
        }
        if (!rampComponentLoaded) {
            setRampComponentLoaded(true);
            window.ramp = window.ramp || {};
            window.ramp.que = window.ramp.que || [];
            window.ramp.passiveMode = true;
            window.ramp.forcePath = forcePath || window.ramp.forcePath;
            // Load the Ramp configuration script
            const configScript = document.createElement("script");
            configScript.src = `https://cdn.intergient.com/${PUB_ID}/${WEBSITE_ID}/ramp.js`;
            document.head.appendChild(configScript);

            configScript.onload = addUnits;
        }
        // Cleanup function to remove units on component unmount
        return () => { cleanUp(); }
    }, [rampComponentLoaded, router.asPath]); // Removed router.asPath to prevent unnecessary re - runs

    // Effect to handle forcePath updates
    useEffect(() => {
        let currentPath = forcePath || router.pathname;
        if (currentPath === '/' && !forcePath) return;
        if (!rampComponentLoaded) return;
        window.ramp.que.push(() => {
            window.ramp.setPath(currentPath || '');
        });
    }, [forcePath, router.pathname, rampComponentLoaded]);
    return null;
};

export default Ramp;