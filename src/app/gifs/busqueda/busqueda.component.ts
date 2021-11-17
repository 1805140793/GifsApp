import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  /*Se activa al presionar una tecla
  buscar( event:KeyboardEvent){
    console.log(event)    
  }*/

  /*Decorador viewChild
  Busca el id (#) del componente en html
  ! Operador para asegurar que el objeto no es nulo 
  decorador (nombreElemento) nombrePropiedad
  */

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  //Inyeccion de dependencias
  constructor(private gifsService:GifsService){}

  buscar( termino:String){
    const valor = this.txtBuscar.nativeElement.value;
    
    if(valor.trim().length==0){
      return;
    }
    //al importar el servicio tengo acceso a los metodos declarados en ese servicio
    this.gifsService.buscarGifs(valor);
    
    //console.log(valor);
    this.txtBuscar.nativeElement.value='';
  }
}
