import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('CRUDVehiculos');

  constructor(private router : Router){}

  listar(){
    this.router.navigate(['/listar']);
  }
  guardar(){
    this.router.navigate(['/guardar']);
  }
}
