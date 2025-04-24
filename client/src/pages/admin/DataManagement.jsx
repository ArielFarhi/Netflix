import React, { useState } from "react";
import AddProgramForm from "../../components/AddProgramForm";

const DataManagement = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-6 text-white max-w-3xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Manage Content</h2>
      <p className="text-lg mb-4">
        This section is for adding, updating, and deleting programs (movies/series).
      </p>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {showForm ? "Close Form" : "+ Add New Program"}
      </button>
      {showForm && (
        <AddProgramForm
          onSuccess={() => {
            alert("Program added!");
            setShowForm(false);
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
};

export default DataManagement;