import fs from "fs/promises";

export const getData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    const lines = data
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    const result = { sequence: {}, annotation: {} };
    let currentSection = "sequence";

    lines.forEach((line) => {
      if (line === "Annotation:") {
        currentSection = "annotation";
        return;
      }

      const [key, value] = line.split(": ");

      if (currentSection === "sequence") {
        result.sequence[key] = isNaN(value) ? value : parseFloat(value);
      } else if (currentSection === "annotation") {
        result.annotation[key] = isNaN(value) ? value : parseInt(value);
      }
    });

    return result;
  } catch (err) {
    console.error(err);
  }
};
export const getData1 = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    const lines = data.trim().split("\n");
    const headers = lines[0].split("\t");

    const rows = lines.slice(1).map((line) => {
      const values = line.split("\t");
      const row = {};
      headers.forEach((header, index) => {
        row[header] = values[index] || "";
        if (header === "DbXrefs") {
          row[header] = values[index] ? values[index].split(", ") : [];
        }
      });
      return row;
    });
    return rows;
  } catch (err) {
    console.error(err);
  }
};

export const gcCount = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });
    const lines = data.trim().split("\r\n");

    const nucleotideArray = [];
    const nuclMap = { A: 0, T: 0, G: 0, C: 0 };

    const rows = lines.slice(1);
    for (const line of rows) {
      for (const char of line) {
        if (nuclMap.hasOwnProperty(char)) {
          nuclMap[char]++;
          nucleotideArray.push(char);
        }
      }
    }

    return { rows, nucleotideArray, nuclMap };
  } catch (err) {
    console.error(err);
  }
};
