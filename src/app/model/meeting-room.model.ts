export class MeetingRoomModel {
  constructor(
    public room_id?: number,
    public room_name: string = "",
    public room_size_id?: number,
    public room_size: string = "",
    public room_capacity?: number,
    public room_gallery: any = [],
    public room_status_id?: number,
    public room_status: string = ""
  ){

  }
}
