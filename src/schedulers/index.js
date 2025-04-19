import fcfsScheduler from './fcfs';
import sjfScheduler from './sjf';
import rrScheduler from './rr';
import priorityScheduler from './priority';
import mlfqScheduler from './mlfq';
import hybridScheduler from './hybrid';

const schedulerMap = {
  FCFS: fcfsScheduler,
  SJF: sjfScheduler,
  RR: rrScheduler,
  PRIORITY: priorityScheduler,
  MLFQ: mlfqScheduler,
  HYBRID: hybridScheduler,
};

export default schedulerMap;
