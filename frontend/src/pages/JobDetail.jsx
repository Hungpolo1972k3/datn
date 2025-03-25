import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { proxy } from "../utils/default";
import Genome from "../components/Genomeviewer.jsx";
import CircleChart from "../components/Draw.jsx";
const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 20px;
`;
const Wrapper = styled.div`
  width: 90%;
`;
const Menu = styled.div`
  display: flex;
  min-width: 500px;
`;
const MenuItem = styled.div`
  padding: 6px;
  border-collapse: collapse;
  border-radius: 7px 7px 0 0;
  width: 180px;
  display: flex;
  flex-wrap: wrap;
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
  min-width: 300px;
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
`;
const Input = styled.div`
  grid-column: 1/2;
  grid-row: 1/2;
`;
const Runtime = styled.div`
  grid-column: 2/4;
  grid-row: 1/2;
`;
const Statistics = styled.div`
  grid-column: 1/2;
  grid-row: 2/3;
`;
const Feature = styled.div`
  grid-column: 1/4;
  grid-row: 3/4;
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
  border: none;
  border-collapse: collapse;
  margin: auto;
  margin-top: 10px;
`;
const THead = styled.thead``;
const TR = styled.tr`
  background-color: ${(props) => (props.$type === 0 ? "#F2F2F2" : "white")};
`;
const Td = styled.td`
  text-align: left;
  padding-left: 20px;
`;
const Genomeviewer = styled.table`
  display: ${(props) => (props.$active === 2 ? "" : "none")};
`;
const CircularPlot = styled.table`
  display: ${(props) => (props.$active === 3 ? "" : "none")};
`;
const Downloads = styled.table`
  display: ${(props) => (props.$active === 4 ? "" : "none")};
`;
const JobDetail = () => {
  const { currentJob } = useSelector((state) => state.job);
  const [view, setView] = useState(0);
  const [job, setJob] = useState(null);
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const path = useLocation().pathname.split("/")[2];

  const fetchJobDetail = async () => {
    try {
      const res = await axios.get(`${proxy}jobs/get/${path}`);
      setJob(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    fetchJobDetail();
  }, []);
  useEffect(() => {
    if (job) {
      const { head, jobStatistics, annotationTable, gcCount } = job;
      setData({ head, jobStatistics, annotationTable, gcCount });
    }
    setCount(featureCount());
    console.log(data);
  }, [job]);
  useEffect(() => {
    console.log(view);
  }, [view]);
  const menuItems = [
    "Job statistics",
    "Annotation table",
    "Genomeviewer",
    "Circular plot",
    "Downloads",
  ];
  const featureCount = () => {
    let c = 0;
    if (job) {
      Object.values(job.jobStatistics.annotation).map((value) => {
        c += value;
      });
    }
    console.log(c);
    return c;
  };
  return (
    <Container>
      <Wrapper>
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
                  <Bold>Sequence:</Bold> 86 contigs
                </DetailItem>
                <DetailItem>
                  <Bold>Genome size:</Bold> bp
                </DetailItem>
              </Detail>
            </Input>
            <Runtime>
              <Title>Runtime</Title>
              <Detail>
                <DetailItem>
                  <Bold>Start:</Bold> N.A.
                </DetailItem>
                <DetailItem>
                  <Bold>Stop:</Bold> 86 contigs
                </DetailItem>
                <DetailItem>
                  <Bold>Duration:</Bold> bp
                </DetailItem>
              </Detail>
            </Runtime>
            <Statistics>
              <Title>Statistics</Title>
              <Detail>
                <DetailItem>
                  <Bold>N50</Bold>
                  {job?.jobStatistics.sequence.N50}
                </DetailItem>
                <DetailItem>
                  <Bold>GC-content</Bold> {job?.jobStatistics.sequence.GC}
                </DetailItem>
                <DetailItem>
                  <Bold>Coding ratio</Bold> {job?.jobStatistics.sequence.Length}
                  bp
                </DetailItem>
                <DetailItem>
                  <Bold>N-ratio</Bold> {job?.jobStatistics.sequence["N ratio"]}
                </DetailItem>
              </Detail>
            </Statistics>
            <Feature>
              <Title>Feature Count (Total: {count})</Title>
              <More>
                <Detail>
                  <DetailItem>
                    <Bold>tRNAs:</Bold> {job?.jobStatistics.annotation.tRNAs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>tmRNAs: </Bold> {job?.jobStatistics.annotation.tmRNAs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>rRNAs:</Bold> {job?.jobStatistics.annotation.rRNAs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>ncRNAs: </Bold>
                    {job?.jobStatistics.annotation.ncRNAs}
                  </DetailItem>
                </Detail>
                <Detail>
                  <DetailItem>
                    <Bold>ncRNA: </Bold>
                    {job?.jobStatistics.annotation["ncRNA regions"]}
                  </DetailItem>
                  <DetailItem>
                    <Bold>CRISPR: </Bold>
                    {job?.jobStatistics.annotation["CRISPR arrays"]}
                  </DetailItem>
                  <DetailItem>
                    <Bold>CDSs: </Bold>
                    {job?.jobStatistics.annotation.CDSs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>sORFs: </Bold>
                    {job?.jobStatistics.annotation.sORFs}
                  </DetailItem>
                </Detail>
                <Detail>
                  <DetailItem>
                    <Bold>oriCs: </Bold> {job?.jobStatistics.annotation.oriCs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>oriVs: </Bold> {job?.jobStatistics.annotation.oriVs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>oriTs: </Bold> {job?.jobStatistics.annotation.oriTs}
                  </DetailItem>
                  <DetailItem>
                    <Bold>gaps: </Bold> {job?.jobStatistics.annotation.gaps}
                  </DetailItem>
                </Detail>
              </More>
            </Feature>
          </JobStatistics>
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
              {Object.entries(job?.annotationTable || {}).map(
                ([key, value]) => (
                  <TR key={key} $type={key % 2}>
                    <Td>{value["#Sequence Id"]}</Td>
                    <Td>{value["Type"]}</Td>
                    <Td>{value["Start"]}</Td>
                    <Td>{value["Stop"]}</Td>
                    <Td>{value["Strand"]}</Td>
                    <Td>{value["Locus Tag"]}</Td>
                    <Td>{value["Gene"]}</Td>
                    <Td>{value["Product"]}</Td>
                    <Td
                      style={{
                        display: "flex",
                        flexWrap: "wrap",
                        flexDirection: "column",
                      }}
                    >
                      {value["DbXrefs"].map((db, index) => {
                        return (
                          <a
                            key={index}
                            href="#blank"
                            style={{ color: "blue" }}
                          >
                            <div style={{ margin: "10px 0 10px 0" }}>{db}</div>
                          </a>
                        );
                      })}
                    </Td>
                  </TR>
                )
              )}
            </tbody>
          </AnnotationTable>
          <Genomeviewer $active={view}>
            <Genome style={{ with: "100%" }} />
          </Genomeviewer>
          <CircularPlot
            active={view}
            style={{
              justifyContent: "center",
              width: "100%",
              minHeight: "700px",
            }}
          >
            <CircleChart />
          </CircularPlot>
          <Downloads $active={view}></Downloads>
        </Info>
      </Wrapper>
    </Container>
  );
};

export default JobDetail;
