import mongoose, { Schema, models } from "mongoose";

const ModelSchema = new mongoose.Schema({
    name: {
         type: String, 
        required: true 
    },

    numberOfFeatures: { 
        type: Number, 
        required: true 
    },
    featureNames: { 
        type: [String], 
        required: true 
    },
    onnxFilePath: { 
        type: String, 
        // required: true 
    },
    typeCase: { 
        type: String, 
        enum: ['Tabular', 'Image'], 
        required: true 
    },
    framework: { 
        type: String, 
        required: true
    },
    description: { 
        type: String, required: true 
    },
  }, { timestamps: true });
  
  const mlModel = models.MLModels || mongoose.model("MLModels", ModelSchema);
export default mlModel;
