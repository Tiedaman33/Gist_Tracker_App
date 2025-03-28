export default function GistCard({ gist }) {
    return (
      <div className="p-4 border rounded mt-4">
        <h2 className="text-lg font-semibold">{gist.description}</h2>
        <pre className="mt-2 p-2 bg-gray-50 rounded">
          {Object.values(gist.files)[0].content}
        </pre>
        <div className="mt-4 flex space-x-2">
          <button className="px-4 py-2 bg-blue-600 text-white rounded">Edit</button>
          <button className="px-4 py-2 bg-red-600 text-white rounded">Delete</button>
        </div>
      </div>
    );
  }