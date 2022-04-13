import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

  @Input() totalItems: number;
  @Input() totalPrice: number;
  @Input() totalPriceWithPutDiscount: number;



  constructor() { }

  ngOnInit(): void {
  }

}
