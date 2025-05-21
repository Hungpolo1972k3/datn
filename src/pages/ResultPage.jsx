import React, { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import ResultTable from "../components/ResultTable";

const Container = styled.div`
  margin: auto;
  width: 100%;
  padding: 20px;
`;

const Title = styled.h1`
  font-size: 2rem;
  margin-bottom: 1.2rem;
`;

const Button = styled.button`
  background-color: #10b981;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  margin-top: 1rem;
  cursor: pointer;
  &:hover {
    background-color: #059669;
  }
`;

export default function ResultPage() {
  const { rid } = useParams();
  const [status, setStatus] = useState("pending");
  const [result, setResult] = useState(null);
  const [secondsLeft, setSecondsLeft] = useState(3);
  const navigate = useNavigate();

  const fetchIntervalRef = useRef(null);
  const countdownIntervalRef = useRef(null);

  useEffect(() => {
    const fetchResult = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/blast/${rid}`);
        if (res.data.status === "not_found") {
          setStatus("not_found");
        } else {
          setStatus(res.data.status);
          setResult(res.data.results);
          if (res.data.status === "done") {
            clearInterval(fetchIntervalRef.current);
            clearInterval(countdownIntervalRef.current);
          }
        }
      } catch {
        setStatus("error");
        clearInterval(fetchIntervalRef.current);
        clearInterval(countdownIntervalRef.current);
      }
    };

    fetchResult();

    fetchIntervalRef.current = setInterval(() => {
      fetchResult();
      setSecondsLeft(3);
    }, 3000);

    countdownIntervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(fetchIntervalRef.current);
      clearInterval(countdownIntervalRef.current);
    };
  }, [rid]);

  return (
    <Container>
      <Title>BLAST Result</Title>
      <p>
        <b>RID:</b> {rid}
      </p>

      {status === "pending" && (
        <p>
          Processing... (Next update in <b>{secondsLeft}s</b>)
        </p>
      )}
      {status === "done" && <ResultTable results={result} />}
      {status === "not_found" && (
        <p style={{ color: "orange" }}>RID not found.</p>
      )}
      {status === "error" && (
        <p style={{ color: "red" }}>Error to fetch result.</p>
      )}

      <Button onClick={() => navigate(-1)}>Go Back</Button>
    </Container>
  );
}
