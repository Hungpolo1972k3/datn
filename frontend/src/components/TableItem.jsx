import React from "react";
import styled from "styled-components";
import del from "../img/icons/delete.png";
import eye from "../img/icons/eye.png";
import docs from "../img/icons/docs.png";
import { Link } from "react-router-dom";
const Container = styled.tr`
  width: 100%;
  margin-top: 10px;
  height: 40px;
  border: 1px solid black;
`;
const Action = styled.div`
  display: flex;
  justify-content: space-around;
`;
const Frame = styled.div`
  width: 26px;
  height: 26px;
  border: 1px solid black;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const Img = styled.img`
  width: 22px;
  object-fit: cover;
`;
const Col = styled.td`
  padding-left: 20px;
  border: 1px solid black;
`;
const aLink = styled.a``;
const TableItem = ({ job }) => {
  return (
    <Container>
      <Col>
        <Link to={`${job._id}`}>{job._id}</Link>
      </Col>
      <Col>{job.jobName}</Col>
      <Col>
        {job.createdAt.slice(0, 10) + "   " + job.createdAt.slice(11, 20)}
      </Col>
      <Col>
        {job.updatedAt.slice(0, 10) + "   " + job.updatedAt.slice(11, 20)}
      </Col>
      <Col>
        {job.status === 0 ? "init" : job.status === 1 ? "successful" : "error"}
      </Col>
      <Col style={{ paddingLeft: "0" }}>
        <Action>
          <Frame>
            <Img src={eye} />
          </Frame>
          <Frame>
            <Img src={docs} />
          </Frame>
          <Frame>
            <Img src={del} />
          </Frame>
        </Action>
      </Col>
    </Container>
  );
};

export default TableItem;
