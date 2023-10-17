import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { Mascota, Pagination } from '../../interfaces/pets.interface';
import { PetsService } from '../../service/pets.service';
import { EspecieService } from '../../service/especie.service';





@Component({
  selector: 'app-lista-mascotas',
  templateUrl: './lista-mascotas.component.html',
  styleUrls: ['./lista-mascotas.component.css']
})
export class ListaMascotasComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'especie', 'raza', 'estadoSalud', 'actions'];
  dataSource: Mascota[] = [];
  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  constructor(
    private router: Router,
    private _sharedService: SharedService,
    public dialog: MatDialog,
    private petService:PetsService,
    private especieService:EspecieService
  ) {

    }

  ngOnInit(): void {
   this.petService.getAllMascotasPage(0).subscribe({
    next: mascotaPage =>{
      this.dataSource = mascotaPage.content;
      this.pagina = {
        totalElements :mascotaPage.totalElements,
        totalPages :mascotaPage.totalPages,
        page: mascotaPage.number
      }
    },
   })
  }

  eliminarMascota(mascotaId: string): void {
    this.petService.deleteMascotaById(parseInt(mascotaId)).subscribe({
      next: mascota =>{
        this._sharedService.mostrarMensaje("green","Eliminado","La mascota fue eliminado exitosamente!!");
        this.router.navigateByUrl('/pets', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this._sharedService.mostrarMensaje("red","Error","La mascota no pudo ser eliminado!!");
      }
    })


  }





  openDialog(mascotaId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarMascota(mascotaId);
      }
    });
  }

  nextPage(page:Number){
    this.petService.getAllMascotasPage(page).subscribe({
      next: mascotaPage =>{
        this.dataSource = mascotaPage.content;
        this.pagina = {
          totalElements :mascotaPage.totalElements,
          totalPages :mascotaPage.totalPages,
          page: mascotaPage.number
        }
      },
     })
  }

}


@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title class="text-yellow-500 font-medium">Eliminar Mascota</h1>
    <div mat-dialog-content>
      ¿Seguro que quiere eliminar el registro?
    </div>
    <div mat-dialog-actions class="flex justify-end gap-4">
      <button mat-button [mat-dialog-close]="false" mat-dialog-close>Cancelar</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial class="font-medium text-yellow-500 bg-yellow-100 rounded-md p-2">Continuar</button>
    </div>
  `,
})
export class DialogComponent {
  constructor(public dialogRef: MatDialogRef<DialogComponent>) {}
}
