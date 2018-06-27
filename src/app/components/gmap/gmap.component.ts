import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {FormControl, FormGroup} from '@angular/forms';
import DirectionsStatus = google.maps.DirectionsStatus;

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  private _latLng: google.maps.LatLng;
  public isSearchboxOpened: Boolean = false;
  public map: google.maps.Map;
  public searchBox: google.maps.places.SearchBox;
  private origin: google.maps.Marker;
  private destiny: google.maps.Marker;
  private directionsService: google.maps.DirectionsService;
  private directionsDisplay: google.maps.DirectionsRenderer;
  public _height = '500px';
  public _width = '100%';
  public searchForm = new FormGroup({
    address: new FormControl('')
  });
  @ViewChild('gmap') gmap: ElementRef;
  @ViewChild('address') searchInput: ElementRef;
  @Input()
  private set latLng(latLng: {lat: number, lng: number}) {
    this._latLng = new google.maps.LatLng(latLng.lat, latLng.lng);
  }
  @Input()
  public set height(height: string) { this._height = height; }
  public get height(): string { return this._height; }
  @Input()
  public set width(width: string) { this._width = width || '100%'; }
  public get width(): string { return this._width; }

  constructor() {
    this.directionsService = new google.maps.DirectionsService;
  }

  ngOnInit() {
    this.searchBox = new google.maps.places.SearchBox(this.searchInput.nativeElement);
    this.map = new google.maps.Map(this.gmap.nativeElement, {
      center: new google.maps.LatLng(this._latLng.lat(), this._latLng.lng()),
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    });

    this.destiny = new google.maps.Marker({position: this._latLng});
    this.destiny.setMap(this.map);
    this.directionsDisplay = new google.maps.DirectionsRenderer({map: this.map});

    this.searchBox.addListener('places_changed', () => {
      const places = this.searchBox.getPlaces();

      if (places.length > 0 && places[0].geometry) {
        this.directionsService.route({
          origin: places[0].geometry.location,
          destination: this._latLng,
          travelMode: google.maps.TravelMode.DRIVING
        }, (response, status: DirectionsStatus | string) => {
          if (status === 'OK') {
            this.directionsDisplay.setDirections(response);
          } else {
            console.error('Fallo en cargar direcciones');
          }
        });
      }
      // Clear out the old markers.
      // markers.forEach(function(marker) {
      //   marker.setMap(null);
      // });
      // markers = [];

      // For each place, get the icon, name and location.
      // const bounds = new google.maps.LatLngBounds();
      // places.forEach(function(place) {
      //   if (!place.geometry) {
      //     console.log('Returned place contains no geometry');
      //     return;
      //   }
      //   var icon = {
      //     url: place.icon,
      //     size: new google.maps.Size(71, 71),
      //     origin: new google.maps.Point(0, 0),
      //     anchor: new google.maps.Point(17, 34),
      //     scaledSize: new google.maps.Size(25, 25)
      //   };
      //
      //   // Create a marker for each place.
      //   markers.push(new google.maps.Marker({
      //     map: map,
      //     icon: icon,
      //     title: place.name,
      //     position: place.geometry.location
      //   }));
      //
      //   if (place.geometry.viewport) {
      //     // Only geocodes have viewport.
      //     bounds.union(place.geometry.viewport);
      //   } else {
      //     bounds.extend(place.geometry.location);
      //   }
      // });
      // map.fitBounds(bounds);
    });
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
