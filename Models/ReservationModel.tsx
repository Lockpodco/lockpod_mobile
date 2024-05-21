// MARK: ReservationModel

import { UserProfile } from "./UserProfileModel";
import { endReservation } from "../services/ReservationService";
import { updateLockPodStatus } from "../services/LockpodService";

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

  // MARK: Convenience Functinos
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

  // MARK: Methods
  cancelReservation = async (userProfile: UserProfile, method: string) => {
    // cancel the reservation object
    await endReservation(this.id, method);

    // remove it from active reservations in the userProfile
    const removingIndex = userProfile.activeReservations.indexOf(this.id);
    userProfile.activeReservations.splice(removingIndex, 1);

    userProfile.reservationHistory.push(this.id);
    await userProfile.saveChangesToDataBase();

    // updates the status of the lockpod
    updateLockPodStatus(this.lockpod_id, false, false);
  };
}
