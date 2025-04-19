export default function rrScheduler(processList, quantum = 4, contextSwitch = 0) {
    const processes = [...processList].map((p) => ({
      ...p,
      remainingTime: p.burstTime,
      startTime: null,
      completionTime: null,
      waitingTime: 0,
      turnaroundTime: 0,
      finished: false
    }));
  
    let queue = [];
    let currentTime = 0;
    let completed = 0;
    let result = [];
    const arrived = new Set();
    const n = processes.length;
  
    while (completed < n) {
      // Add all new arrivals to the queue
      for (let i = 0; i < n; i++) {
        if (!arrived.has(i) && processes[i].arrivalTime <= currentTime) {
          queue.push(i);
          arrived.add(i);
        }
      }
  
      if (queue.length === 0) {
        currentTime++; // idle time
        continue;
      }
  
      const index = queue.shift();
      const process = processes[index];
  
      // Context switch overhead
      currentTime += contextSwitch;
  
      // First time starting
      if (process.startTime === null) {
        process.startTime = currentTime;
      }
  
      const execTime = Math.min(quantum, process.remainingTime);
      process.remainingTime -= execTime;
      currentTime += execTime;
  
      // Check for new arrivals during execution
      for (let i = 0; i < n; i++) {
        if (!arrived.has(i) && processes[i].arrivalTime <= currentTime) {
          queue.push(i);
          arrived.add(i);
        }
      }
  
      if (process.remainingTime > 0) {
        queue.push(index); // Re-queue
      } else {
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
  