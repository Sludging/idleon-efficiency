import { Box, Heading, Text } from "grommet";
import { FC, ReactNode } from "react";
import ShadowBox from "../base/ShadowBox";

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
      pad="medium"
      round="small"
      style={{
        boxShadow: "-7px 8px 16px 0 rgba(0,0,0,0.17)",
      }}
    >
      <Heading level={2} margin={{ top: "none", bottom: "xsmall" }} size="medium">
        {version} - {title}
      </Heading>
      <Text size="small" margin={{ bottom: "small" }}>
        {date}
      </Text>
      <Box>{children}</Box>
    </Box>
  );
}; 