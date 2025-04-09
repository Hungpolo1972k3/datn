import React, { useState } from "react";
import styled from "styled-components";

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
  overflow-x: auto;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  text-align: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`;

const Table = styled.table`
  width: auto;
  min-width: 100%;
  border-collapse: collapse;
`;

const Th = styled.th`
  background: #d6d6d6;
  color: black;
  padding: 10px;
  text-align: left;
  white-space: nowrap;
`;

const Td = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  white-space: nowrap;
`;

const EyeIcon = styled.span`
  cursor: pointer;
  color: #007bff;
  font-size: 18px;
  &:hover {
    text-decoration: underline;
  }
`;

const AmrTable = ({ data }) => {
  const [visibleRows, setVisibleRows] = useState({});

  // Danh sách cột cần loại bỏ
  const hiddenFields = ["sample_id", "protein_identifier", "_id", "__v", "createdAt","updatedAt"];

  // Tạo danh sách cột hiển thị
  const headers = [
    "Index",
    ...Object.keys(data[0]).filter((key) => !hiddenFields.includes(key)),
  ];

  const toggleNucleic = (index) => {
    setVisibleRows((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <TableContainer>
      <Title>AMR Data</Title>
      <TableWrapper>
        <Table>
          <thead>
            <tr>
              {headers.map((header, index) => (
                <Th key={index}>{header}</Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <tr key={rowIndex}>
                <Td>{rowIndex + 1}</Td>
                {headers.slice(1).map((key, cellIndex) => (
                  <Td key={cellIndex}>
                    {key === "nucleic" ? (
                      <>
                        <EyeIcon onClick={() => toggleNucleic(rowIndex)}>
                          {visibleRows[rowIndex] ? "🙈" : "👁️"}
                        </EyeIcon>
                        {visibleRows[rowIndex] && (
                          <div style={{ marginTop: "8px", maxWidth: "400px", wordBreak: "break-word" }}>
                            {row[key] || "N/A"}
                          </div>
                        )}
                      </>
                    ) : (
                      row[key] || "N/A"
                    )}
                  </Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default AmrTable;
