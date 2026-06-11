import { useState } from "react";
import {
  Tabs,
  VStack,
  Heading,
  Flex,
  Button,
  CloseButton,
} from "@chakra-ui/react";

import { Timer } from "../components/organisms/Timer";
import { FiPlus } from "react-icons/fi";
import { TrainingMenu } from "../components/training/TrainingMenu";
import { CreateTrainingMenuModal } from "../components/training/CreateTrainingMenuModal";
import { useTrainingMenus } from "../hooks/exercises/useTrainingMenus";


export const Training = () => {
  const [tabs, setTabs] = useState([{ id: crypto.randomUUID() }]);
  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0].id);
  const {
    trainingMenus,
    createTrainingMenu,
    onToggleComplete,
    onUpdateMenu,
  } = useTrainingMenus();

 

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
          mt={10}
          value={selectedTab}
          variant="outline"
          onValueChange={(e) => setSelectedTab(e.value)}
        >
          <Tabs.List flex="1 1 auto">
            {tabs.map((tab, index) => (
              <Tabs.Trigger value={tab.id} key={tab.id}>
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
            <Tabs.ContentGroup>
              {tabs.map((tab) => {
                const trainingMenu = trainingMenus.find(
                  (menu) => menu.tabId === tab.id,
                );

                return (
                  <Tabs.Content value={tab.id} key={tab.id}>
                    {trainingMenu ? (
                      <TrainingMenu
                        onToggleComplete={onToggleComplete}
                        trainingMenu={trainingMenu}
                        onUpdateMenu={onUpdateMenu}
                      />
                    ) : (
                      <CreateTrainingMenuModal
                        tabId={tab.id}
                        onSaveMenu={createTrainingMenu}
                        triggerLabel="トレーニングメニューを追加"
                      />
                    )}
                  </Tabs.Content>
                );
              })}
            </Tabs.ContentGroup>
          </Tabs.ContentGroup>
        </Tabs.Root>
      </Flex>
    </VStack>
  );
};
