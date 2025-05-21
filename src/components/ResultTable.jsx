import styled from "styled-components";

const Container = styled.div`
  margin: 20px;
  overflow-x: auto;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 14px;

  th,
  td {
    border: 1px solid #ccc;
    padding: 8px 12px;
    text-align: left;
  }

  th {
    background-color: #f4f4f4;
    font-weight: bold;
  }

  tbody tr:nth-child(even) {
    background-color: #fafafa;
  }

  a {
    color: #0077cc;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const ResultTable = ({ results }) => {
  return (
    <Container>
      <Table>
        <thead>
          <tr>
            <th>#</th>
            <th>Description</th>
            <th>Scientific Name</th>
            <th>Max Score</th>
            <th>Total Score</th>
            <th>Query Cover</th>
            <th>E-value</th>
            <th>Per. Ident</th>
            <th>Acc. Len</th>
            <th>Accession</th>
          </tr>
        </thead>
        <tbody>
          {results?.map((entry, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{entry.description}</td>
              <td>{entry.scientificName}</td>
              <td>{entry.maxScore}</td>
              <td>{entry.totalScore}</td>
              <td>{entry.queryCover}</td>
              <td>{entry.eValue}</td>
              <td>{entry.percentIdentity}</td>
              <td>{entry.accessionLength}</td>
              <td>
                <a
                  href={`https://www.ncbi.nlm.nih.gov/nuccore/${entry.accession}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {entry.accession}
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ResultTable;
