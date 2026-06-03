import {
  Box,
  Button,
  Flex,
  Heading,
  SimpleGrid,
  Table,
  Text,
  VStack,
} from "@chakra-ui/react";


const weightLogs = [
  {
    date: "2024/06/14",
    weight: "55.0",
    bodyFat: "15.2",
    memo: "朝の体重",
  },
  {
    date: "2024/06/07",
    weight: "55.4",
    bodyFat: "15.3",
    memo: "-",
  },
  {
    date: "2024/05/31",
    weight: "55.8",
    bodyFat: "15.6",
    memo: "-",
  },
  {
    date: "2024/05/24",
    weight: "56.1",
    bodyFat: "15.8",
    memo: "-",
  },
];

export const Weight = () => {
  return (
    <VStack align="stretch" gap="24px">
      <Heading size="xl">体重記録</Heading>

      <SimpleGrid columns={{ base: 1, lg: 3 }} gap="24px">
        <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
          <Heading size="md" mb="20px">
            最新の記録
          </Heading>

          <Text color="gray.500">2024/06/14</Text>
          <Flex align="baseline" gap="8px" mt="8px">
            <Heading size="2xl">55.0</Heading>
            <Text fontWeight="bold">kg</Text>
          </Flex>

          <Text mt="24px" color="gray.500">
            目標体重まであと
          </Text>
          <Heading size="lg">+5.0 kg</Heading>

          <Button mt="24px" width="100%" variant="outline">
            体重を記録する
          </Button>
        </Box>
        
        <Box
          gridColumn={{ base: "auto", lg: "span 2" }}
          p="24px"
          bg="white"
          borderRadius="8px"
          borderWidth="1px"
        >
          <Heading size="md" mb="16px">
            体重の推移
          </Heading>

          <Box
            h="280px"
            borderRadius="8px"
            bg="gray.50"
            borderWidth="1px"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="gray.500">グラフ表示エリア</Text>
          </Box>
        </Box>

        
      </SimpleGrid>

      <Box p="24px" bg="white" borderRadius="8px" borderWidth="1px">
        <Heading size="md" mb="16px">
          体重記録一覧
        </Heading>

        <Table.Root>
          <Table.Header>
            <Table.Row>
              <Table.ColumnHeader>日付</Table.ColumnHeader>
              <Table.ColumnHeader>体重(kg)</Table.ColumnHeader>
              <Table.ColumnHeader>体脂肪率(%)</Table.ColumnHeader>
              <Table.ColumnHeader>メモ</Table.ColumnHeader>
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {weightLogs.map((log) => (
              <Table.Row key={log.date}>
                <Table.Cell>{log.date}</Table.Cell>
                <Table.Cell>{log.weight}</Table.Cell>
                <Table.Cell>{log.bodyFat}</Table.Cell>
                <Table.Cell>{log.memo}</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>

        <Button mt="20px" variant="outline">
          すべて見る
        </Button>
      </Box>
    </VStack>
  );
};
    
