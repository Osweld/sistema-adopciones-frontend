import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Raza } from 'src/app/pets/interfaces/pets.interface';
import { RazaService } from 'src/app/pets/service/raza.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { DialogComponent } from '../../lista-mascotas/lista-mascotas.component';

@Component({
  selector: 'app-list-razas-page',
  templateUrl: './list-razas-page.component.html',
  styles: [
  ]
})
export class ListRazasPageComponent implements OnInit {

  displayedColumns: string[] = ['nombre','especie','actions'];
  dataSource: Raza[] = [];

  constructor(
    private razaService:RazaService,
    private router:Router,
    private dialog: MatDialog,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.razaService.getAllRazas().subscribe(
      razas => {
        this.dataSource=razas;
      }
    );
  }

  eliminarRaza(razaId: number): void {
    this.razaService.deleteRazaById(razaId).subscribe({
      next: () =>{
        this.sharedService.mostrarMensaje("green","Eliminado","La raza fue eliminada exitosamente!!");
        this.router.navigateByUrl('/pets/razas', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Error","La raza no pudo ser eliminada!!");
      }
    })


  }

  openDialog(razaId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarRaza(razaId);
      }
    });
  }

}
