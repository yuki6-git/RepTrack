import {
  Tabs,
  VStack,
  Heading,
  Flex,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { FiPlus } from "react-icons/fi";
import { TrainingMenu } from "./TrainingMenu";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";
import { useTrainingTabs } from "../../hooks/training/useTrainingTabs";
import { useTrainingMenuContext } from "../../context/TrainingMenuContext";

export const TrainingContent = () => {
  const { trainingMenus } = useTrainingMenuContext();
  const { selectedTab, setSelectedTab, tabs, removeTab, addTab } =
    useTrainingTabs({ trainingMenus });

  return (
    <VStack
      align="stretch"
      gap="24px"
      m={{ base: 2, md: 10 }}
      p="20px"
      borderWidth="1px"
      borderRadius="8px"
      bg="white"
    >
      <Flex w="100%" align="center" justify="center" position="relative">
        <Heading size="xl">Workout</Heading>
      </Flex>

      <Flex w="100%" flex="1" overflowX="auto" overflowY="hidden">
        <Tabs.Root
          w="100%"
          h="100%"
          mt={10}
          minW="max-content"
          value={selectedTab}
          variant="outline"
          onValueChange={(e) => setSelectedTab(e.value)}
          size={{ base: "sm", md: "lg" }}
        >
          <Tabs.List flex="1 1 auto">
            {tabs.map((tab, index) => (
              <Tabs.Trigger
                value={tab.id}
                key={tab.id}
                minW="120px"
                px="24px"
                justifyContent="center"
                flexShrink={0}
                maxH="100vh"
                overflow="hidden"
              >
                Day{index + 1}
                <CloseButton
                  as="span"
                  role="button"
                  size="2xs"
                  me="-2"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeTab(tab.id);
                  }}
                />
              </Tabs.Trigger>
            ))}
            <Button
              alignSelf="center"
              ms="2"
              size="2xs"
              variant="ghost"
              onClick={addTab}
            >
              <FiPlus /> Add Tab
            </Button>
          </Tabs.List>

          <Tabs.ContentGroup>
            {tabs.map((tab) => {
              const trainingMenu = trainingMenus.find(
                (menu) => menu.tabId === tab.id,
              );

              return (
                <Tabs.Content value={tab.id} key={tab.id}>
                  {trainingMenu ? (
                    <TrainingMenu trainingMenu={trainingMenu} />
                  ) : (
                    <CreateTrainingMenuModal
                      tabId={tab.id}
                      triggerLabel="トレーニングメニューを作成"
                      mode="create"
                    />
                  )}
                </Tabs.Content>
              );
            })}
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Flex>
    </VStack>
  );
};
