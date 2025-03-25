import React, { useEffect, useState } from "react";
import styled from "styled-components";
import TableItem from "../components/TableItem";
import axios from "axios";
import { proxy } from "../utils/default.js";
const Container = styled.div`
  margin-top: 50px;
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 90%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;
const Th = styled.th`
  border: 1px solid black;
  padding: 8px;
  background-color: #f2f2f2;
`;

const Td = styled.td`
  border: 1px solid black;
  padding: 8px;
`;

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const fetchJob = async () => {
    try {
      const jobRes = await axios.get(proxy + "jobs");
      setJobs(jobRes.data);
      console.log(jobs);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchJob();
  }, []);
  return (
    <Container>
      <Wrapper>
        {/* <button onClick={fetchJob}>Get all job</button> */}
        <Table>
          <thead>
            <tr>
              <Th>Id</Th>
              <Th>Jobname</Th>
              <Th>Submission</Th>
              <Th>Last updated</Th>
              <Th>Status</Th>
              <Th>Actions</Th>
            </tr>
          </thead>
          <tbody>
            {jobs?.map((job) => (
              <TableItem key={job._id} job={job} />
            ))}
          </tbody>
        </Table>
      </Wrapper>
    </Container>
  );
};

export default Jobs;
