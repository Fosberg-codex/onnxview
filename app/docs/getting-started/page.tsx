import React from "react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Using Your ONNX Model in Our Web App</h2>
          <p className="mb-4">
            After successfully saving your model in ONNX format, you can use it with our web app for inference:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Log in to our web app</li>
            <li>Navigate to the model upload section</li>
            <li>Upload your .onnx file</li>
            <li>Follow the on-screen instructions to start making inferences</li>
          </ol>
          <p className="mb-4">
            For more detailed instructions on using our web app, please refer to our 
            <Link href="/docs/web-app-usage" className="text-blue-600 hover:underline ml-1">
              Web App Usage Guide
            </Link>.
          </p>
        </div>
  );
}