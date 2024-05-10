// MARK: LockPodModel

export class LockPod {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  isReserved: boolean;
  isInSession: boolean;

  public constructor(
    id: number = 0,
    latitude: number = 0,
    longitude: number = 0,
    name: string = "",
    isReserved: boolean = false,
    isInSession: boolean = false
  ) {
    this.id = id;
    this.latitude = latitude;
    this.longitude = longitude;
    this.name = name;
    this.isReserved = isReserved;
    this.isInSession = isInSession;
  }
}
