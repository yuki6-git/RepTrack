import { Box, Flex, Heading, Text, VStack } from "@chakra-ui/react";

 type TrainingMinutesListItem = {
  id: string;
  date: string;
  title: string;
  durationMinutes: number;
};
type Props = {
  thisMonthTrainingMinutes: TrainingMinutesListItem[];
};
export const TrainingTimeList = (props: Props) => {
  const { thisMonthTrainingMinutes } = props;

  return (
    <VStack align="stretch" gap="12px">
      {thisMonthTrainingMinutes.map((log) => (
        <Box
          key={log.id}
          p="16px"
          borderWidth="1px"
          borderRadius="12px"
          bg="white"
          boxShadow="sm"
        >
          <Flex justify="space-between" align="center" mb="8px">
            <Text fontWeight="bold">{log.date}</Text>

            <Flex align="baseline" gap="4px">
              <Text fontSize="lg">{log.durationMinutes}</Text>
              <Text color="gray.500" fontWeight="bold">
                分
              </Text>
            </Flex>
          </Flex>

          <Text fontSize="sm" color="gray.500">
            {log.title}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
