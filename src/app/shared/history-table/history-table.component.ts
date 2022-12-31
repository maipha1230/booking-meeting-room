import { BookingTable } from './../../model/bookingTable.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Component,
  OnInit,
  Inject,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit {
  public date = {
    dateFrom: '',
    dateTo: '',
  };
  public dataSource: MatTableDataSource<BookingTable>;
  displayedColumns: string[] = [
    'id',
    'room',
    'title',
    'purpose',
    'quantity',
    'date',
    'time',
    'user',
  ];
  @ViewChild('pdf2') pdf: ElementRef;

  constructor(
    private dialogRef: MatDialogRef<HistoryTableComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    @Inject(DOCUMENT) private document: Document
  ) {}

  ngOnInit(): void {
    if (this.data) {
      if (this.data.date) {
        this.date = this.data.date;
      }
      if (this.data.booking) {
        this.initDataSource(this.data.booking)
      }
    }
  }

  public initDataSource(data: any) {
    this.dataSource = new MatTableDataSource<BookingTable>(data);
    this.exportToPDF();
  }

  exportToPDF() {


  }




}
