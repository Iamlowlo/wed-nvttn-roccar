import {Component, ElementRef, HostBinding, Input, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  public map: google.maps.Map;
  @ViewChild('gmap') gmap: ElementRef;
  private _latLng: google.maps.LatLng;
  @Input()
  private set latLng(latLng: {lat: number, lng: number}) {
    this._latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
  }
  public _height = '500px';
  public _width = '100%';
  @Input()
  public set height(height: string) {
    this._height = height;
  }
  public get height(): string {
    return this._height;
  }
  @Input()
  public set width(width: string) {
    this._width = width || '100%';
  }
  public get width(): string {
    console.log(this._width);
    return this._width;
  }

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: new google.maps.LatLng(this._latLng.lat(), this._latLng.lng()),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });
    const marker = new google.maps.Marker({position: this._latLng});
    marker.setMap(this.map);
  }

}
