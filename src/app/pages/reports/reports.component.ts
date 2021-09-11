import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { HttpclientService } from 'src/app/services/httpclient.service';
import { LoadingService } from 'src/app/services/loader.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent implements OnInit {

  constructor(private http: HttpclientService, private loading: LoadingService) { }

  destroy$ = new Subject();
  reports = {};
  @ViewChild('content',{static: false}) content!: ElementRef;

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
      alert(err.message);
    })
  }

  public SavePDF(): void {
    html2canvas(this.content.nativeElement).then(canvas => {
      let fileWidth = 180;
      let fileHeight = canvas.height * fileWidth / canvas.width;
      const FILEURI = canvas.toDataURL('image/png')
      let PDF = new jsPDF('p', 'mm', 'a4');
      PDF.addImage(FILEURI, 'PNG', 10, 10, fileWidth, fileHeight)
      PDF.save('Fule_Inventory_Report.pdf');
    });
  }

  isEmptyObject(obj:object):boolean {
    return (obj && (Object.keys(obj).length === 0));
  }

}
