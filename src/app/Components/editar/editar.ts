import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Servidor } from '../../Servidor/servidor';
import { Vehiculos } from '../../Entidad/vehiculos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './editar.html',
  styleUrl: './editar.css',
})
export class Editar implements OnInit {
  public vehiculo: Vehiculos = {
    placa: 0,
    marca: '',
    modelo: '',
    año: 0,
    color: '',
  };

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: Servidor
  ) {}

  ngOnInit(): void {
    const placa = this.route.snapshot.paramMap.get('placa');
    if (placa) {
      this.service.buscarPorPlaca(placa).subscribe({
        next: (vehiculo) => {
          this.vehiculo = vehiculo;
        },
        error: () => {
          Swal.fire({
            title: 'Error',
            text: 'No se encontró el vehículo para editar.',
            icon: 'error',
          });
          this.router.navigate(['/listar']);
        },
      });
    } else {
      Swal.fire({
        title: 'Error',
        text: 'No se indicó ninguna placa.',
        icon: 'warning',
      });
      this.router.navigate(['/listar']);
    }
  }

  editar(): void {
    this.service.editarVehiculo(this.vehiculo).subscribe({
      next: () => {
        Swal.fire({
          title: 'Actualizado',
          text: 'El vehículo ha sido actualizado correctamente.',
          icon: 'success',
          showConfirmButton: false,
          timer: 3000,
        });
        this.router.navigate(['/listar']);
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo actualizar el vehículo.',
          icon: 'error',
        });
      },
    });
  }

  cancelar(): void {
    this.router.navigate(['/listar']);
  }
}
