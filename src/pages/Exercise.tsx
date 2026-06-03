import {
  Tabs,
  VStack,
  Box,
  Heading,
  Flex,
} from "@chakra-ui/react";
import { TrainingMenu } from "../components/TrainingMenu";

export const Exercise = () => {
  return (
    <VStack
      align="center"
      gap="24px"
      m={10}
      p="20px"
      borderWidth="1px"
      borderRadius="8px"
      bg="white"
    >
      <Box>
        <Heading size="xl">Workout</Heading>
      </Box>
      <Flex>
        <Tabs.Root
          defaultValue="Day1"
          variant="plain"
          css={{
            "--tabs-indicator-bg": "colors.gray.subtle",
            "--tabs-indicator-shadow": "shadows.xs",
            "--tabs-trigger-radius": "radii.full",
          }}
        >
          <Tabs.List>
            <Tabs.Trigger value="Day1">Day1</Tabs.Trigger>
            <Tabs.Trigger value="Day2">Day2</Tabs.Trigger>
            <Tabs.Trigger value="Day3">Day3</Tabs.Trigger>
            <Tabs.Indicator />
          </Tabs.List>
          <Tabs.Content value="Day1">
            <TrainingMenu />
          </Tabs.Content>
          <Tabs.Content value="Day2">
            <TrainingMenu />
          </Tabs.Content>
          <Tabs.Content value="Day3">
            <TrainingMenu />
          </Tabs.Content>
        </Tabs.Root>
      </Flex>
    </VStack>
  );
};
