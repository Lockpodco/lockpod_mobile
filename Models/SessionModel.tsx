import { updateLockPodStatus } from "../services/LockpodService";
import { endSession } from "../services/SessionServices";
import { UserProfile } from "./UserProfileModel";

export class LockpodSession {
  id: number;
  user_id: number;
  lockpod_id: number;
  start_time: Date;
  end_time: Date;
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
    this.start_time = startTime;
    this.end_time = endTime;
  }

  // this needs to be run because when converting the JSON date into a real date
  // the methods arent trasnfered
  updateDates() {
    const hourTime = 60 * 60 * 1000;
    const arrival = new Date(this.end_time);
    const start = new Date(this.start_time);

    this.end_time = new Date(arrival.getTime() - 7 * hourTime);
    this.start_time = new Date(start.getTime() - 7 * hourTime);
  }

  static formatArrivalTime(time: Date): string {
    var pstDate = time.toLocaleString("en-US", {
      timeZone: "America/Los_Angeles",
    });
    return pstDate;
  }

  getElapsedTime(): number {
    const now = new Date().getTime();
    const minuteTime = 60 * 1000;

    return (now - this.start_time.getTime()) / minuteTime;
  }

  getElapsedTimeMessage(): string {
    const elapsedTime = this.getElapsedTime();
    return `${Math.round(elapsedTime)} minutes`;
  }

  // MARK: Methods
  end = async (userProfile: UserProfile) => {
    // cancel the reservation object
    await endSession(this.id);

    // remove it from active reservations in the userProfile
    const removingIndex = userProfile.activeSessions.indexOf(this.id);
    userProfile.activeSessions.splice(removingIndex, 1);

    userProfile.sessionHistory.push(this.id);
    await userProfile.saveChangesToDataBase();

    // updates the status of the lockpod
    updateLockPodStatus(this.lockpod_id, false, false);
  };
}
