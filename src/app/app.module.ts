import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProjectoneComponent } from './projectone/projectone.component';
import { ProjectwoComponent } from './projectwo/projectwo.component';
import { HttpClientModule } from '@angular/common/http';
import { CommonServiceService } from './common-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProjectoneComponent,
    ProjectwoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [CommonServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
