import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Barcode, BarcodeScanner } from '@capacitor-mlkit/barcode-scanning';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  //usuario
  username: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';

  //scan
  isSupported = false;
  barcodes: Barcode[] = [];

  //camara
  capturedPhoto?: Photo ;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private alertController: AlertController,

    ) {}

  ngOnInit() {
    const usernameParam = this.route.snapshot.paramMap.get('username');

    if (usernameParam !== null) {
      this.username = usernameParam;

      // Recuperar datos adicionales (nombre y apellido) del usuario desde el almacenamiento local
      const userData = localStorage.getItem(this.username);
      if (userData) {
        const user = JSON.parse(userData);
        this.nombre = user.nombre;
        this.apellido = user.apellido;
        this.rut= user.rut;
        this.carrera= user.carrera;
      }
    }
    
    BarcodeScanner.isSupported().then((result) => {
      this.isSupported = result.supported;
    });

  }

  async scan(): Promise<void> {
    const granted = await this.requestPermissions();
    if (!granted) {
      this.presentAlert();
      return;
    }
    const { barcodes } = await BarcodeScanner.scan();
    this.barcodes.push(...barcodes);
  }

  async requestPermissions(): Promise<boolean> {
    const { camera } = await BarcodeScanner.requestPermissions();
    return camera === 'granted' || camera === 'limited';
  }

  async presentAlert(): Promise<void> {
    const alert = await this.alertController.create({
      header: 'Permission denied',
      message: 'Please grant camera permission to use the barcode scanner.',
      buttons: ['OK'],
    });
    await alert.present();
  }

  cerrarSesion(){
    this.router.navigate(['/login']);
  }

  async tomarFoto() {
    const image = await Camera.getPhoto({
      quality: 90,
      allowEditing: false,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
    });
    this.capturedPhoto = image;
  }

  borrarFoto() {
    this.capturedPhoto = undefined; // Borra la foto asignándole un valor undefined
  }
}
