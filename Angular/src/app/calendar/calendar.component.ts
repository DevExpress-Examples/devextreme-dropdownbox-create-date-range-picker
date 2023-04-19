import { Component, Input, Output, EventEmitter } from "@angular/core";
import { DxDropDownBoxComponent } from "devextreme-angular";

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class Calendar {
  @Input() dateRangeValue!: Date[];
  @Input() dropDownBox!: DxDropDownBoxComponent;

  @Output() emitter = new EventEmitter<any>();

  emitData() {
    this.emitter.emit(this.dateRangeValue);
  }

  cellTemplate: any;

  onValueChanged(e: any) {
    const calendar = e.component;
    if (this.dateRangeValue.length >= 2 || e.value < this.dateRangeValue[0])
      this.dateRangeValue = [];

    this.dateRangeValue.push(e.value);

    calendar.repaint();
    calendar.focus();

    if (this.dateRangeValue.length === 2) {
      this.dropDownBox.instance.close();
      this.dropDownBox.instance.focus();
    }

    this.emitData();
  }

  ngOnChanges() {
    this.cellTemplate = (cellInfo: any, index: any, container: any) => {
      const cellDate = cellInfo.date;

      if (
        cellDate >= this.dateRangeValue[0] &&
        cellDate <= this.dateRangeValue[1]
      ) {
        container.classList.add("dx-calendar-selected-date");
      }

      return "cell";
    };
  }
}
