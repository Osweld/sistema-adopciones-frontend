import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EstadoSalud } from 'src/app/pets/interfaces/pets.interface';
import { EstadoSaludService } from 'src/app/pets/service/estado-salud.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { DialogComponent } from '../../lista-mascotas/lista-mascotas.component';

@Component({
  selector: 'app-list-estados-salud-page',
  templateUrl: './list-estados-salud-page.component.html',
  styles: [
  ]
})
export class ListEstadosSaludPageComponent implements OnInit {

  displayedColumns: string[] = ['estado','actions'];
  dataSource: EstadoSalud[] = [];

  constructor(
    private estadoSaludService:EstadoSaludService,
    private router:Router,
    private dialog: MatDialog,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {

    }, 1500);
    this.estadoSaludService.getAllEstadoSalud().subscribe(
      estados => {
        this.dataSource=estados;
      }
    );
  }

  eliminarEstadoSalud(especieId: number): void {
    this.estadoSaludService.deleteEstadoSaludById(especieId).subscribe({
      next: () =>{
        this.sharedService.mostrarMensaje("green","Eliminado","El estado de salud fue eliminado exitosamente!!");
        this.router.navigateByUrl('/pets/especies', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Error","El estado de salud no pudo ser eliminado!!");
      }
    })


  }

  openDialog(especieId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarEstadoSalud(especieId);
      }
    });
  }

}
