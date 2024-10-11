'use client'
 
import { dark } from 'grommet'
import { deepMerge } from 'grommet/utils';
import { Rubik } from 'next/font/google';
import { css } from 'styled-components';
 
const rubik = Rubik({ subsets: ['latin'], weight: ["400", "500", "700"], display: "swap" })

export const customTheme = deepMerge(dark, {
    global: {
        font: {
            family: rubik.style.fontFamily,
            size: "14px",
        },
        elevation: {
            dark: {
                navigation: '-7px 8px 16px 0 rgba(0,0,0,0.17)',
                dropdown: 'rgb(1, 4, 9) 0px 8px 24px 0px',
            }
        },
        colors: {
            text: {
                dark: "#efefef",
                light: '#444444'
            },
            "brand": "#0376E3",
            "accent-1": "#FF3E82",
            "accent-2": "#BEC2CC",
            "accent-3": "#6B747F",
            "accent-4": "#22252B",
            "green-1": "#668e29",
            "green-2": "#20DB93",
            "orange-1": "#cb4b0f",
            "grey-1": "#30333A",
            "grey-2": "#828D99",
            "grey-3": "#4C4F54",
            "dark-1": "#1E2127",
            "dark-2": "#1B1D24",
            "dark-3": "#1B1C22",
            "aqua": "#c9fffd",
            "yellow-1": "#ffecc9",
            "background": "#1B1D24",
            "white-1": "#30333A",
            "white-2": "#efefef",
            "placeholder": "#96979a",
            "Common": "#d5d5d5",
            "Uncommon": "#7be08e",
            "Rare": "#7897d5",
            "Epic": "#bc93ff",
            "Legendary": "#e49c5f",
            "blue-1": "#19243A",
            "blue-2": "#283F70",
            "blue-3": "#6dcdff",
            "gold-1": "#ffc142",
            "stamp-positive-1": "#137547",
            "stamp-positive-2": "#054a29",
            "stamp-negative-1": "#d62839",
            "stamp-negative-2": "#780000",
        }
    },
    notification: {
        toast: {
            container: {
                elevation: 'navigation',
                width: 'large',
                background: 'dark-2',
                pad: 'medium',
                border: {
                    color: 'grey-1'
                }
            }
        }
    },
    formField: {
        border: undefined
    },
    button: {
        border: {
            radius: undefined,
        },
        primary: {
            extend: ({ }) => css`
          font-size: 16px;
        `
        }
    },
    tab: {
        active: {
            background: 'dark-1',
            color: 'brand',
        },
        border: {
            side: "bottom",
            color: "none",
            active: {
                color: "brand"
            }
        },
        color: 'accent-2',
        extend: ({ }) => css`
        font-size: 16px;
      `,
    },
});