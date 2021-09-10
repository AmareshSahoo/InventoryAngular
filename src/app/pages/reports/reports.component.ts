import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private http: HttpclientService, private loading: LoadingService) { }

  destroy$ = new Subject();
  reports:Object = {};
  ngOnInit(): void {
    this.getReports();
  }

  getReports(){
    this.loading.setLoading(true);
    this.http.httpCall("GET", "/getReports").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.reports = res.data;
      this.loading.setLoading(false);
    },(err)=>{
    this.loading.setLoading(false);
      console.log(err);
    })
  }

}
