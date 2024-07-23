export default function ConfigurationPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Configuration</h1>
        <p className="mb-4">Configuring our project is easy. Here are the main steps:</p>
        <ol className="list-decimal list-inside mb-4 space-y-2">
          <li>Create a <code className="bg-gray-100 px-1 rounded">.env</code> file in your project root</li>
          <li>
            Add the following variables:
            <pre className="bg-gray-100 p-2 rounded mt-2 overflow-x-auto">
              <code className="text-sm">
                API_KEY=your_api_key_here
                DEBUG_MODE=false
              </code>
            </pre>
          </li>
          <li>Restart your application</li>
        </ol>
        <p>Remember to never commit your <code className="bg-gray-100 px-1 rounded">.env</code> file to version control!</p>
      </div>
    );
  }