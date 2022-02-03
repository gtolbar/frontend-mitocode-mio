import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Paciente } from '../_model/paciente/paciente';


@Injectable({
  providedIn: 'root'
})
export class PacienteService {


  private pacienteCambio: Subject<Paciente[]> = new Subject<Paciente[]>();
  private mensajeCambio: Subject<String>= new Subject<String>();
  private url:string=`${environment.HOST}/pacientes`;

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<Paciente[]>(this.url);
  }

  listarPorId(id: number){
    return this.http.get<Paciente>(`${(this.url)}/${id}`);
  }

  registrar(paciente: Paciente){
    return this.http.post(this.url, paciente);
  }

  actualizar(paciente: Paciente){
    return this.http.put(this.url, paciente);
  }

  eliminar(id: number){
    return this.http.delete(`${(this.url)}/${id}`);
  }
//-------------------------------------------------------

setPacienteCambio(lista: Paciente[]){
  this.pacienteCambio.next(lista);
}

getPacienteCambio(){
  return this.pacienteCambio.asObservable();
}

setMensajeCambio(mensaje: String){
  this.mensajeCambio.next(mensaje);
}

getMensajeCambio(){
  return this.mensajeCambio.asObservable();
}













}
