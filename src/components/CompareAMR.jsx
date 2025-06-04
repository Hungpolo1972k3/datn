import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 16px;
`;
const StyledLink = styled(Link)`
  color: inherit;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;
const Th = styled.th`
  background-color: #f1f5f9;
  color: #1e293b;
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  text-align: left;
`;

const Td = styled.td`
  padding: 8px 12px;
  border: 1px solid #cbd5e1;
  text-align: left;
  color: #334155;
  vertical-align: top;
`;

const Row = styled.tr`
  &:nth-child(even) {
    background-color: #f8fafc;
  }
`;

function CompareAMR({ amrUploaded = [], amrReference = [], referenceName }) {
  const uploadedMap = new Map(amrUploaded.map((g) => [g["gene_symbol"], g]));
  const referenceMap = new Map(
    amrReference.map((g) => [g["Element symbol"], g])
  );

  const allGenes = Array.from(
    new Set([...uploadedMap.keys(), ...referenceMap.keys()])
  ).sort();
  console.log(allGenes);
  const renderInfo = (info, fileUpload) => {
    if (!info) return "—";

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          flexWrap: "wrap",
        }}
      >
        <span>✔️</span>
        {fileUpload ? (
          <small>
            Node: {info["contig_id"]} Position: {info.start} - {info.stop}
          </small>
        ) : (
          <small>
            Node: {info["Contig id"]} Position: {info.Start} - {info.Stop}
          </small>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3>AMR Gene Comparison</h3>
      <Table>
        <thead>
          <tr>
            <Th>Gene</Th>
            <Th>In file upload</Th>
            <Th>
              <StyledLink to={`/dataset?search=${referenceName}`}>
                In {referenceName}
              </StyledLink>
            </Th>
          </tr>
        </thead>
        <tbody>
          {allGenes.map((gene) => {
            const uploadedInfo = uploadedMap.get(gene);
            const referenceInfo = referenceMap.get(gene);

            return (
              <Row key={gene}>
                <Td>{gene}</Td>
                <Td>{renderInfo(uploadedInfo, true)}</Td>
                <Td>{renderInfo(referenceInfo, false)}</Td>
              </Row>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default CompareAMR;
