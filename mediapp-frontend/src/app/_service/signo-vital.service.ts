import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SignoVital } from '../_model/signovital';
import { environment } from 'src/environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SignoVitalService {

  signoVitalCambio = new Subject<SignoVital[]>();
  mensajeCambio = new Subject<string>();

  url: string = `${environment.HOST}/signovitales`;

  constructor(private http: HttpClient) { }

  listar() {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<SignoVital[]>(this.url, {
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
  listarPorId(idSignoVital: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);   
    return this.http.get<SignoVital>(`${this.url}/${idSignoVital}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  registrar(sv: SignoVital) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.post(this.url, sv, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  modificar(sv: SignoVital) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.put(this.url, sv, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }

  eliminar(idSignoVital: number) {
    let token = sessionStorage.getItem(environment.TOKEN_NAME);  
    return this.http.delete(`${this.url}/${idSignoVital}`, {
      headers: new HttpHeaders().set('Authorization', `bearer ${token}`).set('Content-Type', 'application/json')
    });
  }
}
