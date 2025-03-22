import mongoose from "mongoose";

const JobSchema = new mongoose.Schema(
  {
    jobName: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      // 0 : init , 1 : successful, 2: err
    },
    filePath: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);
export default mongoose.model("Job", JobSchema);
