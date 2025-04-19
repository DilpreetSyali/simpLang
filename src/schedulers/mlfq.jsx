export default function mlfqScheduler(processList, contextSwitch = 0) {
    const processes = [...processList].map((p, idx) => ({
      ...p,
      remainingTime: p.burstTime,
      queueLevel: 0,
      startTime: null,
      completionTime: null,
      turnaroundTime: 0,
      waitingTime: 0,
      finished: false,
      lastExecuted: null,
      id: p.id ?? idx
    }));
  
    const n = processes.length;
    let currentTime = 0;
    let completed = 0;
    const result = [];
  
    // Queues: 0 -> High, 1 -> Mid, 2 -> Low
    const queues = [[], [], []];
    const quantum = [4, 8, Infinity];
  
    const arrived = new Set();
  
    while (completed < n) {
      // Add new arrivals to highest priority queue
      for (let i = 0; i < n; i++) {
        if (!arrived.has(i) && processes[i].arrivalTime <= currentTime) {
          queues[0].push(i);
          arrived.add(i);
        }
      }
  
      let selectedIndex = -1;
      let currentQueue = -1;
  
      for (let q = 0; q < 3; q++) {
        if (queues[q].length > 0) {
          selectedIndex = queues[q].shift();
          currentQueue = q;
          break;
        }
      }
  
      if (selectedIndex === -1) {
        currentTime++; // idle
        continue;
      }
  
      const process = processes[selectedIndex];
  
      // Context switch overhead
      currentTime += contextSwitch;
  
      // First execution
      if (process.startTime === null) {
        process.startTime = currentTime;
      }
  
      const execTime = Math.min(quantum[currentQueue], process.remainingTime);
      process.remainingTime -= execTime;
      currentTime += execTime;
      process.lastExecuted = currentTime;
  
      // Add newly arrived during execution
      for (let i = 0; i < n; i++) {
        if (!arrived.has(i) && processes[i].arrivalTime <= currentTime) {
          queues[0].push(i);
          arrived.add(i);
        }
      }
  
      if (process.remainingTime > 0) {
        // Demote to lower queue
        process.queueLevel = Math.min(2, process.queueLevel + 1);
        queues[process.queueLevel].push(selectedIndex);
      } else {
        // Process finished
        process.completionTime = currentTime;
        process.turnaroundTime = process.completionTime - process.arrivalTime;
        process.waitingTime = process.turnaroundTime - process.burstTime;
        process.finished = true;
        completed++;
        result.push({ ...process });
      }
    }
  
    return result;
  }
  