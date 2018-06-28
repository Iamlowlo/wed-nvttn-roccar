import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lunch',
  templateUrl: './lunch.container.html',
  styleUrls: ['./lunch.container.scss']
})
export class LunchContainer implements OnInit {
  public lunchAddress = {
    lat: 40.4277714,
    lng: -3.6902783
  };
  public ceremonyAddress = {
    lat: 40.393525,
    lng: -3.7000989
  };
  public ceremonySuggestion = {
    label: 'la ceremonia',
    coords: this.ceremonyAddress
  };

  constructor() { }

  ngOnInit() {
  }

}
