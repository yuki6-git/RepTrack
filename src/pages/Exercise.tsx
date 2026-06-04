import { Tabs, VStack, Heading, Flex, Spacer, HStack } from "@chakra-ui/react";
import { TrainingMenu } from "../components/TrainingMenu";
import { Timer } from "../components/organisms/Timer";

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
      <Flex w="100%" align="center" justify="center" position="relative">
        <Heading size="xl">Workout</Heading>
        <Flex position="absolute" right="0" top="0">
          <Timer />
        </Flex>
      </Flex>

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
