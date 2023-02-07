import { ThaiDatePipe } from './../pipes/thaiDate.pipe';
import { UserService } from 'src/app/services/user.service';
import { EditBookingModalComponent } from './../edit-booking-modal/edit-booking-modal.component';
import { BookingService } from './../../services/booking.service';
import { AlertService } from './../../services/alert.service';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../assets/fonts/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
@Component({
  selector: 'app-booking-modal',
  templateUrl: './booking-modal.component.html',
  styleUrls: ['./booking-modal.component.scss'],
})
export class BookingModalComponent implements OnInit {
  public booking: any = {};
  public room: any = {};
  public user: any = {};

  constructor(
    private dialogRef: MatDialogRef<BookingModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertService: AlertService,
    private bookingService: BookingService,
    private dialog: MatDialog,
    private userService: UserService,
    private thaiDatePipe: ThaiDatePipe
  ) {
    if (this.data) {
      if (this.data.booking_id) {
        this.getBookingById(this.data.booking_id);
      }
    }
  }

  ngOnInit(): void {}

  getBookingById(booking_id: number) {
    this.bookingService.getBookingById(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            if (res.data.booking) {
              this.booking = res.data.booking;
            }
            if (res.data.room) {
              this.room = res.data.room;
            }
            if (res.data.user) {
              this.user = res.data.user;
            }
          }
        }
      }
    });
  }

  onPermitClick(permit: number) {
    if (permit == 1) {
      this.alertService
        .ensureAlert('อนุญาตใช่หรือไม่?')
        .subscribe((confirm: any) => {
          if (confirm) {
            this.bookingService
              .bookingPermission(this.booking.booking_id, permit)
              .subscribe((res: any) => {
                if (res) {
                  if (res.status == 1) {
                    this.alertService.successAlert(res.msg);
                    this.dialogRef.close(true);
                  }
                }
              });
          }
        });
    } else if (permit == 2) {
      this.alertService
        .ensureAlert('ปฏิเสธใช่หรือไม่?')
        .subscribe((confirm: any) => {
          if (confirm) {
            this.bookingService
              .bookingPermission(this.booking.booking_id, permit)
              .subscribe((res: any) => {
                if (res) {
                  if (res.status == 1) {
                    this.alertService.successAlert(res.msg);
                    this.dialogRef.close(true);
                  }
                }
              });
          }
        });
    }
  }

  onEditBooking() {
    this.alertService
      .ensureEditBooking('คุณต้องการแก้ไขคำร้องนี้ใช่หรือไม่?')
      .subscribe((confirm: any) => {
        if (confirm) {
          let dialogRef = this.dialog.open(EditBookingModalComponent, {
            width: '80%',
            minWidth: '400px',
            height: '85%',
            data: {
              booking_id: this.booking.booking_id,
            },
          });

          dialogRef.afterClosed().subscribe((result: any) => {
            if (result) {
              this.getBookingById(this.booking.booking_id);
            }
          });
        }
      });
  }

  onClose() {
    this.dialogRef.close();
  }
  onPDFClick(booking_id: number) {
    this.userService.getBookingPrint(booking_id).subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.showPDF(res.data);
        }
      }
    });
  }

  async showPDF(booking: any) {
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf',
      },
    };

    const docDefinition = {
      pageSize: {
        width: 595.28,
        height: 841.995,
      },
      content: [
        {
          image: await this.getBase64ImageFromURL(
            '../../../assets/images/logo.png'
          ),
          width: 45,
          height: 45,
          absolutePosition: {
            x: 20,
            y: 20,
          },
        },
        {
          text: 'แบบฟอร์มขอใช้งานห้องประชุมศูนย์สนับสนุนบริการสุขภาพที่ ๗ \n',
          style: 'header',
          alignment: 'center',
        },
        {
          text: [
            { text: `เรื่อง\t`, style: 'subheader' },
            'ขออนุญาตใช้ห้องประชุม',
          ],
        },
        {
          text: [
            { text: `เรียน\t`, style: 'subheader' },
            'ผู้อำนวยการศูนย์สนับสนุนบริการสุขภาพที่ 7 (ผ่านหัวหน้ากลุ่มบริหารงานทั่วไปและแผนงาน)',
          ],
        },
        {
          text: "\n"
        },
        {
          table: {
            width: [300, 'auto', 'auto'],
            body: [
              [
                { text: '\t\t\t\t' },
                { text: `ด้วยข้าพเจ้า ${booking.user}`, style: 'para' },
                {
                  text: [
                    { text: '\tตำแหน่ง', style: 'subheader' },
                    `\t${booking.position}`,
                  ],
                },
              ],
            ],
          },
          layout: "noBorders",
          absolutePosition: {
            x: 70,
            y: 115
          }
        },
        {
          text: [
            { text: '\tสังกัด/ฝ่าย/แผนก', style: 'subheader' },
            `\t${booking.affiliation}`,
            {
              text: '\tมีความประสงค์ขอใช้ห้องประชุมเพื่อ ',
              style: 'subheader',
            },
            `\t${booking.purpose}`,
          ],
        },
        {
          text: [
            { text: '\tเรื่อง', style: 'subheader' },
            `\t${booking.title}`,
          ],
        },
        {
          text: [
            { text: '\tห้อง', style: 'subheader' },
            `\t${booking.room}`,
            { text: '\tในวันที่', style: 'subheader' },
            `\t${this.thaiDatePipe.transform(booking.date, 'medium')}`,
            { text: '\tตั้งแต่เวลา', style: 'subheader' },
            `\t${booking.time_start}`,
            { text: '\tถึงเวลา', style: 'subheader' },
            `\t${booking.time_end}`,
          ],
        },
        {
          text: [
            { text: '\tจำนวนผู้เข้าร่วม', style: 'subheader' },
            `\t${booking.quantity} คน`,
            { text: '\tหมายเลขโทรศัพท์', style: 'subheader' },
            `\t${booking.phone}`,
          ],
        },
        {
          columns: [
            '',
            {
              stack: [
                { text: 'อุปกรณ์ที่ขอใช้', style: 'subheader' },
                {
                  ul: booking.device,
                  lineHeight: 0.8,
                  fontSize: 12,
                },
              ],
            },
            '',
            '',
            '',
          ],
        },
        {
          text:"\n\n"
        },
        {
          columns: [
            '',
            {
              stack: [
                {
                  text: 'ลงชื่อ.......................................ผู้ขอใช้ห้องประชุม',
                  alignment: 'right',
                },
                {
                  text: '(                                                        )',
                  alignment: 'right',
                },
                { text: `ตำแหน่ง ${booking.position}`, alignment: 'right' },
                {
                  text: `${this.thaiDatePipe.transform(
                    booking.updatedAt,
                    'medium'
                  )}`,
                  alignment: 'right',
                },
              ],
            },
          ],
        },
        {
          columns: [
            {
              stack: [
                'เรียน ผู้อำนวยการศูนย์สนับสนุนบริการสุขภาพที่ ๗',
                '\t.........................................................................',
                '\t.........................................................................',
                '\n',
                '\t\t(นางเปรมฤดี โคตรสมุทร)',
                '\t\tหัวหน้ากลุ่มบริหารงานทั่วไป',
                '.................../..................../...................',
              ],
            },
            '',
          ],
        },
        {
          columns: [
            '',
            {
              stack: [
                {
                  text: [
                    {
                      text: '\u2003 \tอนุญาติ\t',
                      alignment: 'right',
                    },
                    {
                      text: '\t\u2003 \tไม่อนุญาต',
                      alignment: 'right',
                    },
                  ],
                },
                '\n',
                {
                  text: 'ลงชื่อ.........................................................',
                  alignment: 'right',
                },
                {
                  text: '(                                                    )',
                  alignment: 'right',
                },
                {
                  text: 'ตำแหน่ง .....................................................',
                  alignment: 'right',
                },
                {
                  text: '.................../..................../...................',
                  alignment: 'right',
                },
              ],
            },
          ],
        },
      ],
      defaultStyle: {
        icon: { font: 'THSarabunNew' },
        font: 'THSarabunNew',
        fontSize: 16,
      },

      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10],
        },
        subheader: {
          fontSize: 16,
          bold: true,
          margin: [0, 10, 0, 5],
        },
        para: {
          fontSize: 16,
          bold: false,
        },
        tableExample: {
          margin: [0, 5, 0, 15],
        },
      },
    };

    const pdfGenerator = pdfMake.createPdf(docDefinition);
    pdfGenerator.getBlob((blob: any) => {
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    });
  }

  getBase64ImageFromURL(url) {
    return new Promise((resolve, reject) => {
      var img = new Image();
      img.setAttribute('crossOrigin', 'anonymous');

      img.onload = () => {
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;

        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);

        var dataURL = canvas.toDataURL('image/png');

        resolve(dataURL);
      };

      img.onerror = (error) => {
        reject(error);
      };

      img.src = url;
    });
  }
}
