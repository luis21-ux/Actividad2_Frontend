import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Servidor } from '../../Servidor/servidor';
import { Vehiculos } from '../../Entidad/vehiculos';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-listar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar.html',
  styleUrl: './listar.css',
})
export class Listar implements OnInit {
  public vehiculos: Vehiculos[] = [];
  public vehiculosFiltrados: Vehiculos[] = [];
  public filtro = {
    placa: '',
    modelo: '',
    anio: '',
  };

  constructor(private servidor: Servidor, private router: Router) {}

  ngOnInit(): void {
    this.cargarVehiculos();
  }

  cargarVehiculos(): void {
    this.servidor.listarVehiculos().subscribe({
      next: (lista) => {
        this.vehiculos = lista;
        this.vehiculosFiltrados = [...lista];
      },
      error: () => {
        this.vehiculos = [];
        this.vehiculosFiltrados = [];
      },
    });
  }

  buscarPorPlaca(placa: string): void {
    this.filtro.placa = placa;
    this.aplicarFiltros();
  }

  buscarPorModelo(modelo: string): void {
    this.filtro.modelo = modelo;
    this.aplicarFiltros();
  }

  buscarPorAnio(anio: string): void {
    this.filtro.anio = anio;
    this.aplicarFiltros();
  }

  aplicarFiltros(): void {
    const placaFiltro = this.filtro.placa.trim().toLowerCase();
    const modeloFiltro = this.filtro.modelo.trim().toLowerCase();
    const anioFiltro = this.filtro.anio.trim().toLowerCase();

    this.vehiculosFiltrados = this.vehiculos.filter((vehiculo) => {
      const cumplePlaca = placaFiltro ? String(vehiculo.placa).toLowerCase().includes(placaFiltro) : true;
      const cumpleModelo = modeloFiltro ? vehiculo.modelo.toLowerCase().includes(modeloFiltro) : true;
      const cumpleAnio = anioFiltro ? String(vehiculo['año']).toLowerCase().includes(anioFiltro) : true;
      return cumplePlaca && cumpleModelo && cumpleAnio;
    });
  }

  editar(vehiculo: Vehiculos): void {
    this.router.navigate(['/editar', vehiculo.placa]);
  }

  eliminar(vehiculo: Vehiculos): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `Eliminar el vehículo con placa ${vehiculo.placa} no se puede deshacer.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.servidor.eliminarVehiculo(vehiculo.placa).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El vehículo ha sido eliminado.', 'success');
            this.cargarVehiculos();
          },
          error: () => {
            Swal.fire('Error', 'No se pudo eliminar el vehículo.', 'error');
          },
        });
      }
    });
  }

  trackByPlaca(index: number, vehiculo: Vehiculos): number {
    return vehiculo.placa;
  }
}
