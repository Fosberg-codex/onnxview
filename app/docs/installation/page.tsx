export default function InstallationPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Installation</h1>
        <p className="mb-4">Follow these steps to install our project:</p>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Open your terminal</li>
          <li>
            Run the following command:
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
              <code className="text-sm">npm install our-awesome-project</code>
            </pre>
          </li>
          <li>Wait for the installation to complete</li>
          <li>You're ready to go!</li>
        </ol>
        <p>For more detailed instructions, check out our GitHub repository.</p>
      </div>
    );
  }