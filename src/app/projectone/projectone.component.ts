import { Component, OnInit } from '@angular/core';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-projectone',
  templateUrl: './projectone.component.html',
  styleUrls: ['./projectone.component.scss']
})
export class ProjectoneComponent implements OnInit {
  searchFieldValue: string = "";
  scrapperData: any;
  constructor(private commonService: CommonServiceService) { 
    let inputObj = {
      "input": this. searchFieldValue
    }
    this.commonService.callService('http://127.0.0.1:8000/project_one/my_scrapper/', inputObj, 'post').subscribe(
      (data: any) => {
          this.scrapperData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  ngOnInit(): void {
  }

  submit(){
    let inputObj = {
      "input": this. searchFieldValue
    }
    this.commonService.callService('http://127.0.0.1:8000/project_one/my_scrapper/', inputObj, 'post').subscribe(
      (data: any) => {
          this.scrapperData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

}
