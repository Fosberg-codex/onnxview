import React from "react";

export default function GettingStartedPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Getting Started</h1>
      <p className="mb-4">Welcome to our project! This guide will help you get up and running quickly.</p>
      <h2 className="text-2xl font-semibold mb-2">Prerequisites</h2>
      <ul className="list-disc list-inside mb-4 space-y-1">
        <li>Node.js (version 14 or later)</li>
        <li>npm or yarn</li>
      </ul>
      <h2 className="text-2xl font-semibold mb-2">Quick Start</h2>
      <ol className="list-decimal list-inside space-y-1">
        <li>Clone the repository</li>
        <li>Install dependencies</li>
        <li>Run the development server</li>
      </ol>
    </div>
  );
}