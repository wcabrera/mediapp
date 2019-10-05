import { ConsultaResumenDTO } from './../_dto/consultaResumenDTO';
import { FiltroConsultaDTO } from './../_dto/filtroConsultaDTO';
import { Consulta } from './../_model/consulta';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { ConsultaListaExamenDTO } from '../_dto/consultaListaExamenDTO';

@Injectable({
  providedIn: 'root'
})
export class ConsultaService {

  url: string = `${environment.HOST}/consultas`;

  constructor(private http: HttpClient) { }

  registrar(consultaDTO: ConsultaListaExamenDTO) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.post(this.url, consultaDTO, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  buscar(filtroConsulta: FiltroConsultaDTO) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.post<Consulta[]>(`${this.url}/buscar`, filtroConsulta, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarExamenPorConsulta(idConsulta: number){
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.get<ConsultaListaExamenDTO[]>(`${environment.HOST}/consultaexamenes/${idConsulta}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarResumen() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.get<ConsultaResumenDTO[]>(`${this.url}/listarResumen`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  genererReporte(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.get(`${this.url}/generarReporte`, {
      responseType: 'blob'
    });
  }

  guardarArchivo(data : File){
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    let formdata : FormData = new FormData();
    formdata.append('file', data);    

    return this.http.post(`${this.url}/guardarArchivo`, formdata, {
      responseType: 'text'
    });
  }

  leerArchivo(){
    let token = sessionStorage.getItem(environment.TOKEN_NAME); 
    return this.http.get(`${this.url}/leerArchivo/1`, {
      responseType: 'blob'
    });
  }
}
