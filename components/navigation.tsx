"use client"

import { Box, Button, Menu, Nav, ResponsiveContext, Text, ThemeContext } from "grommet"
import { FormDown, Menu as MenuIcon } from "grommet-icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";

const navItems = [
    {
        link: "/", label: "Dashboard"
    },
    {
        link: "/world-1", label: "W1", subLinks: [
            { subLink: "/stamps", label: "Stamps" },
            { subLink: "/forge", label: "Forge" },
            { subLink: "/anvil", label: "Anvil" },
        ]
    },
    {
        link: "/world-2", label: "W2", subLinks: [
            { subLink: "/alchemy", label: "Alchemy" },
            { subLink: "/arcade", label: "Arcade" },
        ]
    },
    {
        link: "/world-3", label: "W3", subLinks: [
            { subLink: "/construction", label: "Construction" },
            { subLink: "/worship", label: "Worship" },
            { subLink: "/trapping", label: "Trapping" },
            { subLink: "/equinox", label: "Equinox" },
        ]
    },
    {
        link: "/world-4", label: "W4", subLinks: [
            { subLink: "/cooking", label: "Cooking" },
            { subLink: "/lab", label: "Lab" },
            { subLink: "/breeding", label: "Breeding" },
            { subLink: "/rift", label: "Rift" },
        ]
    },
    {
        link: "/world-5", label: "W5", subLinks: [
            { subLink: "/divinity", label: "Divinity" },
            { subLink: "/sailing", label: "Sailing" },
            { subLink: "/gaming", label: "Gaming" },
        ]
    },
    {
        link: "/world-6", label: "W6", subLinks: [
            { subLink: "/sneaking", label: "Sneaking" },
            { subLink: "/summoning", label: "Summoning" },
            { subLink: "/farming", label: "Farming" },
        ]
    },
    { link: "/players", label: "Players" },
    // { link: "/bribes", label: "Bribes - WIP"},
    {
        link: "/account", label: "Account Wide", subLinks: [
            { subLink: "/task-board", label: "Task Board" },
            { subLink: "/constellations", label: "Constellations" },
            { subLink: "/quests", label: "Quests" },
            { subLink: "/slab", label: "Slab" },
            { subLink: "/storage", label: "Storage" },
            { subLink: "/obols", label: "Obols" },
            { subLink: "/dungeons", label: "Dungeons" },
            { subLink: "/companions", label: "Companions" },
            { subLink: "/cards", label: "Cards" },
            { subLink: "/tome", label: "The Tome" },
        ]
    },
    { link: "/raw-data", label: "Raw Data" },
]

const NavButton = styled(Button)`
    color: ${props => props.color};
    font-size: 16px;
    font-weight: 500;
    height: 56px;
    margin-top: auto;
    margin-bottom: auto;

    border: ${props => props.style?.border};

    &:hover {
        color: #0376E3;
    }
    &.active {
        border-bottom: 2px solid #0376E3;
        color: #0376E3;
    }
`

const NavMenu = styled(Menu)`
    color: ${props => props.color};

    span {
        font-size: 16px;
        font-weight: 500;
    }

    div {
        padding: 0px;
    }

    height: 56px;
    margin-top: auto;
    margin-bottom: auto;

    &:hover {
        color: #0376E3;
    }
    &.active {
        border-bottom: 2px solid #0376E3;
        color: #0376E3;
    }
`

const customNavDrop = {
    button: {
        size: {
            small: {
                pad: {
                    verical: '200px'
                }
            },
            medium: {
                pad: {
                    verical: '200px'
                }
            }
        }
    }
}

function OnHoverNav({ link, label, subLinks }: { link: string, label: string, subLinks: { subLink: string, label: string }[] | undefined }) {
    const pathname = usePathname();
    const router = useRouter();

    if (subLinks) {
        return (
            <NavMenu
                key={`link_${label}`}
                dropBackground="dark-1"
                dropProps={{ align: { top: 'bottom', left: 'left' }, elevation: 'navigation' }}
                items={subLinks.map(({ subLink, label }) => (
                    {
                        label: <Text size="small">{label}</Text>,
                        onClick: () => { router.push(link + subLink) },
                    }

                ))}
                icon={<FormDown size="medium" color="accent-3" />}
                label={label}
                className={pathname?.includes(link) ? 'active' : ''} color="accent-2" />
        )
    }

    return <Link key={`link_${label}`} href={link} legacyBehavior><NavButton className={pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>;
}

export const Navigation = () => {
    const size = useContext(ResponsiveContext);
    const pathname = usePathname();
    const router = useRouter();

    const onMobileClick = (href: string) => {
        router.push(href);
    }

    if (size === "small") {
        return (
            <Box justify="end">
                <Menu
                    a11yTitle="Navigation Menu"
                    dropProps={{ align: { top: 'bottom', right: 'right' } }}
                    icon={<MenuIcon color="brand" />}
                    dropBackground="dark-1"
                    margin="small"
                    items={navItems.flatMap(({ link, label, subLinks }, index) => {
                        if (subLinks) {
                            return subLinks.map(({ subLink, label }) => {
                                return { fill: true, pad: 'large', onClick: () => onMobileClick(link + subLink), label: <Box key={index} className={pathname == link + subLink ? 'active' : ''} color="accent-2">{label}</Box> }
                            })
                        }
                        return { fill: true, pad: 'large', onClick: () => onMobileClick(link), label: <Box key={index} className={pathname == link ? 'active' : ''} color="accent-2">{label}</Box> }
                    })}
                />
            </Box>
        )
    }

    return (
        <Box height={{ min: "56px", max: "56px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} elevation='navigation'>
            <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                <ThemeContext.Extend value={customNavDrop}>
                    <Nav direction="row">
                        {
                            navItems.map(({ link, label, subLinks }, index) => (<OnHoverNav key={index} link={link} label={label} subLinks={subLinks} />))
                        }
                    </Nav>
                </ThemeContext.Extend>
            </Box>
        </Box>
    )
}