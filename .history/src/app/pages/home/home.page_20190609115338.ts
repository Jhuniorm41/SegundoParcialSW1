import { Component, ViewChild } from '@angular/core';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { IonContent, NavController } from '@ionic/angular';
import { GoogleMapsEvent, GoogleMapOptions, GoogleMap, GoogleMaps } from '@ionic-native/google-maps';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  segment = 'asistencia';
  page: number;

  @ViewChild(IonContent) content: IonContent;
  constructor(private androidFingerprintAuth: AndroidFingerprintAuth, private googleMaps: GoogleMaps) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.loadMap();
  }
  ionViewDidLoad() {
    this.loadMap();
  }
  auntenticar() {
    this.androidFingerprintAuth.isAvailable()
    .then((result) => {
      if (result.isAvailable) {
        // it is available
        this.androidFingerprintAuth.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
          // tslint:disable-next-line:no-shadowed-variable
          .then(result => {
            if (result.withFingerprint) {
              console.log('Successfully encrypted credentials.');
              console.log('Encrypted credentials: ' + result.token);
            } else if (result.withBackup) {
              console.log('Successfully authenticated with backup password!');
            } else { console.log('Didn\'t authenticate!'); }
          })
          .catch(error => {
            if (error === this.androidFingerprintAuth.ERRORS.FINGERPRINT_CANCELLED) {
              console.log('Fingerprint authentication cancelled');
            } else { console.error(error); }
          });
      } else {
        // fingerprint auth isn't available
      }
    }).catch(error => console.error(error));
  }

  onTabSelected(segmentValue: string) {
    if (segmentValue === 'ubicacion') {
      this.loadMap();
    }
    this.segment = segmentValue;
    this.content.scrollToTop();
   // this.navCtrl.navigateRoot('/' + segmentValue);
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
}

