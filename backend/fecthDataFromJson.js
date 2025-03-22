import fs from "fs/promises";
const filePath = "./data/NC_002127.1.fna.json";

export const fetchJson = async (req, res) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    const jsonData = JSON.parse(data);

    const genome = jsonData.genome;
    const stats = jsonData.stats;

    res.json(jsonData);
  } catch (err) {
    console.error("Lỗi khi phân tích file JSON:", err);
  }
};
export default fetchJson;
