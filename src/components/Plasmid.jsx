import React from "react";
import styled from "styled-components";

const TableContainer = styled.div`
  width: 100%;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow-x: auto;
`;

const Title = styled.h3`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 30px;
  text-align: center;
`;

const TableWrapper = styled.div`
  width: 100%;
  max-width: 100%;
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

const PlasmidTable = ({ data }) => {
  const headers = ["Index", ...Object.keys(data[0])]; 

  return (
    <TableContainer>
      <Title>Plasmid Data</Title>
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
                <Td key="index">{rowIndex + 1}</Td> 
                {headers.slice(1).map((header, cellIndex) => (
                  <Td key={cellIndex}>{row[header]}</Td>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </TableWrapper>
    </TableContainer>
  );
};

export default PlasmidTable;
