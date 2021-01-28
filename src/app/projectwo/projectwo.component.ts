import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonServiceService } from '../common-service.service';

@Component({
  selector: 'app-projectwo',
  templateUrl: './projectwo.component.html',
  styleUrls: ['./projectwo.component.scss']
})
export class ProjectwoComponent implements OnInit {
  isRequestCreate = false;
  requestData: any;
  requestDataArr: any = [];
  commonMasterData: any;
  checkBoxArr = [];
  isCheckBoxArrEmpty = true;
  is_logged_in = false;
  is_register_new_account = false;
  isPasswordConfirmed = false;
  constructor(public commonService: CommonServiceService) {
    if(localStorage.getItem('id')){
      this.is_logged_in=true;
    }
   }
  profileForm = new FormGroup({
    description: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    pinCode: new FormControl('', [Validators.required]),
    countryCode: new FormControl('', [Validators.required]),
    alternateNumber: new FormControl('', [Validators.required])
  });
  
  registrationForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phone: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    confPassword: new FormControl('', [Validators.required])
  });

  checkPassword(){
    if(this.registrationForm.controls.password.value == this.registrationForm.controls.confPassword.value) {
      this.isPasswordConfirmed = true;
    }
    else{
      this.isPasswordConfirmed = false;
    }
  }

  ngOnInit(): void {
    this. commonService.callService('http://127.0.0.1:8000/project_two/master_data/', "", 'get').subscribe(
      (data: any) => {
          this. commonMasterData = data;
      },
      (error: any) => {
        console.log(error);
      }
      
    );
    if(localStorage.getItem('id')){
      this.commonService.callService('http://127.0.0.1:8000/project_two/user_all_requests/'+localStorage.getItem('id'), "", 'get').subscribe(
        (data: any) => {
            this.requestDataArr = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    }

  }

  viewRecord(input){
    this.commonService.callService('http://127.0.0.1:8000/project_two/request_by_id/'+input.id+"/", "", 'get').subscribe(
      (data: any) => {
          this.requestData = data;
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  createRequest(){
    this.requestData = null;
    this. isRequestCreate = !this. isRequestCreate;
  }

  selectCheckBox(isChecked, value){
    if(isChecked){
      this.checkBoxArr.push(value);
      this. isCheckBoxArrEmpty = false;
    }
    else{
      const index = this.checkBoxArr.indexOf(value);
      if (index > -1) {
        this.checkBoxArr.splice(index, 1);
      }
      if(this.checkBoxArr.length < 1){
        this. isCheckBoxArrEmpty = true;        
      }
    }
  }

  onlyNumbers(event){
    return (event.charCode > 47 && event.charCode < 58);
  }

  submitMessage = null;

  submit(){
    let obj = {
      "request_type": this.checkBoxArr.toString(),
      "state_id":parseInt(this.profileForm.controls.state.value),
      "user_id": localStorage.getItem('id'),
      "description": this.profileForm.controls.description.value,
      "city": this.profileForm.controls.city.value,
      "pincode": this.profileForm.controls.pinCode.value,
      "alternate_phone": this.profileForm.controls.countryCode.value+this.profileForm.controls.alternateNumber.value
    };
    this.commonService.callService('http://127.0.0.1:8000/project_two/request/', obj, 'post').subscribe(
      (data: any) => {
          console.log(data)
          this. submitMessage = 'Request Submitted successfully',
          this.commonService.callService('http://127.0.0.1:8000/project_two/user_all_requests/'+localStorage.getItem('id'), "", 'get').subscribe(
            (data: any) => {
                this.requestDataArr = data;
            },
            (error: any) => {
              console.log(error);
            }
          );
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  email:any;
  password:any;

  login(){
  let obj = {
    "email": this.email,
    "password": this.password
  }
  this.commonService.callService('http://127.0.0.1:8000/project_two/login/', obj, 'post').subscribe(
    (data: any) => {
      localStorage.setItem('id', data.id);
      this.commonService.callService('http://127.0.0.1:8000/project_two/user_all_requests/'+data.id, "", 'get').subscribe(
        (data: any) => {
          this. is_logged_in = true;
            this.requestDataArr = data;
        },
        (error: any) => {
          console.log(error);
        }
      );
    },
    (error: any) => {
      console.log(error);
    }
  );

  }
  registerMessage: any;
  onRegister(){
    let obj = {
      "name": this.registrationForm.controls.name.value,
      "email":this.registrationForm.controls.email.value,
      "phone": this.registrationForm.controls.phone.value,
      "password": this.registrationForm.controls.password.value
    };
    this.commonService.callService('http://127.0.0.1:8000/project_two/register/', obj, 'post').subscribe(
      (data: any) => {
        this. registerMessage = "Registration successfull"
      },
      (error: any) => {
        this. registerMessage = "Some Error occured"
      }
    );
  }


}
