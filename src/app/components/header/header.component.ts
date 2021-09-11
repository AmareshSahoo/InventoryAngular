import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private http: HttpclientService, private loading: LoadingService) { }
  destroy$ = new Subject();

  user: any = {}
  ngOnInit(): void {
   const auth = localStorage.getItem("auth");
   if(auth){
     this.user = JSON.parse(auth);
   }
  }

  initData(){
    this.loading.setLoading(true);
    this.http.httpCall("GET", "/initdata").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      if(res && res.success){
        alert(res.message)
      }
      this.loading.setLoading(false);
    },(err)=>{
      this.loading.setLoading(false);
      alert(err.message)
      console.log(err);
    })
  }
  logout(){
    localStorage.removeItem("auth");
    this.user = {};
  }
}
