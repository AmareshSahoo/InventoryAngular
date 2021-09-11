import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  constructor(private http: HttpclientService, private loading: LoadingService, private fb: FormBuilder) { }

  destroy$ = new Subject();
  transactions:any[] = [];
  showTransactionForm:boolean = false;
  airports:any[] = [];
  aircrafts:any[] = [];

  transactionForm = this.fb.group({
    transaction_type: [null, Validators.required],
    airport_id: [null, Validators.required],
    aircraft_id: [null],
    quantity: [null, Validators.required]
  });

  ngOnInit(): void {
    this.getAllTransactions();
    this.getAllAirports();
    this.getAllAircrafts();
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
      alert(err.message);
    })
  }

  getAllAirports(){
    this.http.httpCall("GET", "/airport/fetchAllAirports").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.airports = res.data;
    },(err)=>{
      console.log(err);
    })
  }

  getAllAircrafts(){
    this.http.httpCall("GET", "/airport/fetchAllAircrafts").pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.aircrafts = res.data;
    },(err)=>{
      console.log(err);
    })
  }

  showform(){
    this.showTransactionForm = !this.showTransactionForm;
  }

  changeTxnType(val: string){
    console.log(val);
    if( val === "IN"){
      this.transactionForm.controls['aircraft_id'].disable();
      this.transactionForm.controls['aircraft_id'].setValue(null);
    }else{
      this.transactionForm.controls['aircraft_id'].enable();
    }
  }

  onSubmit(form: FormGroup){
    console.log("-====",form.value);
    const {transaction_type,airport_id,aircraft_id,quantity } = form.value;
    if(transaction_type === "OUT" && aircraft_id == null){
      alert("Please choose a aircraft");
      return
    }
    this.loading.setLoading(true);
    this.http.httpCall("POST", "/createTransaction", {transaction_type,airport_id,aircraft_id,quantity}).pipe(takeUntil(this.destroy$)).subscribe((res:any)=>{
      console.log(res);
      this.loading.setLoading(false);
      alert(res.message)
      if(res && res.success){
        this.transactionForm.reset();
        this.showTransactionForm = false;
        this.getAllTransactions();
      }
    },(err)=>{
      this.loading.setLoading(false);
      alert(err.message)
      console.log(err);
    })
  }

  reset(){
    this.transactionForm.reset();
  }
}
