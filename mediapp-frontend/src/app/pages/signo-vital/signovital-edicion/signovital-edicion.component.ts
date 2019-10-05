import { PacienteService } from 'src/app/_service/paciente.service';
import { SignoVital } from './../../../_model/signoVital';
import { SignoVitalService } from './../../../_service/signo-vital.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';


@Component({
  selector: 'app-signovital-edicion',
  templateUrl: './signovital-edicion.component.html',
  styleUrls: ['./signovital-edicion.component.css']
})
export class SignovitalEdicionComponent implements OnInit {

  form: FormGroup;
  id: number;
  edicion: boolean;
  pacientes:any[];

  // tslint:disable-next-line: max-line-length
  constructor(private pacienteService: PacienteService, private route: ActivatedRoute, private router: Router, private sv: SignoVitalService) {
    this.listarPaciente()
   }

  ngOnInit() {
    this.form = new FormGroup({
      'idSignoVital': new FormControl(0),
      'fecha': new FormControl(''),
      'temperatura': new FormControl(''),
      'pulso': new FormControl(''),
      'ritmo': new FormControl(''),
      'idPaciente': new FormControl(0)
    });

    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.edicion = params['id'] != null;
      this.initForm();
    });


  }

  initForm() {
    if (this.edicion) {
      //cargar la data del servicio en el form
      this.sv.listarPorId(this.id).subscribe(data => {
        this.form = new FormGroup({
          'idSignoVital': new FormControl(data.idSignoVital),
          'fecha': new FormControl(data.fecha),
          'temperatura': new FormControl(data.temperatura),
          'pulso': new FormControl(data.pulso),
          'ritmo': new FormControl(data.ritmo),
          'idPaciente': new FormControl(data.idPaciente)
        });
      });
    }
  }

  operar() {
    let sv = new SignoVital();
    sv.idSignoVital = this.form.value['idSignoVital'];
    sv.fecha = this.form.value['fecha'];
    sv.temperatura = this.form.value['temperatura'];
    sv.pulso = this.form.value['pulso'];
    sv.ritmo = this.form.value['ritmo'];
    sv.idPaciente = this.form.value['idPaciente'];

    if (this.edicion) {
      //servicio de edicion
      this.sv.modificar(sv).subscribe(() => {
        this.sv.listar().subscribe(data => {
          this.sv.signoVitalCambio.next(data);
          this.sv.mensajeCambio.next('SE MODIFICO');
        });
      });
    } else {
      //servicio de registro
      this.sv.registrar(sv).subscribe(() => {
        this.sv.listar().subscribe(data => {
          this.sv.signoVitalCambio.next(data);
          this.sv.mensajeCambio.next('SE REGISTRO');
        });
      });
    }

    this.router.navigate(['signo-vital']);

  }


listarPaciente(){
  console.log(' listarPaciente')

  this.pacienteService.listarPageable(0, 10).subscribe(data => {

 this.pacientes= data.content.map( item=>{ return {
    idPaciente: item.idPaciente,
    nombre: item.apellidos +" "+item.nombres
  }})
    console.log(' listando data',this.pacientes)
  });

}

}
