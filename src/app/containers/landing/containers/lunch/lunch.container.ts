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
    lat: 40.3929116,
    lng: -3.7013951
  };

  constructor() { }

  ngOnInit() {
  }

}
