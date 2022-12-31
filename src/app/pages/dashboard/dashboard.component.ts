import { AlertService } from './../../services/alert.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DasboardService } from './../../services/dasboard.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  public lineChart: Chart;
  public pieChart: Chart;
  public roomTime: any[] = [];
  public affiliation_count: any[] = [];
  public bookingsOverview: any[] = [];
  public bookingsTotal: number = 0;
  public usersOverview: any[] = [];
  public usersTotal: number = 0;
  public adminsOverview: any[] = [];
  public adminsTotal: number = 0;
  public dateStart: any = null;
  public dateEnd: any = null;
  constructor(
    private dashboardService: DasboardService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getBookingsOverview();
    this.getAdminOverview();
    this.getUserOverview();
    this.getRoomTime();
    this.getAffiliationChart();
  }

  getBookingsOverview() {
    this.dashboardService.getBookingsOverview().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            this.bookingsOverview = res.data;
          }
          if (res.total) {
            this.bookingsTotal = res.total;
          }
        }
      }
    });
  }

  getUserOverview() {
    this.dashboardService.getUserOverview().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            this.usersOverview = res.data;
          }
          if (res.total) {
            this.usersTotal = res.total;
          }
        }
      }
    });
  }

  getAdminOverview() {
    this.dashboardService.getAdminOverview().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          if (res.data) {
            this.adminsOverview = res.data;
          }
          if (res.total) {
            this.adminsTotal = res.total;
          }
        }
      }
    });
  }

  getRoomTime() {
    this.dashboardService
      .getRoomTime(this.dateStart, this.dateEnd)
      .subscribe((res: any) => {
        if (res) {
          if (res.status == 1) {
            this.roomTime = res.data;
          }
        }
      });
  }

  onSearchRoomTime() {
    if (this.dateStart == null || this.dateEnd == null) {
      this.alertService.warningAlert('กรุณากรอกช่วงเวลาให้ครบ');
    } else {
      this.dashboardService
        .getRoomTime(this.dateStart, this.dateEnd)
        .subscribe((res: any) => {
          if (res) {
            if (res.status == 1) {
              this.roomTime = res.data;
            }
          }
        });
    }
  }

  getAffiliationChart() {
    this.dashboardService.getAffiliationChart().subscribe((res: any) => {
      if (res) {
        if (res.status == 1) {
          this.pieChart = new Chart('pieChart', {
            type: 'pie',
            data: res.data,
          });
          if (res.count) {
            this.affiliation_count = res.count;
          }
        }
      }
    });
  }
}
