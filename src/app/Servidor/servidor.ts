import { Injectable } from '@angular/core';
import { Vehiculos } from '../Entidad/vehiculos';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class Servidor {
  
  constructor(private http: HttpClient) {}

  url = 'http://13.58.8.82:8004/vehiculo/';

  listarVehiculos() {
    return this.http.get<Vehiculos[]>(this.url + 'listar');
  }

  guardarVehiculo(vehiculo: Vehiculos): Observable<HttpResponse<any>> {

    return this.http.post<any>(this.url + 'guardar', vehiculo,{
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  buscarPorPlaca(placa: string) {
    return this.http.get<Vehiculos>(this.url + 'buscar/' + placa);
  }

  editarVehiculo(vehiculo: Vehiculos): Observable<HttpResponse<any>> {

    return this.http.put<any>(this.url + 'editar', vehiculo,{
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  eliminarVehiculo(placa: number): Observable<HttpResponse<any>> {

    return this.http.delete<any>(this.url + 'eliminar/' + placa, {
      observe: 'response',
      responseType: 'text' as 'json'
    });
  }

  buscarPorAño(año: number) {
    return this.http.get<Vehiculos[]>(this.url + 'buscarAño/' + año);
  }

  buscarPorModelo(modelo: string) {
    return this.http.get<Vehiculos[]>(this.url + 'buscarModelo/' + modelo);
  }

}
