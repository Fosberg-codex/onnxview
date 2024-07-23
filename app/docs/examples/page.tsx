export default function ExamplesPage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Examples</h1>
        <p className="mb-4">Here are some examples to help you get started with our project:</p>
        <h2 className="text-2xl font-semibold mb-2">Basic Usage</h2>
        <pre className="bg-gray-100 p-2 rounded mb-4 overflow-x-auto">
          <code className="text-sm">
  {`import { OurAwesomeComponent } from 'our-awesome-project'
  
  function App() {
    return (
      <OurAwesomeComponent 
        prop1="value1"
        prop2={42}
      />
    )
  }`}
          </code>
        </pre>
        <h2 className="text-2xl font-semibold mb-2">Advanced Configuration</h2>
        <pre className="bg-gray-100 p-2 rounded mb-4 overflow-x-auto">
          <code className="text-sm">
  {`import { configure } from 'our-awesome-project'
  
  configure({
    apiKey: process.env.API_KEY,
    debugMode: process.env.NODE_ENV === 'development',
    // other options...
  })`}
          </code>
        </pre>
        <p>For more examples, check out our GitHub repository or CodeSandbox demos.</p>
      </div>
    );
  }