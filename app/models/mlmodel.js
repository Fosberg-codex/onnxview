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
    fileName: { 
        type: String, 
        // required: true 
    },
    
    fileName: { 
        type: String, 
        // required: true 
    },

    typeCase: { 
        type: String, 
    },
    framework: { 
        type: String, 
       
    },
    description: { 
        type: String,
       
    },
  }, { timestamps: true });
  
  const form = models.forms || mongoose.model("forms", ModelSchema);
export default form;
