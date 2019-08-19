import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rang-slider',
  templateUrl: './rang-slider.component.html',
  styleUrls: ['./rang-slider.component.scss'],
})
export class RangSliderComponent implements OnInit {

  public iocName: string;
  public rangvalue: number;
  constructor() { }

  ngOnInit() { }

}
