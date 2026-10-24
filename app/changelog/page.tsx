import { Metadata } from "next";
import { Box, Heading, Paragraph, Text } from "grommet";
import { ChangelogEntry } from "../../components/changelog/changelogEntry";
import { changelogData } from "../../data/changelog";
import type { ChangelogEntryData, ChangelogSection } from "../../data/changelog";
import ChangelogTracker from "./changelogTracker";

export const metadata: Metadata = {
    title: "Change log",
    description: "Track all updates and changes to Idleon Efficiency",
};

function ChangelogChanges({ changes }: { changes: ChangelogEntryData["changes"] }) {
    const groups: (string[] | ChangelogSection)[] = [];

    for (const change of changes) {
        if (typeof change !== "string") {
            groups.push(change);
            continue;
        }

        const previousGroup = groups[groups.length - 1];
        if (Array.isArray(previousGroup)) {
            previousGroup.push(change);
        } else {
            groups.push([change]);
        }
    }

    if (groups.length === 0) {
        return <Box as="ul" margin="none" pad={{ left: "medium", right: "none", vertical: "none" }} />;
    }

    return (
        <Box gap="medium">
            {groups.map((group, index) => (
                <Box key={index} gap="xsmall">
                    {!Array.isArray(group) && (
                        <Text as="h3" size="small" weight="bold" margin="none">
                            {group.title}
                        </Text>
                    )}
                    <Box as="ul" margin="none" pad={{ left: "medium", right: "none", vertical: "none" }}>
                        {(Array.isArray(group) ? group : group.changes).map((change, changeIndex) => (
                            <Text key={changeIndex} as="li" size="small">{change}</Text>
                        ))}
                    </Box>
                </Box>
            ))}
        </Box>
    );
}

export default function ChangelogPage() {
    return (
        <Box pad={{ vertical: "medium" }}>
            {/* Client component to track changelog views */}
            <ChangelogTracker />

            <Box margin={{ bottom: "medium" }}>
                <Heading level={1} size="small" style={{ fontWeight: "normal" }} margin={{ top: "none", bottom: "small" }}>
                    Change log
                </Heading>
                <Paragraph size="small" fill margin={{ top: "none", bottom: "none" }}>
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
                        <ChangelogChanges changes={entry.changes} />
                    </ChangelogEntry>
                ))}
            </Box>
        </Box>
    );
} 