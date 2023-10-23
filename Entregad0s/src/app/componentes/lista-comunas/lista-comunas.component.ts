import { Component, OnInit } from '@angular/core';
import { DatosComunaService } from 'src/app/servicios/datos-comuna.service';

@Component({
  selector: 'app-lista-comunas',
  templateUrl: './lista-comunas.component.html',
  styleUrls: ['./lista-comunas.component.scss'],
})
export class ListaComunasComponent  implements OnInit {
  comunas:any[]=[]
  constructor(private datosComunaService: DatosComunaService) { }

  ngOnInit() {}

  obtenerComunas() {
    this.datosComunaService.obtenerComunas().subscribe(
      (data) => {
        this.comunas = data.data;
      },
      (error) => {
        console.error('Error no se pueden obtener las regiones: ', error);
      }
    );
  }

}
