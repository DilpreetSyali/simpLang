import React, { useState } from "react";
import { useParams } from "react-router-dom";
import schedulerMap from "../schedulers"; 

export default function AlgorithmDemo() {
  const { algoKey } = useParams();
  const algorithm = schedulerMap[algoKey?.toUpperCase()];

  const [processes, setProcesses] = useState([]);
  const [output, setOutput] = useState(null);
  const [arrivalTime, setArrivalTime] = useState("");
  const [burstTime, setBurstTime] = useState("");
  const [priority, setPriority] = useState("");

  const handleAddProcess = () => {
    if (!arrivalTime || !burstTime) return;

    const newProcess = {
      id: processes.length + 1,
      arrivalTime: parseInt(arrivalTime),
      burstTime: parseInt(burstTime),
      priority: priority ? parseInt(priority) : null,
    };

    setProcesses([...processes, newProcess]);
    setArrivalTime("");
    setBurstTime("");
    setPriority("");
  };

  const handleSimulate = () => {
    if (!algorithm) return;
    const result = algorithm(processes);
    setOutput(result);
  };

  if (!algorithm) return <div className="text-center text-red-600 mt-6">Invalid algorithm selected.</div>;

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">{algoKey.toUpperCase()} Simulation</h2>

      {/* Form Inputs */}
      <div className="flex gap-4 mb-4">
        <input
          type="number"
          placeholder="Arrival Time"
          className="border p-2 rounded"
          value={arrivalTime}
          onChange={(e) => setArrivalTime(e.target.value)}
        />
        <input
          type="number"
          placeholder="Burst Time"
          className="border p-2 rounded"
          value={burstTime}
          onChange={(e) => setBurstTime(e.target.value)}
        />
        {/* Only show priority if needed */}
        {(algoKey === "Priority" || algoKey === "MLFQ") && (
          <input
            type="number"
            placeholder="Priority"
            className="border p-2 rounded"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          />
        )}
        <button onClick={handleAddProcess} className="bg-blue-500 text-white px-4 rounded">Add Process</button>
      </div>

      {/* Display current process list */}
      {processes.length > 0 && (
        <div className="mb-4">
          <h3 className="font-semibold mb-2">Processes:</h3>
          <ul className="list-disc list-inside">
            {processes.map((p) => (
              <li key={p.id}>
                P{p.id} — AT: {p.arrivalTime}, BT: {p.burstTime}
                {p.priority !== null && `, Priority: ${p.priority}`}
              </li>
            ))}
          </ul>
        </div>
      )}

      <button
        onClick={handleSimulate}
        className="bg-green-500 text-white px-6 py-2 rounded mt-4"
      >
        Simulate
      </button>

      {/* Output */}
      {output && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold mb-2">Simulation Result:</h3>
          <pre className="bg-gray-100 p-4 rounded">{JSON.stringify(output, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
