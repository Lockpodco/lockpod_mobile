// MARK: ReservationModel

export class LockpodReservation {
  id: number;
  user_id: number;
  lockpod_id: number;
  startTime: Date;
  expectedArrival: Date;

  public constructor(
    id: number = 0,
    user_id: number = 0,
    lockpod_id: number = 0,
    startTime: Date = new Date(),
    expectedArrival: Date = new Date()
  ) {
    this.id = id;
    this.user_id = user_id;
    this.lockpod_id = lockpod_id;
    this.startTime = startTime;
    this.expectedArrival = expectedArrival;
  }
}
