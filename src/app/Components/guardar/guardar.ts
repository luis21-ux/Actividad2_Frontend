import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Servidor } from '../../Servidor/servidor';
import { Vehiculos } from '../../Entidad/vehiculos';
import Swal from 'sweetalert2';
import { HttpResponse } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-guardar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './guardar.html',
  styleUrl: './guardar.css',
})
export class Guardar {
  public vehiculo: Vehiculos = {
    placa: 0,
    marca: '',
    modelo: '',
    año: 0,
    color: '',
  };

  constructor(
    private router: Router,
    private service: Servidor
  ) {}

  guardar(): void {
    this.service.guardarVehiculo(this.vehiculo).subscribe({
      next: () => {
        Swal.fire({
          title: 'Guardado',
          text: 'El vehículo ha sido guardado exitosamente',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        });
        this.router.navigate(['listar']);
      },
      error: (error) => {
        if (error?.status === 409) {
          Swal.fire({
            title: 'Error',
            text: 'El vehículo con la placa ' + this.vehiculo.placa + ' ya existe.',
            icon: 'error',
          });
        } else {
          Swal.fire({
            title: 'Error',
            text: 'No se pudo guardar el vehículo.',
            icon: 'error',
          });
        }
      },
    });
  }

  cancelar(): void {
    Swal.fire({
      title: '¿Cancelar?',
      text: 'Se ha cancelado el registro',
      icon: 'warning',
      confirmButtonText: 'Aceptar',
    });
    this.router.navigate(['listar']);
  }
}
