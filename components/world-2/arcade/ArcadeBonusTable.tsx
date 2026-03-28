"use client"

import { useState } from "react";
import { Box, DataTable, Select, Text, TextInput } from "grommet";
import ShadowBox from "../../base/ShadowBox";
import IconImage from "../../base/IconImage";
import { Arcade as ArcadeData } from "../../../data/domain/world-2/arcade";
import { nFormatter } from "../../../data/utility";
import { ArcadeBonusTableRow } from "./arcadeBonusTableData";
import { cosmicBallStyle, goldBallStyle } from "./ballStyles";

type ArcadeBonusSortValue = 'default' | 'rotation';

const sortOptions: Array<{ label: string, value: ArcadeBonusSortValue }> = [
    { label: 'Default Order', value: 'default' },
    { label: 'Current Rotation', value: 'rotation' }
];

function sortByRotation(rows: ArcadeBonusTableRow[]) {
    const activeRows: ArcadeBonusTableRow[] = [];
    const inactiveRows: ArcadeBonusTableRow[] = [];

    rows.forEach((row) => {
        if (row.isOnRotation) {
            activeRows.push(row);
            return;
        }

        inactiveRows.push(row);
    });

    return [...activeRows, ...inactiveRows];
}

function RowCell({ isOnRotation, children }: { isOnRotation: boolean, children: React.ReactNode }) {
    return (
        <Box style={{ opacity: isOnRotation ? 1 : 0.45 }}>
            {children}
        </Box>
    );
}

function ArcadeBallValue({ cost, style }: { cost: number, style: React.CSSProperties }) {
    return (
        <Box direction="row" gap="xsmall" align="center">
            <IconImage data={ArcadeData.silverBallImageData()} scale={0.75} style={style} />
            <Text size="xsmall">{nFormatter(cost)}</Text>
        </Box>
    );
}

export function ArcadeBonusTable({
    rows
}: {
    rows: ArcadeBonusTableRow[]
}) {
    const [sortBy, setSortBy] = useState<ArcadeBonusSortValue>('default');
    const [searchText, setSearchText] = useState('');

    const handleSearchKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key !== 'Escape' || searchText.length === 0) {
            return;
        }
        setSearchText('');
    };

    const normalizedSearchText = searchText.trim().toLowerCase();
    const filteredRows = normalizedSearchText.length > 0
        ? rows.filter((row) => {
            const currentBonusText = row.bonus.getBonusText().toLowerCase();

            return currentBonusText.includes(normalizedSearchText);
        })
        : rows;

    const displayedTableData = sortBy === 'rotation'
        ? sortByRotation(filteredRows)
        : filteredRows;

    const columns = [
        {
            property: 'upgrade',
            header: 'Upgrade',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    <IconImage data={data.bonus.getImageData()} scale={0.55} />
                </RowCell>
            )
        },
        {
            property: 'effect',
            header: 'Effect',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    <Text size="xsmall">{data.bonus.getBonusText()}</Text>
                </RowCell>
            )
        },
        {
            property: 'maxBonus',
            header: 'Max Bonus',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    <Text size="xsmall">{data.maxBonus}</Text>
                </RowCell>
            )
        },
        {
            property: 'level',
            header: 'Level',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    <Text size="xsmall">{data.levelText}</Text>
                </RowCell>
            )
        },
        {
            property: 'nextCost',
            header: 'Next Cost',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    {
                        data.isMaxLevel
                            ? <Text size="xsmall">Maxed</Text>
                            : <ArcadeBallValue cost={data.cost} style={data.hasCosmicStepToMax ? cosmicBallStyle : goldBallStyle} />
                    }
                </RowCell>
            )
        },
        {
            property: 'goalCost',
            header: 'Cost To Max',
            render: (data: ArcadeBonusTableRow) => (
                <RowCell isOnRotation={data.isOnRotation}>
                    {
                        data.isMaxLevel
                            ? <Text size="xsmall">Maxed</Text>
                            : <ArcadeBallValue cost={data.costToMax} style={data.hasCosmicStepToMax ? cosmicBallStyle : goldBallStyle} />
                    }
                </RowCell>
            )
        }
    ];

    return (
        <ShadowBox background="dark-1" pad="medium">
            <Box direction="row" gap="medium" align="center" margin={{ bottom: 'medium' }} wrap>
                <Box direction="row" gap="small" align="center">
                    <Text size="small">Sort by:</Text>
                    <Box width="small">
                        <Select
                            value={sortBy}
                            options={sortOptions}
                            labelKey="label"
                            valueKey={{ key: 'value', reduce: true }}
                            onChange={({ value }) => setSortBy(value as ArcadeBonusSortValue)}
                        />
                    </Box>
                </Box>
                <Box direction="row" gap="small" align="center">
                    <Text size="small">Search:</Text>
                    <TextInput
                        placeholder="Search bonus..."
                        value={searchText}
                        onChange={(event) => setSearchText(event.target.value)}
                        onKeyDown={handleSearchKeyDown}
                        size="small"
                        style={{ width: '220px' }}
                    />
                </Box>
            </Box>
            <DataTable
                fill
                columns={columns}
                data={displayedTableData}
                primaryKey="id"
                background={{
                    body: ["dark-1", "grey-4"]
                }}
            />
        </ShadowBox>
    );
}

export default ArcadeBonusTable;
