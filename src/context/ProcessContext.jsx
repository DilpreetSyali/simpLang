import { createContext, useState, useContext } from "react";

const ProcessContext = createContext();

export const ProcessProvider = ({ children }) => {
  const [processes, setProcesses] = useState([]);
  const [quantum, setQuantum] = useState(4); // for RR
  const [contextSwitch, setContextSwitch] = useState(0); // overhead in ms

  const addProcess = (newProcess) => {
    setProcesses((prev) => [...prev, newProcess]);
  };

  const resetProcesses = () => setProcesses([]);

  return (
    <ProcessContext.Provider
      value={{
        processes,
        setProcesses,
        addProcess,
        resetProcesses,
        quantum,
        setQuantum,
        contextSwitch,
        setContextSwitch,
      }}
    >
      {children}
    </ProcessContext.Provider>
  );
};

export const useProcess = () => useContext(ProcessContext);
