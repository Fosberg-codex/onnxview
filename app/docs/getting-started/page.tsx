import React from "react";
import Link from "next/link";

export default function GettingStartedPage() {
  return (
    <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Using Your ONNX Model in Our Web App</h2>
          <p className="mb-4">
            After successfully saving your model in ONNX format, you can use it with our web app for inference:
          </p>
          <ol className="list-decimal list-inside space-y-2 mb-4">
            <li>Go to landing page and click "run your model" button</li>
            <li>Put in all needed information</li>
            <li>Upload your .onnx file</li>
            <li>You will navigate to the Inference page for you to run your model</li>
            <li>Enter unseen features on the feature inout fields to get your response</li>
          </ol>
          <p className="mb-4">
            For more detailed instructions on using PlutoFlow Experimental, contact <Link href="mailto:fosberg1addai@gmil.com" className="underline text-pink-500">Fosberg.</Link>
            <Link href="/docs/web-app-usage" className="text-blue-600 hover:underline ml-1">
              Web App Usage Guide
            </Link>.
          </p>
        </div>
  );
}