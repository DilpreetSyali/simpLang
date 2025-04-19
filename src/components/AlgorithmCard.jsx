import React from "react";
import { useNavigate } from "react-router-dom";

export default function AlgorithmCard({ title, description, videoUrl, algoKey }) {
  const navigate = useNavigate();

  return (
    <div className="bg-white/80 backdrop-blur-md border border-gray-300 rounded-2xl shadow-lg p-6 hover:shadow-xl hover:scale-105 transition duration-300">
      <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
      <p className="text-gray-600 text-sm mb-4">{description}</p>
      <div className="flex flex-col space-y-2">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-center text-sm"
        >
          🎥 Watch Video
        </a>
        <button
          onClick={() => navigate(`/demo/${algoKey}`)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
        >
          🧪 Try Demo
        </button>
      </div>
    </div>
  );
}
