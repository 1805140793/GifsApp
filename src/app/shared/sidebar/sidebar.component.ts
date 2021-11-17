import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  //inyeccion de dependencias, (importo el servicio)
  constructor(private gifsService:GifsService) { }

  get historial(){
    //llamo al metodo get historial que esta en el servicio
    return this.gifsService.historial;
  }

  buscar(termino:string){
    this.gifsService.buscarGifs(termino);
  }
}
