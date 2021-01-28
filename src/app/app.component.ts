import { Component } from '@angular/core';
import { CommonServiceService } from './common-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';

  constructor(private commonService: CommonServiceService){
  }

  isProjectOneActive = false;
  isProjectTwoActive = false;
  clickToProject(input){
    if(input.toLocaleLowerCase()=="one"){
      this. isProjectOneActive = true;
      this. isProjectTwoActive = false;
    }
    else{
      this. isProjectOneActive = false;
      this. isProjectTwoActive = true;
    }
  }
}
