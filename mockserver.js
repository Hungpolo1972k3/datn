// server.js
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const port = 3001;

const db = {};

function generateRid() {
  const timestamp = Date.now().toString();

  const randomPart = Math.random().toString(36).substring(2, 6).toUpperCase();
  const randomPart2 = Math.random().toString(36).substring(2, 6).toUpperCase();

  return `${timestamp.substring(0, 3)}${randomPart}${timestamp.substring(
    3,
    5
  )}${randomPart2}${timestamp.substring(5)}`;
}

app.post("/api/blast", (req, res) => {
  const { text } = req.body;
  const rid = generateRid();

  db[rid] = {
    status: "pending",
    results: null,
  };

  setTimeout(() => {
    db[rid] = {
      status: "done",
      results: [
        {
          description:
            "Acinetobacter baumannii isolate 2024CK-01559 chromosome, complete genome",
          scientificName: "Acinetobacter baumannii",
          maxScore: 122,
          totalScore: 356,
          queryCover: "100%",
          eValue: "3e-24",
          percentIdentity: "100.00%",
          accessionLength: 3809474,
          accession: "CP180108.1",
        },
      ],
    };
  }, 10000);

  res.json({ rid: rid, result: db[rid] });
});

// API GET: lấy kết quả theo RID
app.get("/api/blast/:rid", (req, res) => {
  const rid = req.params.rid.toUpperCase();
  const data = db[rid];

  if (!data) {
    return res.json({ status: "not_found" });
  }

  res.json(data);
});

app.listen(port, () => {
  console.log(`Mock server running at http://localhost:${port}`);
});
