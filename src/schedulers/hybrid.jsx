import fcfsScheduler from './fcfs';
import sjfScheduler from './sjf';
import rrScheduler from './rr';
import priorityScheduler from './priority';
import mlfqScheduler from './mlfq';

export default function hybridScheduler(processList, algorithm, contextSwitch = 0, quantum = 4, agingRate = 5) {
  // Determine which algorithm to use based on the input or custom logic
  switch (algorithm) {
    case 'FCFS':
      return fcfsScheduler(processList, contextSwitch);

    case 'SJF':
      return sjfScheduler(processList, contextSwitch);

    case 'RR':
      return rrScheduler(processList, quantum, contextSwitch);

    case 'Priority':
      return priorityScheduler(processList, contextSwitch, true, agingRate);

    case 'MLFQ':
      return mlfqScheduler(processList, contextSwitch);

    default:
      console.log('Invalid algorithm selected, defaulting to FCFS.');
      return fcfsScheduler(processList, contextSwitch); // Default to FCFS
  }
}
