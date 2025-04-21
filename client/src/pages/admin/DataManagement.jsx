import React from "react";

const DataManagement = () => {
  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">Manage Content</h2>
      <p className="text-lg mb-2">This section is for adding, updating, and deleting programs (movies/series).</p>
      <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
        + Add New Program
      </button>
    </div>
  );
};

export default DataManagement;
