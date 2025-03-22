import Jobs from "../models/Jobs.js";
import { gcCount, getData, getData1 } from "./FetchData.js";

export const submitJob = async (req, res) => {
  try {
    const job = new Jobs({ ...req.body });
    const savedJob = await job.save();
    res.status(200).json(savedJob);
  } catch (error) {
    next(error);
  }
};
export const getAllJobs = async (req, res) => {
  try {
    const jobs = await Jobs.find();
    res.status(200).json(jobs);
  } catch (err) {
    // next(err);
  }
};
export const getAJob = async (req, res) => {
  const defaultFilePath = "../backend/data/NC_002127.1.fna.txt";
  const defaultFilePath2 = "../backend/data/NC_002127.1.fna.tsv";
  const defaultFilePath3 = "../backend/data/NC_002127.1.fna";
  try {
    const job = await Jobs.findById(req.params.id);

    if (!job) {
      return res.status(404).json({ error: "Job không tồn tại" });
    }

    const filePath = job.filePath || defaultFilePath;
    const filePath2 = job.filePath2 || defaultFilePath2;
    const filePath3 = job.filePath3 || defaultFilePath3;

    const JobStatistics = await getData(filePath);
    const AnnotationTable = await getData1(filePath2);
    const GCCount = await gcCount(filePath3);

    const head = { ...job._doc };
    const data = {
      head: head,
      jobStatistics: { ...JobStatistics },
      annotationTable: { ...AnnotationTable },
      gcCount: { ...GCCount },
    };
    res.status(200).json(data);
  } catch (err) {
    console.error("Lỗi khi lấy job:", err);
  }
};
export const getImages = async (req, res) => {};
