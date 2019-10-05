import { SignoVitalService } from   './../../_service/signo-vital.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SignoVital } from 'src/app/_model/signoVital';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, MatPaginator, MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-signo-vital',
  templateUrl: './signo-vital.component.html',
  styleUrls: ['./signo-vital.component.css']
})
export class SignoVitalComponent implements OnInit {

  dataSource: MatTableDataSource<SignoVital>;
  displayedColumns = ['idSignoVital', 'nombres', 'apellidos', 'acciones'];
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  cantidad: number = 0;

  constructor(private svService: SignoVitalService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.svService.signoVitalCambio.subscribe(data => {
      console.log(' data sv',data)
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });

    this.svService.mensajeCambio.subscribe(data => {
      this.snackBar.open(data, 'AVISO', {
        duration: 2000
      });
    });

    /*this.svService.listar().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });*/

    this.svService.listarPageable(0, 10).subscribe(data => {
      this.cantidad = data.totalElements;

      this.dataSource = new MatTableDataSource(data.content);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  mostrarMas(e : any){
    //console.log(e);
    this.svService.listarPageable(e.pageIndex, e.pageSize).subscribe(data => {
      this.cantidad = data.totalElements;
      this.dataSource = new MatTableDataSource(data.content);
      //this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  filtrar(valor: string) {
    this.dataSource.filter = valor.trim().toLowerCase();
  }

  eliminar(idSignoVital: number) {
    this.svService.eliminar(idSignoVital).subscribe(() => {
      this.svService.listar().subscribe(data => {
        this.svService.signoVitalCambio.next(data);
        this.svService.mensajeCambio.next('SE ELIMINO');
      });
    });
  }


}
