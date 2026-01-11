"use client"

import { Box, Button, ButtonExtendedProps, Menu, Nav, ResponsiveContext, Text } from "grommet"
import { FormDown, Menu as MenuIcon } from "grommet-icons";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useContext } from "react";
import styled from "styled-components";
import { ThemeContext } from "grommet/contexts/ThemeContext"

interface NavItem {
    link: string;
    label: string;
    subLinks?: { subLink: string; label: string }[];
}

const navItems: NavItem[] = [
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
            // TODO: Add this back later when we work on the UI.
            //{ subLink: "/hole", label: "Hole" },
        ]
    },
    {
        link: "/world-6", label: "W6", subLinks: [
            { subLink: "/sneaking", label: "Sneaking" },
            { subLink: "/summoning", label: "Summoning" },
            { subLink: "/farming", label: "Farming" },
        ]
    },
    {
        link: "/world-7", label: "W7", subLinks: [
            { subLink: "/spelunking", label: "Spelunking (Coming Soon)" },
            { subLink: "/legendTalents", label: "Legend Talents" },
        ]
    },
    { link: "/players", label: "Players" },
    {
        link: "/master-classes", label: "Master Classes", subLinks: [
            { subLink: "/compass", label: "Compass" },
            { subLink: "/grimoire", label: "Grimoire" },
            { subLink: "/tesseract", label: "Tesseract" },
        ]
    },
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
            { subLink: "/upgrade-vault", label: "Upgrade Vault" },
        ]
    },
    { link: "/raw-data", label: "Raw Data" },
]

const NavButton = styled(Button)`
    color: ${props => props.color};
    font-size: 14px;
    font-weight: 500;
    height: 48px;
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
        font-size: 14px;
        font-weight: 500;
    }

    div {
        padding: 0px;
    }

    height: 48px;
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

function handleMouseDown(e: React.MouseEvent, href: string, router: AppRouterInstance) {
    const leftClick = e.button === 0;
    const middleClick = e.button === 1;

    if (middleClick) {
        window.open(href, '_blank');
        e.preventDefault();
    } else if (leftClick) {
        router.push(href);
    }
}

function OnHoverNav({ link, label, subLinks }: NavItem) {
    const pathname = usePathname();
    const router = useRouter();

    if (!subLinks) {
        return (
            <Link key={`link_${label}`} href={link}>
                <NavButton className={pathname == link ? 'active' : ''} color="accent-2">{label}</NavButton></Link>
        );
    }

    return (
        <NavMenu
            key={`link_${label}`}
            dropBackground="dark-1"
            dropProps={{ align: { top: 'bottom', left: 'left' }, elevation: 'navigation' }}
            items={subLinks.map(({ subLink, label }) => (
                {
                    label: <Text size="small">{label}</Text>,
                    onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, `${link}${subLink}`, router),
                }
            )) as ButtonExtendedProps[]}
            icon={<FormDown size="medium" color="accent-3" />}
            label={label}
            className={pathname?.includes(link) ? 'active' : ''} color="accent-2" />
    )
}

export const Navigation = () => {
    const size = useContext(ResponsiveContext);
    const pathname = usePathname();
    const router = useRouter();

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
                        const getButtonProps = (href: string, label: string): ButtonExtendedProps => ({
                            fill: true,
                            pad: 'large',
                            onMouseDown: (e: React.MouseEvent) => handleMouseDown(e, href, router),
                            label: <Box key={index} className={pathname == href ? 'active' : ''} color="accent-2">{label}</Box>
                        });

                        if (subLinks) {
                            return subLinks.map(({ subLink, label }) => getButtonProps(`${link}${subLink}`, label));
                        }

                        return getButtonProps(link, label);
                    })}
                />
            </Box>
        )
    }

    return (
        <Box height={{ min: "48px", max: "48px" }} background="dark-1" border={{ side: 'bottom', color: 'white-1' }} elevation='navigation'>
            <Box width={{ max: '1440px' }} align="center" margin={{ left: 'auto', right: 'auto' }} >
                <ThemeContext.Extend value={customNavDrop}>
                    <Nav direction="row">
                        {navItems.map((navItem, index) => (<OnHoverNav key={index} {...navItem} />))}
                    </Nav>
                </ThemeContext.Extend>
            </Box>
        </Box>
    )
}
