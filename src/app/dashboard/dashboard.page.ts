import {Component, ElementRef,OnInit,ViewChild,Input,Inject,} from "@angular/core";
import { AttendanceService } from "../Services/attendance.service";
import { EmployeeService } from "../Services/employee.service";
import { StatServiceService } from "../Services/stat-service.service";
import { Chart } from "chart.js";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { SharedService } from "../Services/shared.service";
import { AppSettings } from "../Settings/AppSettings";
import { ModalController, ToastController } from "@ionic/angular";
import { QrattendancePage } from "../qrattendance/qrattendance.page";

@Component({
  selector: "app-dashboard",
  templateUrl: "./dashboard.page.html",
  styleUrls: ["./dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
  @ViewChild("doughnutCanvas", { static: true }) doughnutCanvas;
  @ViewChild("doughnutCanvas2", { static: true }) doughnutCanvas2;

  @ViewChild("barchartCanvas", { static: true }) barchartCanvas;

  employeesList: any = [];
  dateFrom: any;
  dateTo: any;
  selectedEmployee: any;
  doughnutChart: Chart;
  doughnutChart2: Chart;
  barChart: any;
  lineChart: Chart;
  nbEmp: any;
  empIn: any;
  pie: any;
  pie1: any;
  nbDelays: any;
  timeForm: FormGroup;
  statDateForm: FormGroup;
  start: any;
  end: any;
  myTime: any;
  public admin: Boolean = this.sharedService.verifyAdmin();

  employees: any;
  from: Date;
  to: Date;
  emp: any;
  employeeDetails: any;
  stat: any[];
  cols: any[];
  items: any[];
  its: any[];
  itss: any[];
  today: any;
  currentUser: any;
  showDiagram: any;
  workStart: any;
  workEnd: any;
  exportColumns: any[];

  constructor(
    private formBuilder: FormBuilder,
    private attendanceSerice: AttendanceService,
    private employeeService: EmployeeService,
    private statService: StatServiceService,
    private sharedService: SharedService,
    public toastController: ToastController,
    private modalController: ModalController
  ) {
    this.items = [{ expanded: false }];
    this.its = [{ expanded: false }];
    this.itss = [{ expanded: false }];
    this.showDiagram = false;
    this.today = new Date().toISOString().slice(0, 10);

    this.employeeService.count().subscribe((data: any) => {
      this.nbEmp = data;
      console.log("test", this.nbEmp);
    });
    this.attendanceSerice.count().subscribe((data: any) => {
      this.empIn = data;
      console.log("nbIn", this.empIn);

      this.doughnutChart = new Chart(this.doughnutCanvas.nativeElement, {
        type: "doughnut",
        data: {
          labels: ["Attendance", "Absence"],
          datasets: [
            {
              data: [this.empIn, this.nbEmp - this.empIn],
              backgroundColor: ["#f56d1f", "#000000"],
              hoverBackgroundColor: ["#f56d1f", "#000000"],
            },
          ],
        },
      });
    });

    this.statService.fetchStatsAttendance().subscribe((data: any) => {
      //this.nbDelays = data.Delays;
      console.log("delays", this.nbDelays);
      this.doughnutChart2 = new Chart(this.doughnutCanvas2.nativeElement, {
        type: "doughnut",
        data: {
          labels: ["In Time", "Delay"],
          datasets: [
            {
              data: [data.Intime, data.Delays],
              backgroundColor: ["#f56d1f", "#000000"],
              hoverBackgroundColor: ["#f56d1f", "#000000"],
            },
          ],
        },
      });
    });
  }
  ngOnInit() {
    this.getWorkTime();
    this.timeForm = this.formBuilder.group({
      fromTime: ["", [Validators.required]],
      toTime: ["", [Validators.required]],
    });
    this.statDateForm = this.formBuilder.group({
      fromDate: ["", [Validators.required]],
      toDate: ["", [Validators.required]],
      selectedId: ["", Validators.required],
    });
    this.getEmployees();
    this.currentUser = AppSettings.details;
    console.log(this.currentUser);
    this.barChart = new Chart(this.barchartCanvas.nativeElement, {
      type: "bar",
      data: {
        datasets: [
          {
            label: 'Statistics',
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  async setTime() {
    if (this.timeForm.valid) {
      this.start = new Date(this.timeForm.value.fromTime);
      var myTimeStart = this.start.getHours() + ":" + this.start.getMinutes();
      console.log(myTimeStart);
      this.end = new Date(this.timeForm.value.toTime);
      var myTimeEnd = this.end.getHours() + ":" + this.end.getMinutes();
      console.log(myTimeEnd);

      if (this.end.getHours() > this.start.getHours()) {
        this.attendanceSerice
          .setWorkTime(myTimeStart, myTimeEnd)
          .subscribe((data) => {
            console.log(data);
          });
      } else {
        const toast = await this.toastController.create({
          message: "Choose time correctly !",
          duration: 2000,
          cssClass: "toast-scheme",
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: "Invalid form !",
        duration: 2000,
        cssClass: "toast-scheme",
      });
      toast.present();
    }
  }

  async getEmployeeAttendanceStats() {
    //if(this.statDateForm.valid){
    this.dateFrom = new Date(this.statDateForm.value.fromDate);
    this.dateTo = new Date(this.statDateForm.value.toDate);
    this.selectedEmployee = this.statDateForm.value.selectedId;

    //this part changes dates from Wed Mar 10 2021 10:44:16 GMT+0100 (UTC+01:00) to 2021-03-10 as the params demand
    var event = new Date(this.dateFrom);
    let customDateFrom = JSON.stringify(event);
    customDateFrom = customDateFrom.slice(1, 11);

    var event2 = new Date(this.dateTo);
    let customDateTo = JSON.stringify(event2);
    customDateTo = customDateTo.slice(1, 11);

    //this.emp = this.statDateForm.value.selectedEmployee
    //console.log(this.emp);

    if (this.statDateForm.valid) {
      if (this.statDateForm.value.fromDate < this.statDateForm.value.toDate) {
        this.statService
          .getByEmployee(this.selectedEmployee, customDateFrom, customDateTo)
          .subscribe((element) => {
            this.employeeDetails = element;

            const data = [this.employeeDetails.nbDelay, 0];
            const data1 = [this.employeeDetails.presence, 0];
            const data2 = [this.employeeDetails.extraHours, 0];
            this.barChart = new Chart(this.barchartCanvas.nativeElement, {

              type: "bar",
              data: {
                labels: ["Delays", "Presence", "Extra Hours"],
                datasets: [
                  {
                    label: 'User Statistics',
                    data: [data, data1, data2],
                    backgroundColor: ["#fff4b3", "#ffe866", "#e6c300"],
                    borderColor: ["#ccad00", "#ccad00", "#ccad00"],
                    borderWidth: 0.8,
                  },
                ],
              },
              options: {
                scales: {
                  yAxes: [
                    {
                      ticks: {
                        beginAtZero: true,
                      },
                    },
                  ],
                },
              },
            });
          });
      } else {
        const toast = await this.toastController.create({
          message: "Choose dates correctly !",
          duration: 2000,
          color: "warning",
          cssClass: "toast-scheme",
        });
        toast.present();
      }
    } else {
      const toast = await this.toastController.create({
        message: "Invalid form !",
        duration: 2000,
        color: "warning",
        cssClass: "toast-scheme",
      });
      toast.present();
    }
    this.showDiagram = true;
  }

  getEmployees() {
    this.employeeService.getEmployee().subscribe((data) => {
      this.employeesList = data;
      console.log(this.employeesList);
    });
  }

getWorkTime(){
  this.attendanceSerice.getWorkTime().subscribe(data =>{
    this.workStart = data['timetableStart'].substring(11,16)
    this.workEnd = data['timetableEnd'].substring(11,16)
    console.log("Work Time Start",data['timetableStart'].substring(11,16))
    console.log("Work Time End",data['timetableEnd'].substring(11,16))


  })
}

  async openMyModalQrScanner() {
    const myModal = await this.modalController.create({
      component: QrattendancePage,
      cssClass: "my-custom-Qr-modal-css",
    });

    return await myModal.present();
  }

  expandItem(item): void {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.items.map((listItem) => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }

  expandIt(item) {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.its.map((listItem) => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
  expandIts(item) {
    if (item.expanded) {
      item.expanded = false;
    } else {
      this.itss.map((listItem) => {
        if (item == listItem) {
          listItem.expanded = !listItem.expanded;
        } else {
          listItem.expanded = false;
        }
        return listItem;
      });
    }
  }
}
