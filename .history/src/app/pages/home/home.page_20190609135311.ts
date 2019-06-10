import { Component, ViewChild } from '@angular/core';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';
import { IonContent, NavController } from '@ionic/angular';
import { GoogleMapsEvent, GoogleMapOptions, GoogleMap, GoogleMaps, CameraPosition, LatLng } from '@ionic-native/google-maps';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  map: GoogleMap;
  coordenadas: any = {};
  latitude = -17.7761288;
  longitude = -63.1949231;
  segment = 'asistencia';
  page: number;

  @ViewChild(IonContent) content: IonContent;
  constructor(private androidFingerprintAuth: AndroidFingerprintAuth,
              private googleMaps: GoogleMaps,
              private geolocation: Geolocation) { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit(): void {
    this.getCurrentPosition();
  }
  ionViewDidLoad() {
    this.loadMap(this.latitude, this.longitude);
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
    this.segment = segmentValue;
    if (segmentValue === 'ubicacion') {
      this.ionViewDidLoad();
    }
    this.content.scrollToTop();
   // this.navCtrl.navigateRoot('/' + segmentValue);
  }

  loadMap(latitude, longitude) {
    const mapOptions: GoogleMapOptions = {
      camera: {
        target: {
          lat: latitude, // default location
          lng: longitude // default location
        },
        zoom: 18,
        tilt: 30
      }
    };

    this.map = this.googleMaps.create('map_canvas', mapOptions);

    // Wait the MAP_READY before using any methods.
    // this.map.one(GoogleMapsEvent.MAP_READY)
    // .then(() => {
    //   // Now you can use all methods safely.
    //   this.getPosition();
    // })
    // .catch(error => {
    //   console.log(error);
    // });

  }

  getCurrentPosition() {
    this.geolocation.getCurrentPosition()
    .then(position => {
      // tslint:disable-next-line:no-unused-expression
     // this.latitude: position.coords.latitude;
      // tslint:disable-next-line:no-unused-expression
     // this.longitude: position.coords.longitude;
     this.coordenadas = position.coords;
     this.loadMap(position.coords.latitude, position.coords.longitude);
     console.warn(this.coordenadas);

    })
    .catch(error => {
      console.log(error);
    });
  }
}

