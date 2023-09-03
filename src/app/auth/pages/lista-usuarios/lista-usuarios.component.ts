import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import {MatDialog, MatDialogRef, MatDialogModule} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';


export interface Catalog {
  id: number;
  label: string;
}

export interface Mascota {
  id?: string;
  fechaNacimiento?: Date;
  color?: string;
  descripcion?: string;
  nombre: string;
  especie: Catalog;
  raza: Catalog;
  estadoSalud: string;
}

@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['nombre', 'especie', 'raza', 'estadoSalud', 'actions'];
  dataSource: any;

  constructor(
    private router: Router,
    private _sharedService: SharedService,
    public dialog: MatDialog
  ) {
    let DATA: Mascota[] = [];
    const mascotasString = localStorage.getItem('mascotas');
    if (mascotasString !== null) {
      DATA = JSON.parse(mascotasString);
      this.dataSource = DATA;
    }
   }

  ngOnInit(): void {
  }

  eliminarMascota(mascotaId: string): void {
    // Obtener la lista de mascotas del localStorage
    const mascotasData = localStorage.getItem('mascotas');
    const mascotas = mascotasData ? JSON.parse(mascotasData) : [];

    // Buscar la mascota a eliminar por su ID
    const mascotaToDeleteIndex = mascotas.findIndex((e: any) => e.id === mascotaId);

    if (mascotaToDeleteIndex !== -1) {
      // Eliminar la mascota que se encontró
      mascotas.splice(mascotaToDeleteIndex, 1);

      // Guardar la lista actualizada en localStorage
      localStorage.setItem('mascotas', JSON.stringify(mascotas));
      // Mostrar mensaje de éxito
      this.mostrarMensajeDeExito('Mascota eliminada correctamente.');
      //Recargar pagina
      this.router.navigateByUrl('/Mascotas', { skipLocationChange: true }).then(() => {
        setTimeout(()=> {
          window.location.reload();
        }, 2000);
      });
    }
  }

  mostrarMensajeDeExito(descripcion: string): void {
    this._sharedService.showSnackbar(
      {
        color: 'green',
        title: 'Completado',
        description: descripcion,
        isVisible: true
      }
    );
    setTimeout(() => {
      this._sharedService.showSnackbar(
        {
          isVisible: false
        }
      );
    }, 8000);
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