import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {
  
  // decodedToken={user_name:""};
  usuario:any={};
  rol:any[]
  constructor() { }

  ngOnInit() {
    const helper = new JwtHelperService();
    let token = sessionStorage.getItem(environment.TOKEN_NAME);
    let decodedToken = helper.decodeToken(token);

// this.rol=this.decodeToken.authorities
    console.log('ng on init ',decodedToken)
    this.usuario=decodedToken.user_name
    this.rol=decodedToken.authorities
  }

}
