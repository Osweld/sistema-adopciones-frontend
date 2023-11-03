import { Component, OnInit } from '@angular/core';
import { Adopcion, Pagination } from '../../interfaces/auth.interface';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AdopcionService } from '../../services/adopcion.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-adopciones',
  templateUrl: './adopciones.component.html',
  styleUrls: ['./adopciones.component.css']
})
export class AdopcionesComponent implements OnInit {

  displayedColumns: string[] = ['usuario', 'dui', 'mascota', 'especie', 'actions'];
  adopciones:Adopcion[] = []

  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }


  constructor(
    private adopcionService:AdopcionService,
    private sharedService:SharedService,
    public dialog: MatDialog,
    private router:Router) { }

  ngOnInit(): void {

    this.adopcionService.getUAdopcionesrWithPagination(0).subscribe({
      next: page => {
        this.adopciones = page.content
        this.pagina = {
          totalElements :page.totalElements,
          totalPages :page.totalPages,
          page: page.number
        }
      }
    })
  }


  nextPage(page:number){
    this.adopcionService.getUAdopcionesrWithPagination(page).subscribe({
      next: page => {
        this.adopciones = page.content
        this.pagina = {
          totalElements :page.totalElements,
          totalPages :page.totalPages,
          page: page.number
        }
      }
    })
  }

  eliminarAdopcion(adopcionId: string){
    this.adopcionService.deleteAdopcionById(parseInt(adopcionId)).subscribe({
      next: user =>{
        this.sharedService.mostrarMensaje("green","Eliminada","La adopcion fue eliminada exitosamente!!");
        this.router.navigateByUrl('/adopciones', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Error","La adopcion no pudo ser eliminado!!");
      }
    })
  }

  openDialog(adopcionId: string): void {
    const dialogRef = this.dialog.open(DeleteAdopcionComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarAdopcion(adopcionId);
      }
    });
  }

}



@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title class="text-yellow-500 font-medium">Eliminar la adopcion</h1>
    <div mat-dialog-content>
      ¿Seguro que quiere eliminar el registro?
    </div>
    <div mat-dialog-actions class="flex justify-between items-center gap-4">
      <button mat-button [mat-dialog-close]="false" mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial class="font-medium text-yellow-500 bg-yellow-100 rounded-md p-2">Continuar</button>
    </div>
  `,
})
export class DeleteAdopcionComponent {
  constructor(public dialogRef: MatDialogRef<DeleteAdopcionComponent>) {}
}


