"use client"

import {
    Box,
    Text,
    Heading,
    Grid,
    CheckBox,
    Button
} from "grommet"
import { ChangeEvent, useCallback, useState } from 'react';
import ShadowBox from "../../../components/base/ShadowBox";
import IconImage from "../../../components/base/IconImage";
import { Companion } from "../../../data/domain/companions";
import TipDisplay, { TipDirection } from "../../../components/base/TipDisplay";
import { CircleInformation } from "grommet-icons";
import { useAppDataStore } from "../../../lib/providers/appDataStoreProvider";
import { useShallow } from "zustand/react/shallow";

const CompanionBox = ({ companion, editable = false }: { companion: Companion, editable: boolean }) => {
    const [checked, setChecked] = useState<boolean>(companion.owned);

    const handleChecked = useCallback((changeEvent: ChangeEvent<HTMLInputElement>): void => {
        // You can't uncheck an owned companion.
        if (companion.real) {
            return;
        }

        setChecked(changeEvent.target.checked);
        companion.owned = changeEvent.target.checked;
    }, []);

    return (
        <ShadowBox background="dark-1" style={{ opacity: companion.owned ? 1 : 0.5 }} gap="small" pad="medium">
            <Box direction="row" gap="small" align="center">
                <CheckBox
                    disabled={companion.real ? true : !editable}
                    checked={checked}
                    onChange={handleChecked}
                />
                <IconImage data={companion.imageData} />
            </Box>
            <Text>{companion.getBonus()}</Text>
        </ShadowBox>
    )
}

function CompanionDisplay() {
    const [allowEditing, setAllowEditing] = useState<boolean>(false);
    const { theData } = useAppDataStore(useShallow(
        (state) => ({ theData: state.data.getData(), lastUpdated: state.lastUpdated })
    ));

    const companions = theData.get("companions") as Companion[];

    const editCompanions = () => {
        setAllowEditing(true);
    }

    const saveEdits = () => {
        setAllowEditing(false);

        localStorage.setItem("companions", JSON.stringify(companions));
    }

    if (!companions) {
        return null;
    }

    return (
        <Box gap="medium">
            <Heading level="2" size="medium" style={{ fontWeight: 'normal' }}>Companions</Heading>
            <Box width="medium" direction="row" gap="small">
                {!allowEditing && <Button style={{ color: "white" }} primary color="brand" label="Edit Companions" onClick={() => editCompanions()} />}
                {allowEditing && <Button style={{ color: "white" }} primary color="brand" label="Save edits" onClick={() => saveEdits()} />}
                <TipDisplay
                    body={<Box gap="xsmall">
                        <Text size="small">Want to experiment with how your account will look with certain companions?</Text>
                        <Text></Text>
                        <Text size="small">Click 'Edit Companions' and tick the checkboxes of the companions you want to unlock.</Text>
                        <Text></Text>
                        <Text size="small">You can then click 'Save edits' and reload the page and the effect will be active.</Text>
                        <Text size="small">You can edit again to turn them off at any time. (You can't deactivate owned companions.)</Text>
                    </Box>}
                    size="medium"
                    heading='Companion Editing'
                    maxWidth='large'
                    direction={TipDirection.Down}
                >
                    <CircleInformation size="small" />
                </TipDisplay>
            </Box>
            <Grid columns={{ size: 'auto', count: 4 }} gap="medium">
                {
                    companions.map((companion, index) => <CompanionBox key={index} companion={companion} editable={allowEditing} />)
                }
            </Grid>
        </Box>
    )
}

export default CompanionDisplay;