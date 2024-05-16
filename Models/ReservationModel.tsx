// MARK: ReservationModel

export class LockpodReservation {
  id: number;
  user_id: number;
  lockpod_id: number;
  start_time: Date;
  expected_arrival: Date;

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
    this.start_time = new Date(startTime);
    this.expected_arrival = new Date(expectedArrival);
  }

  formatArrivalTime(): string {
    var pstDate = this.expected_arrival.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    return pstDate;
  }

  formatStartTime(): string {
    var pstDate = this.start_time.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    return pstDate;
  }

  // this needs to be run because when converting the JSON date into a real date
  // the methods arent trasnfered
  updateDates() {
    const hourTime = 60 * 60 * 1000;
    const arrival = new Date(this.expected_arrival);
    const start = new Date(this.start_time);

    this.expected_arrival = new Date(arrival.getTime() - 7 * hourTime);
    this.start_time = new Date(start.getTime() - 7 * hourTime);
  }

  // returns the time remaing on the current reservation in minutes
  getTimeRemaining(): number {
    const now: Date = new Date();

    const difference: number = this.expected_arrival.getTime() - now.getTime();
    const minuteTime = 60 * 1000;
    return difference / minuteTime;
  }
}
