import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from './services/httpclient.service';
import { LoadingService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'AirportFuelInventoryAngular';
  loading: boolean = false;
  destroy$ = new Subject();

  constructor(private loadingService: LoadingService, private cdRef: ChangeDetectorRef, private http: HttpclientService
    ) { }

    ngOnInit() {
      const auth = localStorage.getItem("auth");
      if(!auth){
        this.userLogin("admin@gmail.com","123456");
      }
    }

  ngAfterViewInit(){
    this.loadingService.isLoading$.subscribe(res=>{
      this.loading = res;
      this.cdRef.detectChanges();
    })
  }

  userLogin(email: string, password: string){
    this.http.httpCall("POST","/user/login", {email, password}).pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      if(res && res.success){
        console.log(res);
        localStorage.setItem("auth", JSON.stringify(res.data))
      }
    },(err)=>{
      console.log(err)
    })
  }
}
