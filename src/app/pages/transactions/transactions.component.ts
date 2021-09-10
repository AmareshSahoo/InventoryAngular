import { Component, OnInit } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  constructor(private http: HttpclientService, private loading: LoadingService) { }

  destroy$ = new Subject();
  transactions:any[] = [];
  ngOnInit(): void {
    this.getAllTransactions();
  }

  getAllTransactions(){
    this.loading.setLoading(true);
    this.http.httpCall("GET", "/fetchAllTransactions").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.transactions = res.data;
      this.loading.setLoading(false);
    },(err)=>{
    this.loading.setLoading(false);
      console.log(err);
    })
  }

}
