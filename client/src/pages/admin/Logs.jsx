import React from "react";

const Logs = () => {
  const sampleLogs = [
    { id: 1, action: "User login", timestamp: "2025-04-20 10:15" },
    { id: 2, action: "Content updated", timestamp: "2025-04-19 16:42" },
  ];

  return (
    <div className="p-6 text-white">
      <h2 className="text-2xl font-semibold mb-4">System Logs</h2>
      <table className="min-w-full bg-black/40 rounded text-left">
        <thead>
          <tr className="text-red-500">
            <th className="p-3">#</th>
            <th className="p-3">Action</th>
            <th className="p-3">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {sampleLogs.map((log) => (
            <tr key={log.id} className="border-t border-gray-700">
              <td className="p-3">{log.id}</td>
              <td className="p-3">{log.action}</td>
              <td className="p-3">{log.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Logs;
