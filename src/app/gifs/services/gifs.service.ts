import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey:string='nmVSLPmkD8Npf5m3fuoVVsNeWNQG4bVd';
  private servicioUrl: string='https://api.giphy.com/v1/gifs'
  private _historial: string[]=[];

  //TODO cambiar any por el tipo correspondeitne
  public resultados: Gif[]=[];

  get historial(){
    //cortar el arreglo desde la posiscion 0 a la 10
    //this._historial=this._historial.splice(0,10);
    return [...this._historial];
  }

  //inyecto el servicio de http
  //se ejecuta solo una vez que sea llamado
  constructor(private http:HttpClient){
    //obtenemos el contindeo de localstorage
   
    /*PRIMERA FORMA
    if(localStorage.getItem('historial')){
      //coloco el ! para evitar errores en caso que sea nulo
      this._historial=JSON.parse(localStorage.getItem('historial')!);
    }*/

    //SEGUNDA FORMA
    //Si el objeto me regresa un null, entonces asigno a un arreglo vacio para evitar errores
    this._historial=JSON.parse(localStorage.getItem('historial')!)|| [];
    
    //almacenar las imagenes en el storage del navegador
    this.resultados=JSON.parse(localStorage.getItem('resultados')!)|| [];
  }

  buscarGifs( query: string = ''){
    //ingrese solo minusculas
    query=query.trim().toLowerCase();
    
    //controlo que no se repitan 
    //metodo include me permite preguntar si existe un string igual al que estoy ingresando
    if(!this._historial.includes(query)){
      //metodo unshit, coloca al principio del arreglo
      this._historial.unshift(query);
      this._historial=this._historial.splice(0,10);

      //grabar en el localstorge
      //se necesita una propiedad y un string para ocupar el metodo setItem
      localStorage.setItem('historial',JSON.stringify(this._historial));
    }
       
    /*fetch('https://api.giphy.com/v1/gifs/search?api_key=nmVSLPmkD8Npf5m3fuoVVsNeWNQG4bVd&q=dragon ball z&limit=10')
    .then(resp=>{
      resp.json().then(data=>{
        console.log(data)
      })
    }) Muestra por consola*/

    //Parametrizo las parametros en el servicio o api
    const params = new HttpParams()
      .set('api_key',this.apiKey)
      .set('limit','10')
      .set('q',query);

    //console.log(params.toString());

    //Peticiones Http (URL de postman)
    //la respuesta luce como la interfaz que creamos con quicktype
    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params})
      .subscribe( (resp) =>{
        console.log(resp.data);
        this.resultados= resp.data;
        //me ayuda con le tipado de datos
        resp.data[0].images.downsized_medium.url;
        localStorage.setItem('resultados',JSON.stringify(this.resultados));
      });
  }
}
