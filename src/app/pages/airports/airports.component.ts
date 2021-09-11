import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-airports',
  templateUrl: './airports.component.html',
  styleUrls: ['./airports.component.css']
})
export class AirportsComponent implements OnInit {

  constructor(private http: HttpclientService, private loading: LoadingService) { }

  destroy$ = new Subject();
  airports:any[] = [];
  ngOnInit(): void {
    this.getAllAirports();
  }

  getAllAirports(){
    this.loading.setLoading(true);
    this.http.httpCall("GET", "/airport/fetchAllAirports").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.airports = res.data;
      this.loading.setLoading(false);
    },(err)=>{
    this.loading.setLoading(false);
      console.log(err);
      alert(err.message);
    })
  }
}
