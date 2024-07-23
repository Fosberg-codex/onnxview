export default function ApiReferencePage() {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">API Reference</h1>
        <p className="mb-4">Here's a quick overview of our main API endpoints:</p>
        <ul className="mb-4 space-y-2">
          <li>
            <code className="bg-gray-100 px-1 rounded">GET /api/users</code>: Retrieve all users
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">POST /api/users</code>: Create a new user
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">GET /api/users/:id</code>: Retrieve a specific user
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">PUT /api/users/:id</code>: Update a user
          </li>
          <li>
            <code className="bg-gray-100 px-1 rounded">DELETE /api/users/:id</code>: Delete a user
          </li>
        </ul>
        <p>For more detailed information about request and response formats, check our full API documentation.</p>
      </div>
    );
  }
  