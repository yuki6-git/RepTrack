import { useEffect, useState } from "react";
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
import { useTrainingMenuContext } from "../../context/TrainingMenuContext";
import { CreateTrainingMenuModal } from "./CreateTrainingMenuModal";

type Tab = {
  id: string;
};

export const TrainingContent = () => {
  const [tabs, setTabs] = useState<Tab[]>([{ id: crypto.randomUUID() }]);
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0].id);
  const { trainingMenus } = useTrainingMenuContext();

  useEffect(() => {
    if (trainingMenus.length === 0) {
      return;
    }

    const savedTabs = trainingMenus.map((menu) => ({ id: menu.tabId }));

    setTabs(savedTabs);
    setSelectedTab((prev) => {
      const selectedTab = savedTabs.find((tab) => tab.id === prev);

      return selectedTab ? prev : savedTabs[0].id;
    });
  }, [trainingMenus]);

  const addTab = () => {
    if (tabs.length < 7) {
      const newTab = {
        id: crypto.randomUUID(),
      };
      const newTabs = [...tabs, newTab];

      setTabs(newTabs);
      setSelectedTab(newTabs[newTabs.length - 1].id);
    } else {
      alert("追加できるメニューは７件までです");
      return;
    }
  };

  const removeTab = (id: string) => {
    if (tabs.length > 1) {
      const newTabs = [...tabs].filter((tab) => tab.id !== id);
      setTabs(newTabs);
      setSelectedTab(newTabs[0].id);
    }
  };

  return (
    <VStack
      align="stretch"
      gap="24px"
      m={10}
      p="20px"
      borderWidth="1px"
      borderRadius="8px"
      bg="white"
    >
      <Flex w="100%" align="center" justify="center" position="relative">
        <Heading size="xl">Workout</Heading>
      </Flex>

      <Flex w="100%" flex="1">
        <Tabs.Root
          w="100%"
          h="100%"
          mt={10}
          value={selectedTab}
          variant="outline"
          onValueChange={(e) => setSelectedTab(e.value)}
          size="lg"
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
