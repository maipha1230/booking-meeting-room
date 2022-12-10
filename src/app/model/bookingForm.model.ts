export class BookingFormModel {
    constructor(
        public booking_id: number = 0,
        public room?: number,
        public title: string = "",
        public purpose?: number,
        public quantity?: number,
        public device: any = [],
        public date?: any,
        public time_start: string = "",
        public time_end: string = ""
        ){

    }
}
