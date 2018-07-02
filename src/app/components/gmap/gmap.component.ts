import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { } from '@types/googlemaps';
import {FormControl, FormGroup} from '@angular/forms';
import DirectionsStatus = google.maps.DirectionsStatus;
import GeocoderStatus = google.maps.GeocoderStatus;

interface Suggestion {
  label: string;
  coords: {
    lat: number;
    lng: number;
  };
}

@Component({
  selector: 'app-gmap',
  templateUrl: './gmap.component.html',
  styleUrls: ['./gmap.component.scss']
})
export class GmapComponent implements OnInit {
  private _latLng: google.maps.LatLng;
  private _suggestion: Suggestion;
  private _suggestionLatLng: google.maps.LatLng;
  public isSearchboxOpened: Boolean = false;
  public isRequesting: Boolean = false;
  public map: google.maps.Map;
  public searchBox: google.maps.places.SearchBox;
  private destiny: google.maps.Marker;
  private directionsService: google.maps.DirectionsService;
  private directionsDisplay: google.maps.DirectionsRenderer;
  private geocoder: google.maps.Geocoder;
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
  public set suggestion(suggestion: Suggestion) {
    this._suggestion = suggestion;
    this._suggestionLatLng = new google.maps.LatLng(suggestion.coords.lat, suggestion.coords.lng);
  }
  public get suggestion(): Suggestion { return this._suggestion; }
  @Input()
  public set height(height: string) { this._height = height; }
  public get height(): string { return this._height; }
  @Input()
  public set width(width: string) { this._width = width || '100%'; }
  public get width(): string { return this._width; }

  constructor() {
    this.directionsService = new google.maps.DirectionsService;
    this.geocoder = new google.maps.Geocoder;
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
        this.requestDirections(places[0].geometry.location);

      }
    });
  }
  toggleSearchbox(addressValue?) {
    this.isSearchboxOpened = !this.isSearchboxOpened;
    if (!!addressValue) {
      this.searchForm.controls.address.markAsTouched()
      this.searchForm.setValue({
        address: addressValue
      });
    } else {
      this.searchForm.controls.address.setValue('');
      this.searchForm.controls.address.markAsUntouched();
    }
  }

  onFocus($event) {
    $event.target.classList.add('ng-focused');
  }

  onBlur($event) {
    $event.target.classList.remove('ng-focused');
  }

  requestDirections(location) {
      this.directionsService.route({
        origin: location,
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

  setOriginFromSuggestion() {
    if (!this.isRequesting) {
      this.isRequesting = true;
      this.geocoder.geocode({location: this._suggestionLatLng}, (result, status: GeocoderStatus | string) => {
        this.isRequesting = false;
        if (status === 'OK') {
          this.toggleSearchbox(result[0].formatted_address);
          this.requestDirections(this._suggestionLatLng);
        }
      });
    }
  }

}
