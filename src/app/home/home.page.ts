import { Component } from '@angular/core';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private androidFingerprintAuth: AndroidFingerprintAuth) { }

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
}

