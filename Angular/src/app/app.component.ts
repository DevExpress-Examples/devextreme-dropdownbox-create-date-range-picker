import { Component } from '@angular/core';

import { formatDate } from "devextreme/localization";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  dateRangeValue: Date[] = [new Date(2023, 3, 18), new Date(2023, 3, 23)];

  mapDates(data: any) {
    return data.map((value: any) => formatDate(value, "shortDate")).join(" - ");
  }

  updateDateRangeValue(e: any) {
    this.dateRangeValue = e;
  }
}