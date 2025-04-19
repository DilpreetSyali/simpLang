export default function sjfScheduler(processList, contextSwitch = 0) {
    const processes = [...processList];
    let currentTime = 0;
    let completed = 0;
    let result = [];
    const n = processes.length;
    const isCompleted = new Array(n).fill(false);
  
    while (completed < n) {
      // Get available processes
      const available = processes
        .map((p, i) => ({ ...p, index: i }))
        .filter((p, i) => p.arrivalTime <= currentTime && !isCompleted[i]);
  
      if (available.length === 0) {
        currentTime++; // idle
        continue;
      }
  
      // Choose process with shortest burst time
      available.sort((a, b) => a.burstTime - b.burstTime);
      const selected = available[0];
      const i = selected.index;
  
      currentTime += contextSwitch;
  
      const startTime = currentTime;
      const completionTime = startTime + selected.burstTime;
      const turnaroundTime = completionTime - selected.arrivalTime;
      const waitingTime = startTime - selected.arrivalTime;
  
      result.push({
        ...selected,
        startTime,
        completionTime,
        waitingTime,
        turnaroundTime,
        finished: true
      });
  
      isCompleted[i] = true;
      completed++;
      currentTime = completionTime;
    }
  
    return result;
  }
  