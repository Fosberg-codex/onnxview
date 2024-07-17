import mongoose, { Schema, models } from "mongoose";

const   SampleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  pdfUrl: {
    type: String,
    required: true,
  },
});

const Sample =  models.samples || mongoose.model('samples', SampleSchema);
export default Sample

