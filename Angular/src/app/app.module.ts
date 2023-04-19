import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { Calendar } from './calendar/calendar.component';

import {
  DxDropDownBoxModule,
  DxCalendarModule,
  DxTextBoxModule
} from "devextreme-angular";

@NgModule({
  declarations: [
    AppComponent,
    Calendar
  ],
  imports: [
		BrowserModule,
    DxDropDownBoxModule,
    DxCalendarModule,
    DxTextBoxModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
