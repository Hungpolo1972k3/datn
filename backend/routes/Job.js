import express from "express";
import {
  getAJob,
  getAllJobs,
  getImages,
  submitJob,
} from "../controllers/Job.js";

const router = express.Router();
// router.get("/", (req, res) => {
//   res.json(" get all Jobs");
// });
router.post("/add", submitJob);
router.get("/", getAllJobs);
router.get("/get/:id", getAJob);
router.get("/getImage/:id", getImages);

router.get("/get/jsonFile", get);
export default router;
