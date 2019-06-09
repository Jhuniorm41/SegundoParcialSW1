import { Component, ViewChild } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { IonContent } from '@ionic/angular';

import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  GoogleMapOptions,
  CameraPosition,
  MarkerOptions,
  Marker
} from '@ionic-native/google-maps';

@Component({
  selector: 'page-ubicacion',
  templateUrl: 'ubicacion.page.html'
})
export class UbicacionPage {

  map: GoogleMap;
  @ViewChild(IonContent) content: IonContent;
  constructor(
    private navCtrl: NavController,
    private googleMaps: GoogleMaps
  ) {}

   // tslint:disable-next-line:use-life-cycle-interface
   ngOnInit(): void {
    this.loadMap();
   }
  ionViewDidLoad() {
    this.loadMap();
  }

  loadMap() {

    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: 43.0741904, // default location
          lng: -89.3809802 // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY)
    .then(() => {
      // Now you can use all methods safely.
      this.getPosition();
    })
    .catch(error => {
      console.log(error);
    });

  }

  getPosition(): void {
    this.map.getMyLocation()
    .then(response => {
      this.map.moveCamera({
        target: response.latLng
      });
      this.map.addMarker({
        title: 'My Position',
        icon: 'blue',
        animation: 'DROP',
        position: response.latLng
      });
    })
    .catch(error => {
      console.log(error);
    });
  }
  onTabSelected(segmentValue: string) {
    this.content.scrollToTop();
    this.navCtrl.navigateRoot('/' + segmentValue);
  }
}
