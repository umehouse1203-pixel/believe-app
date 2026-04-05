export interface Target {
  name: string;
  photoUrl: string | null;
}

export interface Session {
  id: string;
  targetName: string;
  durationSeconds: number;
  date: string; // ISO string
}
export interface EndStats {
  globalHours: number;
  localHours: number;
  globalPeople: number;
  localPeople: number;
}
