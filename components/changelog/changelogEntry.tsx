import { Box, Text } from "grommet";
import { FC, ReactNode } from "react";

export interface ChangelogEntryProps {
  version: string;
  title: string;
  date: string;
  children: ReactNode;
}

export const ChangelogEntry: FC<ChangelogEntryProps> = ({
  version,
  title,
  date,
  children,
}) => {
  return (
    <Box
      margin={{ bottom: "medium" }}
      background="dark-1"
      overflow="hidden"
      round="small"
      style={{
        boxShadow: "-7px 8px 16px 0 rgba(0,0,0,0.17)",
      }}
    >
      <Box
        background="grey-1"
        pad={{ horizontal: "medium", vertical: "small" }}
        gap="xsmall"
        style={{
          position: "relative",
          zIndex: 1,
          boxShadow: "0 3px 6px rgba(0,0,0,0.18)",
        }}
      >
        <Text as="h2" margin="none" size="large" weight={500}>
          {version} - {title}
        </Text>
        <Text size="xsmall" color="accent-2">
          {date}
        </Text>
      </Box>
      <Box pad="medium">
        <Box width="100%" style={{ maxWidth: "110ch", minWidth: 0 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}; 
