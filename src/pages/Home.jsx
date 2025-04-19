import React from "react";
import AlgorithmCard from "../components/AlgorithmCard";
import bgImage from "../assets/cpu_bg.png";

const algorithms = [
  {
    name: "First Come First Serve (FCFS)",
    key: "fcfs",
    description: "Processes are executed in the order they arrive.",
    videoUrl: "https://www.youtube.com/watch?v=8bLRJkznJoY",
  },
  {
    name: "Shortest Job First (SJF)",
    key: "sjf",
    description: "Selects the process with the shortest burst time.",
    videoUrl: "https://www.youtube.com/watch?v=0sOvCWFmrtA",
  },
  {
    name: "Round Robin (RR)",
    key: "rr",
    description: "Each process gets equal CPU time in circular order.",
    videoUrl: "https://www.youtube.com/watch?v=s6SH72uAn3Q",
  },
  {
    name: "Priority Scheduling",
    key: "priority",
    description: "Each process is assigned a priority and executed accordingly.",
    videoUrl: "https://www.youtube.com/watch?v=0Wq1gCs2Qv8",
  },
  {
    name: "Multilevel Feedback Queue (MLFQ)",
    key: "mlfq",
    description: "Processes can move between multiple queues with different priorities.",
    videoUrl: "https://www.youtube.com/watch?v=jaG5y4vr9eg",
  }
];

export default function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center p-6"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="text-center text-white font-bold text-3xl mb-8 drop-shadow-lg">
        🧠 CPU Scheduling Algorithms
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {algorithms.map((algo) => (
          <AlgorithmCard
            key={algo.key}
            title={algo.name}
            description={algo.description}
            videoUrl={algo.videoUrl}
            algoKey={algo.key}
          />
        ))}
      </div>
    </div>
  );
}
