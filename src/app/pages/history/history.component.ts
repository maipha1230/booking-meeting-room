import { AlertService } from './../../services/alert.service';
import { BookingDetailModalComponent } from './../../shared/booking-detail-modal/booking-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from './../../services/booking.service';
import { BookingTable } from './../../model/bookingTable.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = ['id', 'room', 'title', 'purpose', 'quantity', 'date', 'time', 'user', 'action' ];
  public formDate: FormGroup;
  public dataSource: MatTableDataSource<BookingTable>;
  public showDownload: boolean = false;
  public bookingList: BookingTable[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  public pageOffset:number = 0;
  constructor(private formBuilder: FormBuilder, private bookingService: BookingService, private dialog: MatDialog, private alertService: AlertService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<BookingTable>([])
    this.createFormDate();
  }

  ngAfterContentInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createFormDate(){
    this.formDate = this.formBuilder.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required]
    })
  }

  onSearchClick(){
    if (this.formDate.valid) {
      let dateFrom = this.formDate.controls['dateFrom'].value
      let dateTo = this.formDate.controls['dateTo'].value

      this.bookingService.getBookingHistory(dateFrom, dateTo).subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            this.bookingList = res.data
            this.initDataSource(this.bookingList)
            this.showDownload = true
          }
        }
      })
    } else {
      this.alertService.warningAlert("กรุณาเลือกวันที่")
    }
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource<BookingTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: any) {
    let filterValue:string = event.value
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onDetailClick(booking_id:number) {
    let dialogRef = this.dialog.open(BookingDetailModalComponent, {
      width: '80%',
      minWidth: '400px',
      height: '100%',
      data: {
        booking_id: booking_id
      }
    })
  }

}
