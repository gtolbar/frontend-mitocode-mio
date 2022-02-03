import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Paciente } from 'src/app/_model/paciente/paciente';
import { PacienteService } from 'src/app/_service/paciente.service';

@Component({
  selector: 'app-paciente',
  templateUrl: './paciente.component.html',
  styleUrls: ['./paciente.component.css']
})
export class PacienteComponent implements OnInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<Paciente>;
  displayedColumns: string[] = ['idPaciente', 'nombres', 'apellidos', 'acciones'];


  constructor(
    private pacienteService:PacienteService,
    private _snackBar:MatSnackBar
    ) { }

  ngOnInit(): void {
    this.pacienteService.listar().subscribe(data => {
      this.crearTabla(data);
    });

    this.pacienteService.getPacienteCambio().subscribe(data => {
      this.crearTabla(data);
    });

    this.pacienteService.getMensajeCambio().subscribe((data: string)=>{
      this._snackBar.open(data,'AVISO',{
        duration:2000,
        verticalPosition: "bottom",
        horizontalPosition:"left"
      });
    });

  }

  eliminar(id: number){
    this.pacienteService.eliminar(id).subscribe(()=>{
      this.pacienteService.listar().subscribe(data=>{
        this.pacienteService.setPacienteCambio(data);
        this.pacienteService.setMensajeCambio(`SE ELIMINO PACIENTE`);
      })
    })
  }

  crearTabla(data: Paciente[]){
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator=this.paginator;
    this.dataSource.sort=this.sort;
  }

  Filtrar(valor: string){
    this.dataSource.filter=valor.trim().toLowerCase();
  }

}
