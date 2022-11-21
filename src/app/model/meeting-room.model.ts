export class MeetingRoomModel {
  constructor(
    public id?: number,
    public roomName: string = "",
    public roomSize?: number,
    public roomCapacity?: number,
    public roomGallery?: any,
    public roomStatus?: number
  ){

  }
}
