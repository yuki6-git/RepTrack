import { Box, Heading, Text, VStack } from "@chakra-ui/react";
import { CreateTrainingMenuModal } from "../components/training/TrainingMenuModal";
import { TrainingMenuProvider } from "../context/TrainingMenuContext";

export const DevPreview = () => {
  return (
    <TrainingMenuProvider>
      <Box p="40px">
        <VStack align="stretch" gap="24px">
          <Box>
            <Heading size="xl">Dev Preview</Heading>
            <Text color="gray.500" mt="8px">
              CreateTrainingMenuModal の表示確認用ページです。
            </Text>
            <CreateTrainingMenuModal />
          </Box>
        </VStack>
      </Box>
    </TrainingMenuProvider>
  );
};
