import { Router } from '@angular/router';
import { AlertService } from './../../services/alert.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../assets/fonts/vfs_fonts.js';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss'],
})
export class BookingListComponent implements OnInit {
  booking_list: any[] = [];
  dateNow = new Date();
  constructor(
    private userService: UserService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dateNow = new Date();
    this.getBookingList();
  }

  getBookingList() {
    this.userService.userBookingList().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.booking_list = res.data;
          this.booking_list.forEach((b: any) => {
            b.date = new Date(b.date);
          });
        }
      }
    });
  }

  onEditBooking(booking_id: number) {
    this.alertService
      .ensureEditBooking('คุณต้องการแกไข้ฟอร์มการจองใช่หรือไม่?')
      .subscribe((confirm: any) => {
        if (confirm) {
          this.router.navigate(['/booking-meeting-room', booking_id]);
        }
      });
  }

  onRemoveBooking(booking_id: number) {
    this.alertService
      .ensureDeleteAlert('คุณต้องการยกเลิกการจองใช่หรือไม่')
      .subscribe((confirm: any) => {
        if (confirm) {
          this.userService
            .userRemoveBooking(booking_id)
            .subscribe((res: any) => {
              if (res) {
                if (res.status == 1) {
                  this.alertService.successAlert(res.msg);
                  this.getBookingList();
                }
              }
            });
        }
      });
  }

  onPDFClick(booking: any) {
    pdfMake.fonts = {
      THSarabunNew: {
        normal: 'THSarabunNew.ttf',
        bold: 'THSarabunNew Bold.ttf',
        italics: 'THSarabunNew Italic.ttf',
        bolditalics: 'THSarabunNew BoldItalic.ttf',
      },
    };

    const docDefinition = {
      content: [
        {
          text: 'แบบฟอร์มขอใช้งานห้องประชุมศูนย์สนับสนุนบริการสุขภาพที่ ๗ \n\n',
          style: 'header',
          alignment: 'center',
        },
        {
          text: [{ text: `เรื่อง\t`, style: 'subheader' }, '55555555'],
        },
        {
          text: [
            { text: `เรียน\t`, style: 'subheader' },
            'ผู้อำนวยการศูนย์สนับสนุนบริการสุขภาพที่ 7 (ผ่านหัวหน้ากลุ่มบริหารงานทั่วไปและแผนงาน)',
          ],
        },
        {
          text: [
            '\n',
            { text: 'ด้วยข้าพเจ้า ปฐมพงษ์ สีพลแสน', style: 'para' },
            { text: '\tตำแหน่ง', style: 'subheader' },
            '\tโปรแกรมเมอร์',
          ],
        },
        {
          text: [
            { text: '\tสังกัด/ฝ่าย/แผนก', style: 'subheader' },
            '\tบริหารงานทั่วไป',
            {
              text: '\tมีความประสงค์ขอใช้ห้องประชุมเพื่อ ',
              style: 'subheader',
            },
            '\tสัมมนา',
          ],
        },
        {
          text: [
            { text: '\tเรื่อง', style: 'subheader' },
            '\tสัมมนาการเบิกงบสำหรับเครื่องมือแพทย์ปี พุทธศุกราช 2566',
          ],
        },
        {
          text: [
            { text: '\tในวันที่', style: 'subheader' },
            '\t25 กุมภาพันธ์ 2566',
          ],
        },
        {
          text: [
            { text: '\tตั้งแต่เวลา', style: 'subheader' },
            '\t10.00',
            { text: '\tถึงเวลา', style: 'subheader' },
            '\t12.00',
          ],
        },
        {
          text: [
            { text: '\tจำนวนผู้เข้าร่วม', style: 'subheader' },
            '\t6 คน',
            { text: '\tหมายเลขโทรศัพท์', style: 'subheader' },
            '\t0638970954',
          ],
        },
        {
          columns: [
            '',
            {
              stack: [
                { text: 'อุปกรณ์ที่ขอใช้', style: 'subheader' },
                {
                  ul: [
                    '\t\t\titem 1',
                    '\t\t\titem 2',
                    '\t\t\titem 3',
                    '\t\t\titem 1',
                    '\t\t\titem 2',
                    '\t\t\titem 3',
                    '\t\t\titem 1',
                    '\t\t\titem 2',
                    '\t\t\titem 3',
                    '\t\t\titem 1',
                  ],
                  lineHeight: 0.8,
                  fontSize: 12
                },
              ],
            },
            '',
            '',
            '',
          ],
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
                { text: 'ตำแหน่ง โปรแกรมเมอร์', alignment: 'right' },
                { text: 'วันที่ 1 กุมภาพันธ์ 2566', alignment: 'right' },
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
                'วันที่ 1 กุมภาพันธ์ 2566',
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
                  text: 'ลงชื่อ.......................................ผู้ขอใช้ห้องประชุม',
                  alignment: 'right',
                },
                {
                  text: '(                                                        )',
                  alignment: 'right',
                },
                { text: 'ตำแหน่ง โปรแกรมเมอร์', alignment: 'right' },
                { text: 'วันที่ 1 กุมภาพันธ์ 2566', alignment: 'right' },
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
}
