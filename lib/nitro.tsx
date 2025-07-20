"use client"

import { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';


declare const window: Window &
    typeof globalThis & {
        gtag: any
        nitroAds: any
        _pwGA4PageviewId: string
        dataLayer: any
    }

const adUnits: Record<string, any> = {
    "left-side-rail": {
        "refreshTime": 30,
        "format": "rail",
        "rail": "left",
        "railOffsetTop": 0,
        "railOffsetBottom": 0,
        "railSpacing": 20,
        "railCollisionWhitelist": ["*"],
        "mediaQuery": "(min-width: 1750px)",
        "sizes": [
            [
                "160",
                "600"
            ]
        ],
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "bottom-right"
        }
    },
    "right-side-rail": {
        "refreshTime": 30,
        "format": "rail",
        "rail": "right",
        "railOffsetTop": 0,
        "railOffsetBottom": 100,
        "railSpacing": 20,
        "railCollisionWhitelist": ["*"],
        "mediaQuery": "(min-width: 1750px)",
        "sizes": [
            [
                "160",
                "600"
            ]
        ],
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "bottom-right"
        }
    },
    "floating-video-player": {
        "refreshTime": 30,
        "format": "floating",
        "report": {
            "enabled": true,
            "icon": true,
            "wording": "Report Ad",
            "position": "top-left"
        }
    }
}

const Nitro = ({ demo = false }: { demo: boolean }) => {
    const [nitroComponentLoaded, setNitroComponentLoaded] = useState(false);
    const [currentPath, setCurrentPath] = useState("/");
    const pathname = usePathname();

    useEffect(() => {
        if (pathname !== currentPath) {
            setCurrentPath(pathname);
            if (window.nitroAds) {
                window.nitroAds.navigate();
            }
        }
    }, [pathname]);

    // Function to add ad units
    const addUnits = () => {
        Object.keys(adUnits).forEach(key => {
            window.nitroAds.createAd(key, {
                ...adUnits[key],
                demo: demo
            });
        });
    };

    useEffect(() => {
        if (!nitroComponentLoaded) {
            setNitroComponentLoaded(true);
            window.nitroAds = window.nitroAds || {};
            window.nitroAds.createAd = function () {
                return new Promise(e => {
                    window.nitroAds.queue.push(["createAd", arguments, e])
                })
            };
            window.nitroAds.addUserToken = function () {
                window.nitroAds.queue.push(["addUserToken", arguments])
            };
            window.nitroAds.queue = [];
            // Load the Ramp configuration script
            const configScript = document.createElement("script");
            configScript.src = `https://s.nitropay.com/ads-2146.js`;
            configScript.setAttribute("data-cfasync", "false");
            document.head.appendChild(configScript);

            configScript.onload = addUnits;
        }
    }, [nitroComponentLoaded]);

    return null;
};

export default Nitro;
