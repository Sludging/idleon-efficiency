import { Box } from "grommet";
import TabButton from "./TabButton";

export type ContentTabOption<T extends string> = {
    value: T;
    label: string;
};

type ContentTabsProps<T extends string> = {
    options: readonly ContentTabOption<T>[];
    value: T;
    onChange: (value: T) => void;
};

export default function ContentTabs<T extends string>({ options, value, onChange }: ContentTabsProps<T>) {
    return (
        <Box
            align="center"
            direction="row"
            justify="center"
            gap="small"
        >
            {options.map(option => (
                <TabButton
                    key={option.value}
                    text={option.label}
                    isActive={value === option.value}
                    clickHandler={() => onChange(option.value)}
                />
            ))}
        </Box>
    );
}
