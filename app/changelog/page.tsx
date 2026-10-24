import { Metadata } from "next";
import { Box, Heading, Paragraph, Text } from "grommet";
import { Fragment } from "react";
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
        return <Box as="ul" margin={{ left: "medium" }} />;
    }

    return groups.map((group, index) => (
        <Fragment key={index}>
            {!Array.isArray(group) && (
                <Heading level={3} size="small" margin={{ top: "medium", bottom: "small" }}>
                    {group.title}
                </Heading>
            )}
            <Box as="ul" margin={{ left: "medium" }}>
                {(Array.isArray(group) ? group : group.changes).map((change, changeIndex) => (
                    <Text key={changeIndex} as="li">{change}</Text>
                ))}
            </Box>
        </Fragment>
    ));
}

export default function ChangelogPage() {
    return (
        <Box pad={{ vertical: "medium" }}>
            {/* Client component to track changelog views */}
            <ChangelogTracker />
            
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
                        <ChangelogChanges changes={entry.changes} />
                    </ChangelogEntry>
                ))}
            </Box>
        </Box>
    );
} 