import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CircleChart from "../components/Draw";
import Genome from "../components/Genomeviewer";
const Container = styled.div`
  margin-top: 20px;
  width: 100%; /* Mặc định */
  max-width: 2000px;
  display: flex;
  justify-content: center;

  @media (max-width: 1024px) {
    width: 95%;
    margin-top: 15px;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    flex-direction: column;
  }

  @media (max-width: 400px) {
    width: 100%;
    margin-top: 5px;
    padding: 0 10px;
  }
`;

const Wrapper = styled.div`
  width: 90%;
  margin-left: 20px;
  /* @media (max-width: 400px) {
    background-color: green;
  } */
`;
const Menu = styled.div`
  display: flex;
  /* min-width: 500px; */
  flex-wrap: wrap;
`;
const MenuItem = styled.div`
  padding: 6px;
  border-collapse: collapse;
  border-radius: 7px 7px 0 0;
  /* width: 120px; */
  display: flex;
  color: ${(props) => (props.$active ? "black" : "#0c49ef")};
  border: ${(props) =>
    props.$active ? " 0.5px solid black" : "0.5px solid transparent"};
  border-bottom: none;

  justify-content: center;
  &:hover {
    cursor: pointer;
    border: 0.5px solid black;
    border-bottom: none;
  }
`;
const Item = styled.div`
  width: ${(props) => props.w};
  display: flex;
  flex-direction: column;
  gap: 5px;
  /* min-width: 300px; */
  min-height: 200px;
`;
const Title = styled.div`
  font-weight: bold;
  font-size: 22px;
  padding: 10px 40px;
`;
const Detail = styled.div`
  width: 100%;
`;
const DetailItem = styled.div`
  color: gray;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 8px;
`;
const More = styled.div`
  display: flex;
`;
const Info = styled.div`
  border: 0.5px solid black;
  min-height: 500px;
`;
const JobStatistics = styled.div`
  display: ${(props) => (props.$active === 0 ? "grid" : "none")};
  grid-template-columns: 1fr 1fr 1fr;
  grid-row: 1fr 1fr 1fr;
  min-height: 500px;
  @media (max-width: 768px) {
    grid-row: 1fr 1fr 1fr 1fr;
  }
`;
const ChooseFile = styled.input`
  height: 40px;
  &::-webkit-file-upload-button {
    height: 40px;
    border: none;
    cursor: pointer;
  }
  border: 1px solid #6c757d;
  border-radius: 5px 4px 4px 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 30px;
  margin-top: 10px;
`;
const Input = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
  @media (max-width: 768px) {
    grid-column: 1/4;
    grid-row: 1/2;
  }
`;
const Runtime = styled.div`
  grid-column: 2/4;
  grid-row: 1/2;

  @media (max-width: 768px) {
    grid-column: 1/4;
    grid-row: 2/3;
  }
`;
const Statistics = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
  @media (max-width: 768px) {
    grid-column: 1/4;
    grid-row: 3/4;
  }
`;
const Feature = styled.div`
  grid-column: 1/4;
  grid-row: 3/4;
  @media (max-width: 768px) {
    grid-column: 1/4;
    grid-row: 4/5;
  }
`;
const Bold = styled.p`
  font-weight: bold;
  color: black;
  grid-column: 1/2;
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
`;

const Border = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: none;
`;
const BorderTopL = styled.hr`
  width: 132px;
  border: 0.5 solid black;
`;
const Disable = styled.hr`
  width: 132px;
  opacity: 0;
`;
const BorderTopR = styled.hr`
  width: calc(100% - 1px - 132 * 2px);
  border: 0.5px solid black;
`;
const AnnotationTable = styled.table`
  display: ${(props) => (props.$active === 1 ? "" : "none")};
  /* border: none; */
  border-collapse: collapse;
  margin-top: 10px;
  width: 100%;
  overflow-x: hidden;
`;
const THead = styled.thead``;
const TR = styled.tr`
  background-color: ${(props) => (props.$type === 0 ? "#F2F2F2" : "white")};
`;
const Td = styled.td`
  text-align: left;
  padding-left: 20px;
`;
const Genomeviewer = styled.div`
  display: ${(props) => (props.$active === 2 ? "" : "none")};
  /* background-color: ; */
`;
const CircularPlot = styled.div`
  display: ${(props) => (props.$active === 3 ? "" : "none")};
`;
const Downloads = styled.div`
  display: ${(props) => (props.$active === 4 ? "" : "none")};
`;
const Viewer = () => {
  const [fileContent, setFileContent] = useState(null);
  const [view, setView] = useState(2);
  const [genome, setGenome] = useState(null);
  const [stats, setStats] = useState(null);
  const [features, setFeatures] = useState(null);
  const [sequences, setSequences] = useState(null);
  const [runtime, setRuntime] = useState(null);
  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      setFileContent(JSON.parse(e.target.result));
    };
    reader.readAsText(file);
  };
  useEffect(() => {
    setGenome(fileContent?.genome);
    setFeatures(fileContent?.features);
    setStats(fileContent?.stats);
    setSequences(fileContent?.sequences);
    setRuntime(fileContent?.run);
    return;
  }, [fileContent]);
  const menuItems = [
    "JobStatistics",
    "AnnotationTable",
    "Genomeviewer",
    "CircularPlot",
  ];
  const allFeatures = [];
  const featureQty = {};

  const loadFeatures = () => {
    features.forEach((item, index) => {
      const featureType = item.type;

      if (!allFeatures.includes(featureType)) {
        allFeatures.push(featureType);
        featureQty[featureType] = { count: 1, positions: [index] };
      } else {
        featureQty[featureType].count += 1;
        featureQty[featureType].positions.push(index);
      }
    });
  };
  return (
    <Container>
      <Wrapper>
        <ChooseFile
          type="file"
          name="file"
          id="file"
          accept=".json"
          onChange={(e) => handleFile(e)}
        />
        {console.log(fileContent)}
        {fileContent != null ? (
          <>
            <Menu>
              {menuItems.map((item, index) => (
                <MenuItem
                  key={index}
                  $active={view === index}
                  onClick={() => setView(index)}
                >
                  {item}
                </MenuItem>
              ))}
            </Menu>
            <Info>
              <JobStatistics $active={view}>
                <Input>
                  <Title>Input</Title>
                  <Detail>
                    <DetailItem>
                      <Bold>Organism:</Bold> N.A.
                    </DetailItem>
                    <DetailItem>
                      <Bold>Sequence:</Bold>
                      {genome?.complete ? (
                        <p>1 complete chromosome</p>
                      ) : (
                        <p>{sequences?.length} contigs</p>
                      )}
                    </DetailItem>
                    <DetailItem>
                      <Bold>Genome size:</Bold> {stats?.size} bp
                    </DetailItem>
                  </Detail>
                </Input>
                <Runtime>
                  <Title>Runtime</Title>
                  {runtime ? (
                    <Detail>
                      <DetailItem>
                        <Bold>Start:</Bold> {runtime.start}
                      </DetailItem>
                      <DetailItem>
                        <Bold>Stop:</Bold> {runtime.end}
                      </DetailItem>
                      <DetailItem>
                        <Bold>Duration:</Bold> {runtime.duration}
                      </DetailItem>
                    </Detail>
                  ) : (
                    <></>
                  )}
                </Runtime>
                <Statistics>
                  <Title>Statistics</Title>
                  {stats ? (
                    <Detail>
                      <DetailItem>
                        <Bold>N50</Bold>
                        {stats.n50}
                      </DetailItem>
                      <DetailItem>
                        <Bold>N90</Bold>
                        {stats.n90}
                      </DetailItem>
                      <DetailItem>
                        <Bold>GC-content</Bold> {stats.gc.toFixed(2)}
                      </DetailItem>
                      <DetailItem>
                        <Bold>Coding ratio</Bold>{" "}
                        {stats.coding_ratio.toFixed(2)}
                        bp
                      </DetailItem>
                      <DetailItem>
                        <Bold>N-ratio</Bold> {stats.n_ratio}
                      </DetailItem>
                    </Detail>
                  ) : (
                    <></>
                  )}
                </Statistics>
                {features ? (
                  <Feature>
                    {loadFeatures()}
                    <Title>Feature Count (Total: {features.length})</Title>
                    <More>
                      <Detail>
                        <DetailItem>
                          <Bold>tRNAs:</Bold>
                          {allFeatures["tRNA"] ? allFeatures["tRNA"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>tmRNAs:</Bold>
                          {allFeatures["tmRNA"]
                            ? allFeatures["tmRNA"].count
                            : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>rRNAs:</Bold>
                          {allFeatures["rRNA"] ? allFeatures["rRNA"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>ncRNAs:</Bold>
                          {allFeatures["ncRNA"]
                            ? allFeatures["ncRNA"].count
                            : 0}
                        </DetailItem>
                      </Detail>

                      <Detail>
                        <DetailItem>
                          <Bold>ncRNA: </Bold>
                          {allFeatures["ncRNA"]
                            ? allFeatures["ncRNA"].count
                            : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>CRISPR: </Bold>
                          {allFeatures["CRISPR"]
                            ? allFeatures["CRISPR"].count
                            : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>CDSs: </Bold>
                          {allFeatures["CDS"] ? allFeatures["CDS"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>sORFs: </Bold>
                          {allFeatures["sORF"] ? allFeatures["sORF"].count : 0}
                        </DetailItem>
                      </Detail>
                      <Detail>
                        <DetailItem>
                          <Bold>oriCs: </Bold>
                          {allFeatures["oriC"] ? allFeatures["oriC"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>oriVs: </Bold>
                          {allFeatures["oriV"] ? allFeatures["oriV"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>oriTs: </Bold>
                          {allFeatures["oriT"] ? allFeatures["oriT"].count : 0}
                        </DetailItem>
                        <DetailItem>
                          <Bold>gaps: </Bold>
                          {allFeatures["gap"] ? allFeatures["gap"].count : 0}
                        </DetailItem>
                      </Detail>
                    </More>
                  </Feature>
                ) : (
                  ""
                )}
              </JobStatistics>
              {features ? (
                <AnnotationTable $active={view}>
                  <thead>
                    <tr>
                      <th>Sequence</th>
                      <th>Type</th>
                      <th>Start</th>
                      <th>Stop</th>
                      <th>Strand</th>
                      <th>Locus Tag</th>
                      <th>Gene</th>
                      <th>Product</th>
                      <th>DbXrefs</th>
                    </tr>
                  </thead>
                  <tbody>
                    {features.map((item, index) => {
                      return (
                        <TR key={index} $type={index % 2}>
                          <Td>{item.sequence}</Td>
                          <Td>{item.type}</Td>
                          <Td>{item.start}</Td>
                          <Td>{item.stop}</Td>
                          <Td>{item.strand}</Td>
                          <Td>{item.locus}</Td>
                          <Td>{item.gene}</Td>
                          <Td>{item.product}</Td>
                          <Td>
                            {item.db_xrefs?.map((db, index) => {
                              return (
                                <a
                                  key={index}
                                  href="#blank"
                                  style={{ color: "blue" }}
                                >
                                  <div style={{ margin: "10px 0 10px 0" }}>
                                    {db}
                                  </div>
                                </a>
                              );
                            })}
                          </Td>
                          <Td></Td>
                        </TR>
                      );
                    })}
                  </tbody>
                </AnnotationTable>
              ) : (
                <></>
              )}
              <Genomeviewer $active={view}>
                <Genome />
              </Genomeviewer>
              <CircularPlot $active={view}>
                <CircleChart />
              </CircularPlot>
              <Downloads $active={view}></Downloads>
            </Info>
          </>
        ) : (
          ""
        )}
      </Wrapper>
    </Container>
  );
};

export default Viewer;
