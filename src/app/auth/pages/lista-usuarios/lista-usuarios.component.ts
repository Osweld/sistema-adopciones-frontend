import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { UserService } from '../../services/user.service';
import { Pagination, User } from '../../interfaces/auth.interface';


@Component({
  selector: 'app-lista-usuarios',
  templateUrl: './lista-usuarios.component.html',
  styleUrls: ['./lista-usuarios.component.css']
})
export class ListaUsuariosComponent implements OnInit {

  displayedColumns: string[] = ['nombres','apellidos', 'email', 'alias', 'genero', 'actions'];
  dataSource: User[] = [];
  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  constructor(
    private router: Router,
    private _sharedService: SharedService,
    public dialog: MatDialog,
    private userService:UserService
  ) {}

  ngOnInit(): void {
    this.userService.getUserWithPagination(0).subscribe(page =>{
      this.dataSource = page.content
      this.pagina = {
        totalElements :page.totalElements,
        totalPages :page.totalPages,
        page: page.number
      }
    })
  }

  eliminarUsuario(usuarioId: string): void {
    this.userService.deleteUserById(parseInt(usuarioId)).subscribe({
      next: user =>{
        this._sharedService.mostrarMensaje("green","Eliminado","El usuario fue eliminado exitosamente!!");
        this.router.navigateByUrl('/listaUsuario', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this._sharedService.mostrarMensaje("red","Error","El usuario no pudo ser eliminado!!");
      }
    })


  }

  nextPage(page:Number){
    this.userService.getUserWithPagination(page).subscribe(page =>{
      this.dataSource = page.content
      this.pagina = {
        totalElements :page.totalElements,
        totalPages :page.totalPages,
        page: page.number
      }
    })
  }


  openDialog(usuarioId: string): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarUsuario(usuarioId);
      }
    });
  }

}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `
    <h1 mat-dialog-title class="text-yellow-500 font-medium">Eliminar Usuario</h1>
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
