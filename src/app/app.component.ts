import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoadingService } from './services/loader.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'AirportFuelInventoryAngular';
  loading: boolean = false;

  constructor(private loadingService: LoadingService, private cdRef: ChangeDetectorRef
    ) { }

  ngOnInit() {

  }

  ngAfterViewInit(){
    this.loadingService.isLoading$.subscribe(res=>{
      this.loading = res;
      this.cdRef.detectChanges();
    })
  }
}
