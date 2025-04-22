import styled from "styled-components";
import { useTranslation } from "react-i18next";

const TableContainer = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h3`
  font-size: 32px; /* Điều chỉnh cỡ chữ tại đây */
  font-weight: bold;
  margin-bottom: 20px;
  color: #333;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #d6d6d6;
  color: black;
  padding: 10px;
  text-align: left;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
`;

const FastaTable = ({ sample }) => {
  const { t } = useTranslation();

  return (
    <TableContainer>
      <Title>{t("fastaComponent.title")}</Title>
      <Table>
        <thead>
          <tr>
            <Th>{t("fastaComponent.field")}</Th>
            <Th>{t("fastaComponent.value")}</Th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <Td>{t("fastaComponent.name")}</Td>
            <Td>{sample.name}</Td>
          </tr>
          <tr>
            <Td>{t("fastaComponent.header")}</Td>
            <Td>{sample.header}</Td>
          </tr>
          <tr>
            <Td>{t("fastaComponent.length")}</Td>
            <Td>{sample.length}</Td>
          </tr>
          <tr>
            <Td>{t("fastaComponent.createdTime")}</Td>
            <Td>{new Date(sample.createdAt).toLocaleString()}</Td>
          </tr>
        </tbody>
      </Table>
    </TableContainer>
  );
};

export default FastaTable;