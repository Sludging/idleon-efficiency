import { Box, Grid, Text, type GridProps } from "grommet";
import type { ReactNode } from "react";
import ShadowBox from "./ShadowBox";
import { CircleInformation } from "grommet-icons";
import { ComponentAndLabel } from "./TextAndLabel";
import TipDisplay from "./TipDisplay";

export type DataRowField =
    | { key: string; kind: "identity"; name: string; artwork?: ReactNode }
    | { key: string; kind: "text"; label: ReactNode; value: string; role?: "value" | "description"; color?: string; tooltip?: ReactNode }
    | { key: string; kind: "content"; label: ReactNode; content: ReactNode }
    | { key: string; kind: "artwork"; artwork: ReactNode };

export type DataRowDetail = { key: string; label: ReactNode; content: ReactNode };

type DataRowProps = {
    columns: GridProps["columns"];
    fields: readonly DataRowField[];
    details?: readonly DataRowDetail[];
    opacity?: number;
};

function Field({ field }: { field: DataRowField }) {
    switch (field.kind) {
        case "identity":
            return (
                <Box direction="row" gap="small" align="center" style={{ minWidth: 0 }}>
                    {field.artwork != null && <Box flex={false}>{field.artwork}</Box>}
                    <Box gap="xxsmall" style={{ minWidth: 0 }}>
                        <Text color="accent-2" size="xsmall">Name</Text>
                        <Text size="small">{field.name}</Text>
                    </Box>
                </Box>
            );
        case "text": {
            const label = typeof field.label === "string"
                ? <Text color="accent-2" size="xsmall">{field.label}</Text>
                : field.label;
            return (
                <Box gap="xxsmall" style={{ minWidth: 0 }}>
                    {field.tooltip ? (
                        <Box direction="row" gap="xxsmall">
                            {label}
                            <TipDisplay
                                maxWidth="250px"
                                heading={typeof field.label === "string" ? field.label : ""}
                                body={field.tooltip}
                            >
                                <CircleInformation size="small" />
                            </TipDisplay>
                        </Box>
                    ) : label}
                    <Text color={field.color} size={field.role === "description" ? "xsmall" : "small"}>
                        {field.value}
                    </Text>
                </Box>
            );
        }
        case "content":
            return field.label === null
                ? field.content
                : <ComponentAndLabel label={field.label} labelSize="xsmall" component={field.content} />;
        case "artwork":
            return <Box flex={false}>{field.artwork}</Box>;
    }
}

export default function DataRow({ columns, fields, details, opacity = 1 }: DataRowProps) {
    return (
        <ShadowBox background="dark-1" pad="small" gap="small" data-component="data-row" style={{ minWidth: 0, opacity }}>
            <Grid columns={columns} fill="horizontal" gap="small" align="center" style={{ minWidth: 0 }}>
                {fields.map((field) => (
                    <Box key={field.key} style={{ minWidth: 0 }}>
                        <Field field={field} />
                    </Box>
                ))}
            </Grid>
            {details?.map((detail) => (
                <Box key={detail.key} style={{ minWidth: 0 }}>
                    <ComponentAndLabel label={detail.label} labelSize="xsmall" component={detail.content} />
                </Box>
            ))}
        </ShadowBox>
    );
}
