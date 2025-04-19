export default function fcfsScheduler(processList, contextSwitch = 0) {
    const processes = [...processList].sort((a, b) => a.arrivalTime - b.arrivalTime);
    let currentTime = 0;
    let result = [];
  
    for (let p of processes) {
      // If CPU is idle
      if (p.arrivalTime > currentTime) {
        currentTime = p.arrivalTime;
      }
  
      // Simulate context switch overhead
      currentTime += contextSwitch;
  
      const startTime = currentTime;
      const completionTime = startTime + p.burstTime;
      const turnaroundTime = completionTime - p.arrivalTime;
      const waitingTime = startTime - p.arrivalTime;
  
      result.push({
        ...p,
        startTime,
        completionTime,
        waitingTime,
        turnaroundTime,
        finished: true
      });
  
      currentTime = completionTime;
    }
  
    return result;
  }
  