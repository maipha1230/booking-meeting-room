export class BookingTable {
  constructor(
    public index: number = 0,
    public booking_id: number = 0,
    public room_name: string = '',
    public title: string = '',
    public purpose: string = '',
    public quantity: number = 0,
    public date: string = '',
    public time: string = '',
    public user: string = ''
  ){

  }
}
