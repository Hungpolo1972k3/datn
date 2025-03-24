import fs from "fs/promises";

export const getData = async (filePath) => {
  try {
    const data = await fs.readFile(filePath, { encoding: "utf8" });

    // const lines = data
    //   .split("\n")
    //   .map((line) => line.trim())
    //   .filter((line) => line);

    return data;
  } catch (err) {
    console.error(err);
  }
};
