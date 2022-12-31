import { HistoryTableComponent } from './../../shared/history-table/history-table.component';
import { AlertService } from './../../services/alert.service';
import { BookingDetailModalComponent } from './../../shared/booking-detail-modal/booking-detail-modal.component';
import { MatDialog } from '@angular/material/dialog';
import { BookingService } from './../../services/booking.service';
import { BookingTable } from './../../model/bookingTable.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../assets/fonts/vfs_fonts.js";
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import { ThaiDatePipe } from 'src/app/shared/pipes/thaiDate.pipe';
@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss'],
})
export class HistoryComponent implements OnInit {
  displayedColumns: string[] = [
    'id',
    'room',
    'title',
    'purpose',
    'quantity',
    'date',
    'time',
    'user',
    'action',
  ];
  public formDate: FormGroup;
  public dataSource: MatTableDataSource<BookingTable>;
  public showDownload: boolean = false;
  public bookingList: BookingTable[] = [];
  @ViewChild('paginator') paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  public pageOffset: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private bookingService: BookingService,
    private dialog: MatDialog,
    private alertService: AlertService,
    private thaiDate: ThaiDatePipe
  ) {}

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<BookingTable>([]);
    this.createFormDate();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  createFormDate() {
    this.formDate = this.formBuilder.group({
      dateFrom: [null, Validators.required],
      dateTo: [null, Validators.required],
    });
  }

  onSearchClick() {
    if (this.formDate.valid) {
      let dateFrom = this.formDate.controls['dateFrom'].value;
      let dateTo = this.formDate.controls['dateTo'].value;

      this.bookingService
        .getBookingHistory(dateFrom, dateTo)
        .subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.bookingList = res.data;
              this.initDataSource(this.bookingList);
              this.showDownload = true;
            }
          }
        });
    } else {
      this.alertService.warningAlert('กรุณาเลือกวันที่');
    }
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource<BookingTable>(data);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  public applyFilter(event: any) {
    let filterValue: string = event.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  public onDetailClick(booking_id: number) {
    let dialogRef = this.dialog.open(BookingDetailModalComponent, {
      width: '80%',
      minWidth: '400px',
      height: '100%',
      data: {
        booking_id: booking_id,
      },
    });
  }

  onPDFClick() {
    // let dateFrom = this.formDate.controls['dateFrom'].value;
    // let dateTo = this.formDate.controls['dateTo'].value;
    // let dialogRef = this.dialog.open(HistoryTableComponent, {
    //   width: '80%',
    //   minWidth: '400px',
    //   height: '95%',
    //   data: {
    //     date: {
    //       dateFrom: dateFrom,
    //       dateTo: dateTo
    //     },
    //     booking: this.bookingList
    //   }
    // })

    pdfMake.fonts = {
      THSarabunNew: {
        normal: "THSarabunNew.ttf",
        bold: "THSarabunNew Bold.ttf",
        italics: "THSarabunNew Italic.ttf",
        bolditalics: "THSarabunNew BoldItalic.ttf"
        },
    }
    let dateFrom = this.thaiDate.transform(
      this.formDate.controls['dateFrom'].value,
      'short'
    );
    let dateTo = this.thaiDate.transform(
      this.formDate.controls['dateTo'].value,
      'short'
    );

    let headers: any[] = ["ลำดับ", "ห้อง", "เรื่อง" , "จุดประสงค์", "จำนวนผู้เข้าร่วม", "วันที่", "เวลา", "ผู้จอง"]
    let headerOptions:any[] = []
    let data: any[] = []
    headers.forEach((h: any) => {
      headerOptions.push({ text: h , bold: true})
    })
    data.push(headerOptions)

    this.bookingList.forEach((b:BookingTable) => {
      let temp = []
      temp.push(b.index)
      temp.push(b.room_name)
      temp.push(b.title)
      temp.push(b.purpose)
      temp.push(b.quantity)
      temp.push(this.thaiDate.transform(b.date, "short"))
      temp.push(b.time)
      temp.push(b.user)
      data.push(temp)
    })

    const docDefinition = {

      content: [
        { text: "ประวัติการใช้งานห้องประชุมศูนย์สนับสนุนบริการสุขภาพที่ 7", style: "header" },
        `วันที่: ${dateFrom} - ${dateTo}`,
        {
          table: {
            widths: [ 20, 50, 100, 40,55, 55, '*', '*' ],
            body: data
          }
        }
      ], defaultStyle: {
        font: "THSarabunNew"
        },

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5]
        },
        tableExample: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download(`ประวัติการใช้งานห้องประชุม ศบส7 ${dateFrom} - ${dateTo}.pdf`);

  }

  exportExcel(): void {
    /* pass here the table id */
    let element = document.getElementById('tableData');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);

    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');

    let dateFrom = this.thaiDate.transform(
      this.formDate.controls['dateFrom'].value,
      'short'
    );
    let dateTo = this.thaiDate.transform(
      this.formDate.controls['dateTo'].value,
      'short'
    );

    /* save to file */
    XLSX.writeFile(
      wb,
      `ประวัติการใช้งานห้องประชุม ศบส7 ${dateFrom} - ${dateTo}.xlsx`
    );
  }
}
