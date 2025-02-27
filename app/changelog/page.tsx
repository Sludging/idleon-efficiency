import { Metadata } from "next";
import ContentWrapper from "../../components/contentWrapper";
import { Box, Heading, Paragraph, Text } from "grommet";
import { ChangelogEntry } from "../../components/changelog/changelogEntry";
import { changelogData } from "../../data/changelog";

export const metadata: Metadata = {
    title: "Change log",
    description: "Track all updates and changes to Idleon Efficiency",
};

export default function ChangelogPage() {
    return (
        <Box pad={{ vertical: "medium" }}>
            <Box margin={{ bottom: "medium" }}>
                <Heading level={1} margin={{ top: "none", bottom: "small" }}>
                    Change log
                </Heading>
                <Paragraph margin={{ bottom: "none" }}>
                    Track all updates and changes to Idleon Efficiency. This page lists all significant updates,
                    new features, improvements, and bug fixes in chronological order.
                </Paragraph>
            </Box>

            {/* Changelog entries */}
            <Box className="changelog-entries">
                {changelogData.map((entry) => (
                    <ChangelogEntry
                        key={entry.version}
                        version={entry.version}
                        title={entry.title}
                        date={entry.date}
                    >
                        <Box as="ul" margin={{ left: "medium" }}>
                            {entry.changes.map((change, index) => (
                                <Text key={index} as="li">{change}</Text>
                            ))}
                        </Box>
                    </ChangelogEntry>
                ))}
            </Box>
        </Box>
    );
} 