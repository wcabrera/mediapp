import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Paciente } from '../_model/paciente';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  pacienteCambio = new Subject<Paciente[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listar() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<Paciente[]>(this.url, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  listarPageable(p: number, s: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<any>(`${this.url}/pageable?page=${p}&size=${s}`, {
         headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
       });
  }
  // return this.http.get<Menu[]>(`${this.url}/menus`, {
  //   headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
  // });
  listarPorId(idPaciente: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<Paciente>(`${this.url}/${idPaciente}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(paciente: Paciente) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.post(this.url, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(paciente: Paciente) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.put(this.url, paciente, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idPaciente: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.delete(`${this.url}/${idPaciente}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
