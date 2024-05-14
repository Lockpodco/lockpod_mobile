export class LockpodSession {
  id: number;
  user_id: number;
  lockpod_id: number;
  startTime: Date;
  endTime: Date;
  isActive: boolean;

  public constructor(
    id: number = 0,
    user_id: number = 0,
    lockpod_id: number = 0,
    isActive: boolean = false,
    startTime: Date = new Date(),
    endTime: Date = new Date()
  ) {
    this.id = id;
    this.user_id = user_id;
    this.lockpod_id = lockpod_id;
    this.isActive = isActive;
    this.startTime = startTime;
    this.endTime = endTime;
  }
}
