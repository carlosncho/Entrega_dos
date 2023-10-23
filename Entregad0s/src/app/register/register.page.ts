import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { DatosRegionalesService } from '../servicios/datos-regionales.service';
//import { DatosComunaService } from '../servicios/datos-comuna.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  username: string = '';
  password: string = '';
  nombre: string = '';
  apellido: string = '';
  rut: string = '';
  carrera: string = '';
  regiones: any[] = [];
  selectedRegion: any; // Declaración de la propiedad para almacenar la región seleccionada
/*  comunas: any[] = [];
  selectedComuna: any; // Declaración de la propiedad para almacenar la región seleccionada
*/

  constructor(
    private router: Router,
    private alertController: AlertController,
    private datosRegionalesService: DatosRegionalesService,
//    private datosComunaService: DatosComunaService
  ) {}

  ngOnInit() {
    this.obtenerRegiones();
//    this.obtenerComunas();

  }

  obtenerRegiones() {
    this.datosRegionalesService.obtenerRegiones().subscribe(
      (data) => {
        this.regiones = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

/*  obtenerComunas() {
    this.datosComunaService.obtenerComunas().subscribe(
      (data) => {
        this.comunas = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las comunas: ', error);
      }
    );
  }
*/
  register() {
    if (
      !this.username ||
      !this.password ||
      !this.nombre ||
      !this.apellido ||
      !this.rut ||
      !this.carrera ||
      !this.selectedRegion //|| // Asegurarse de que se haya seleccionado una región
      //!this.selectedComuna
      ) {
      this.mostrarAlerta('Error', 'Por favor, rellena todos los campos.');
      return; // Detener la función si hay campos vacíos
    }

    // Crear un objeto para almacenar los datos del usuario
    const userData = {
      username: this.username,
      password: this.password,
      nombre: this.nombre,
      apellido: this.apellido,
      rut: this.rut,
      carrera: this.carrera,
      region: this.selectedRegion,
      //comuna: this.selectedComuna
    };

    // Convertir el objeto a una cadena JSON y almacenarlo en el almacenamiento local
    localStorage.setItem(this.username, JSON.stringify(userData));
    this.router.navigate(['/login']);
  }

  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.alertController.create({
      header: titulo,
      message: mensaje,
      buttons: ['Aceptar'],
    });

    await alert.present();
  }


}