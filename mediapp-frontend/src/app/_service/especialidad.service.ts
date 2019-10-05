import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Especialidad } from '../_model/especialidad';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class EspecialidadService {

  especialidadCambio = new Subject<Especialidad[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/especialidades`;

  constructor(private http: HttpClient) { }

  listar() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<Especialidad[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPorId(idEspecialidad: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<Especialidad>(`${this.url}/${idEspecialidad}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(especialidad: Especialidad) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.post(this.url, especialidad, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(especialidad: Especialidad) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.put(this.url, especialidad, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idEspecialidad: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.delete(`${this.url}/${idEspecialidad}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
