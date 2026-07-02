import { Table } from "@chakra-ui/react";
import type { WeightTableData } from "../../types/WeightData";

type Props = {
  weightRecord: WeightTableData[];
};

export const WeightRecordTable = (props: Props) => {
  const { weightRecord } = props;
  return (
    <Table.Root>
      <Table.Header>
        <Table.Row>
          <Table.ColumnHeader>日付</Table.ColumnHeader>
          <Table.ColumnHeader>体重(kg)</Table.ColumnHeader>
          <Table.ColumnHeader>体脂肪率(%)</Table.ColumnHeader>
          <Table.ColumnHeader>体重変移</Table.ColumnHeader>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {weightRecord.map((record) => (
          <Table.Row key={record.id}>
            <Table.Cell>{record.recorded_at}</Table.Cell>
            <Table.Cell>{record.weight}</Table.Cell>
            <Table.Cell>{record.body_fat}</Table.Cell>
            <Table.Cell>{record.displayDiff}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table.Root>
  );
};
