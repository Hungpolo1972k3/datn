import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import styled from "styled-components";
import { useSelector } from "react-redux";
const LAST_VISIT_KEY = "last_visit";
const TIME_LIMIT_MS = 24 * 60 * 60 * 1000;

const Container = styled.div`
  padding: 2rem;
  margin: auto;
  width: 100%;
`;

const Title = styled.h1`
  font-size: 1.8rem;
  margin-bottom: 1.2rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  font-family: monospace;
  margin-bottom: 1rem;
`;

const Button = styled.button`
  background-color: #3b82f6;
  color: white;
  padding: 12px 18px;
  border: none;
  cursor: pointer;
  &:hover {
    background-color: #2563eb;
  }
`;

const HistoryList = styled.ul`
  list-style: none;
  padding: 0;
  margin-top: 1rem;
`;

const HistoryItem = styled.li`
  margin-bottom: 0.5rem;
`;

function saveRidInLocal(rid) {
  let existing;
  try {
    const raw = sessionStorage.getItem("blast_rid_list");
    existing = Array.isArray(JSON.parse(raw)) ? JSON.parse(raw) : [];
  } catch {
    existing = [];
  }

  const updated = [rid, ...existing.filter((item) => item !== rid)];
  localStorage.setItem("blast_rid_list", JSON.stringify(updated));
}

function getRidList() {
  return JSON.parse(localStorage.getItem("blast_rid_list") || "[]");
}

const BlastSubmit = () => {
  const [text, setText] = useState("");
  const [manualRid, setManualRid] = useState("");
  const [ridList, setRidList] = useState([]);
  const navigate = useNavigate();
  const { userId } = useSelector((state) => state.user);
  useEffect(() => {
    const now = Date.now();
    const lastVisit = parseInt(localStorage.getItem(LAST_VISIT_KEY), 10);

    if (lastVisit && now - lastVisit > TIME_LIMIT_MS) {
      localStorage.removeItem("blast_rid_list");
    }

    localStorage.setItem(LAST_VISIT_KEY, now.toString());

    const handleBeforeUnload = () => {
      localStorage.setItem(LAST_VISIT_KEY, Date.now().toString());
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const handleSubmit = async () => {
    if (!text.trim()) return alert("Please input your contig text.");
    try {
      const res = await axios.post("http://localhost:3001/api/blast", { text });
      const rid = res.data.rid;
      saveRidInLocal(rid);
      setRidList((prev) =>
        [rid, ...prev.filter((r) => r !== rid)].slice(0, 10)
      );
      navigate(`/result/${rid}`);
    } catch (err) {
      alert("Submission failed.");
    }
  };

  const handleSearch = () => {
    if (!manualRid.trim()) return alert("Please input a RID.");
    navigate(`/result/${manualRid.trim().toUpperCase()}`);
  };

  useEffect(() => {
    async function syncLocalJobsToServer() {
      const localJobs = getRidList();
      if (localJobs.length === 0) return;

      try {
        await axios.post("http://localhost:3001/api/sync-jobs", {
          userId,
          rids: localJobs,
        });
        localStorage.removeItem("blast_rid_list");
      } catch (error) {
        console.error("Lỗi đồng bộ", error);
      }
    }

    if (userId) {
      syncLocalJobsToServer();
      axios
        .get(`http://localhost:3001/api/ridlist?userId=${userId}`)
        .then((res) => setRidList(res.data))
        .catch(() => setRidList([]));
    } else {
      setRidList(getRidList());
    }
  }, [userId]);

  return (
    <Container>
      <Title>NCBI BLAST</Title>

      <TextArea
        rows={10}
        placeholder="Paste your contig sequence here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <Button onClick={handleSubmit}>Submit BLAST</Button>

      <hr style={{ margin: "25px 0" }} />

      <input
        type="text"
        placeholder="Enter RID to search"
        value={manualRid}
        onChange={(e) => setManualRid(e.target.value)}
        style={{ padding: "0.5rem", marginRight: "0.5rem" }}
      />
      <Button onClick={handleSearch}>Search</Button>

      {ridList.length > 0 && (
        <>
          <h3 style={{ marginTop: "2rem" }}>🔍 Search History</h3>
          <HistoryList>
            {ridList.map(
              (rid) =>
                rid && (
                  <HistoryItem key={rid}>
                    <Link to={`/result/${rid}`}>{rid}</Link>
                  </HistoryItem>
                )
            )}
          </HistoryList>
        </>
      )}
    </Container>
  );
};
export default BlastSubmit;
