import { useState } from "react";
import {
  Tabs,
  VStack,
  Heading,
  Flex,
  Button,
  CloseButton,
} from "@chakra-ui/react";
import { TrainingMenu } from "../components/TrainingMenu";
import { Timer } from "../components/organisms/Timer";
import { FiPlus } from "react-icons/fi";

export const Exercise = () => {
  const [tabs, setTabs] = useState([
    { id: crypto.randomUUID() },
    { id: crypto.randomUUID() },
    { id: crypto.randomUUID() },
  ]);
  const [trainingMenus, setTrainingMenus] = useState([
    {
      id: tabs[0].id,
    },
  ]);

  const [selectedTab, setSelectedTab] = useState<string | null>(tabs[0].id);

  const addTab = () => {
    if (tabs.length < 7) {
      const newTab = {
        id: crypto.randomUUID(),
        content: "Tab Content",
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
            {tabs.map((tab) => {
              const trainingMenu = trainingMenus.find(
                (menu) => menu.id === tab.id,
              );

              return (
                <Tabs.Content value={tab.id} key={tab.id}>
                  {trainingMenu ? (
                    <TrainingMenu trainingMenuId={tab.id} />
                  ) : (
                    <Button>メニューを追加する</Button>
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
