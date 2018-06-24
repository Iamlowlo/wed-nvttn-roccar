import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  private _latLng: google.maps.LatLng;
  public isSearchboxOpened: Boolean = false;
  public map: google.maps.Map;
  public _height = '500px';
  public _width = '100%';
  public searchForm = new FormGroup({
    address: new FormControl('')
  });
  @ViewChild('gmap') gmap: ElementRef;
  @Input()
  private set latLng(latLng: {lat: number, lng: number}) {
    this._latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
  }
  @Input()
  public set height(height: string) { this._height = height; }
  public get height(): string { return this._height; }
  @Input()
  public set width(width: string) { this._width = width || '100%'; }
  public get width(): string { return this._width;}

  constructor() { }

  ngOnInit() {
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: new google.maps.LatLng(this._latLng.lat(), this._latLng.lng()),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    });
    const marker = new google.maps.Marker({position: this._latLng});
    marker.setMap(this.map);
  }
  toggleSearchbox() {
    this.isSearchboxOpened = !this.isSearchboxOpened;
  }

  onFocus($event) {
    $event.target.classList.add('ng-focused');
  }

  onBlur($event) {
    $event.target.classList.remove('ng-focused');
  }

}
