import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Especie } from 'src/app/pets/interfaces/pets.interface';
import { EspecieService } from 'src/app/pets/service/especie.service';
import { SharedService } from 'src/app/shared/Servicios/shared.service';
import { DialogComponent } from '../../lista-mascotas/lista-mascotas.component';

@Component({
  selector: 'app-list-especies-page',
  templateUrl: './list-especies-page.component.html'
})
export class ListEspeciesPageComponent implements OnInit {

  displayedColumns: string[] = ['nombre','actions'];
  dataSource: Especie[] = [];

  constructor(
    private especieService:EspecieService,
    private router:Router,
    private dialog: MatDialog,
    private sharedService:SharedService
  ) { }

  ngOnInit(): void {
    this.especieService.getAllEspecies().subscribe(
      especies => {
        this.dataSource=especies;
        console.log(especies);

      }
    );
  }

  eliminarEspecie(especieId: number): void {
    this.especieService.deleteEspecieById(especieId).subscribe({
      next: () =>{
        this.sharedService.mostrarMensaje("green","Eliminado","La especie fue eliminada exitosamente!!");
        this.router.navigateByUrl('/pets/especies', { skipLocationChange: true }).then(() => {
          setTimeout(()=> {
            window.location.reload();
          }, 2000);
        });
      },
      error: error =>{
        this.sharedService.mostrarMensaje("red","Error","La especie no pudo ser eliminada!!");
      }
    })


  }

  openDialog(especieId: number): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '400px',
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.eliminarEspecie(especieId);
      }
    });
  }

}
