export default function priorityScheduler(processList, contextSwitch = 0, enableAging = true, agingRate = 5) {
    const processes = [...processList];
    const n = processes.length;
    let currentTime = 0;
    let completed = 0;
    let isCompleted = new Array(n).fill(false);
    let result = [];
  
    // Clone priorities to avoid mutating original
    let priorities = processes.map(p => p.priority);
  
    while (completed < n) {
      // Aging logic
      if (enableAging) {
        for (let i = 0; i < n; i++) {
          if (!isCompleted[i] && processes[i].arrivalTime <= currentTime) {
            const waitingTime = currentTime - processes[i].arrivalTime;
            priorities[i] = Math.max(1, processes[i].priority - Math.floor(waitingTime / agingRate));
          }
        }
      }
  
      // Get available processes
      const available = processes
        .map((p, i) => ({ ...p, index: i, currentPriority: priorities[i] }))
        .filter((p, i) => p.arrivalTime <= currentTime && !isCompleted[i]);
  
      if (available.length === 0) {
        currentTime++; // idle
        continue;
      }
  
      // Choose the process with highest priority (lowest number)
      available.sort((a, b) => a.currentPriority - b.currentPriority);
      const selected = available[0];
      const i = selected.index;
  
      // Context switch overhead
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
  
      currentTime = completionTime;
      isCompleted[i] = true;
      completed++;
    }
  
    return result;
  }
  