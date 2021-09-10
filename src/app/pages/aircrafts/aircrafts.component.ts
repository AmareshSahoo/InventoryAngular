import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.css']
})
export class AircraftsComponent implements OnInit {
  constructor(private http: HttpclientService, private loading: LoadingService) { }

  destroy$ = new Subject();
  aircrafts:any[] = [];
  ngOnInit(): void {
    this.getAllAircrafts();
  }

  getAllAircrafts(){
    this.loading.setLoading(true);
    this.http.httpCall("GET", "/airport/fetchAllAircrafts").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.aircrafts = res.data;
      this.loading.setLoading(false);
    },(err)=>{
    this.loading.setLoading(false);
      console.log(err);
    })
  }


}
