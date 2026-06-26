import {
  Button,
  Heading,
  HStack,
  Input,
  NativeSelect,
  Flex,
  Tag,
} from "@chakra-ui/react";
import { useState, type Dispatch, type SetStateAction } from "react";

type Props = {
  menuTitle: string;
  setMenuTitle: Dispatch<SetStateAction<string>>;
  selectedParts: string[];
  setSelectedParts: Dispatch<SetStateAction<string[]>>;
};

export const MenuBasicStep = (props: Props) => {
  const { menuTitle, setMenuTitle, selectedParts, setSelectedParts } = props;
  const [selectedPartOption, setSelectedPartOption] = useState("");
  const [customPart, setCustomPart] = useState("");

  const selectedPart =
    selectedPartOption === "その他" ? customPart : selectedPartOption;
  const onClickAddPart = () => {
    if (!selectedPart.trim()) {
      return;
    }
    if (selectedParts.includes(selectedPart)) {
      return;
    }
    setSelectedParts((prev) => [...prev, selectedPart]);

    setSelectedPartOption("");
    setCustomPart("");
  };
  const PART_COLORS: Record<string, string> = {
    胸: "blue",
    背中: "green",
    脚: "orange",
    肩: "purple",
    上腕二頭筋: "pink",
    上腕三頭筋: "cyan",
  };

  return (
    <>
      <Heading mb={2}>トレーニングタイトル (optional)</Heading>
      <Input value={menuTitle} onChange={(e) => setMenuTitle(e.target.value)} />
      <Heading my={2}>トレーニングする部位を選択  (複数可)</Heading>
      <Flex alignItems="center">
        <NativeSelect.Root>
          <NativeSelect.Field
            value={selectedPartOption}
            onChange={(e) => setSelectedPartOption(e.target.value)}
          >
            <option value="">部位を選択</option>
            <option value="胸">胸</option>
            <option value="背中">背中</option>
            <option value="脚">脚</option>
            <option value="肩">肩</option>
            <option value="上腕二頭筋">上腕二頭筋</option>
            <option value="上腕三頭筋">上腕三頭筋</option>
            <option value="腹筋">腹筋</option>
            <option value="その他">その他</option>
          </NativeSelect.Field>
        </NativeSelect.Root>
        {selectedPartOption === "その他" && (
          <Input
            mx={4}
            placeholder="部位を入力"
            value={customPart}
            onChange={(e) => setCustomPart(e.target.value)}
          />
        )}
        <Button ml={4} size="sm" type="button" onClick={onClickAddPart}>
          部位を追加
        </Button>
      </Flex>
      <Heading my={2}>追加済みの部位</Heading>
      <HStack>
        {selectedParts.map((part) => (
          <Tag.Root
            key={part}
            size="xl"
            colorPalette={PART_COLORS[part] ?? "gray"}
          >
            <Tag.Label>{part}</Tag.Label>
            <Tag.EndElement>
              <Tag.CloseTrigger
                onClick={() => {
                  setSelectedParts((prev) =>
                    prev.filter((item) => item !== part),
                  );
                }}
              />
            </Tag.EndElement>
          </Tag.Root>
        ))}
      </HStack>
    </>
  );
};
