import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { Pagination, Solicitud } from '../../interfaces/auth.interface';
import { MatDialog } from '@angular/material/dialog';
import { VerDetallesSolicitudComponent } from '../../components/ver-detalles-solicitud/ver-detalles-solicitud.component';

@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrls: ['./solicitud-adopcion.component.css']
})
export class SolicitudAdopcionComponent implements OnInit {

  displayedColumns: string[] = ['mascota','motivo',  'actions'];
  SolicitudActual!:Solicitud;
  solicitudesRechazadas: Solicitud[] = [];
  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  constructor(
    private solicitudService:SolicitudService,
     public dialog: MatDialog) {

   }

   openDialog(solicitud:Solicitud): void {
    const dialogRef = this.dialog.open(VerDetallesSolicitudComponent, {
      width: '600px',  // Aumenta o disminuye según necesidad
      data:{solicitud:solicitud},
      position: { top: '10px' }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
      console.log('Resultado:', result); // aquí se reciben los datos del formulario si se envían
    });
  }

  ngOnInit(): void {
    this.solicitudService.getSolicitudByUsuarioAndEstadoEnProceso().subscribe({
      next: solicitud =>{
        this.SolicitudActual = solicitud;
        console.log(solicitud);
      },
      error: error =>{
        console.log(error)
      }
    })
    this.solicitudService.getLastFiveSolicitudesRechazadas(0).subscribe({
      next: page => {
        this.solicitudesRechazadas = page.content;
        this.pagina = {
          totalElements :page.totalElements,
          totalPages :page.totalPages,
          page: page.number
        }
      },
      error: error =>{
        console.log(error)
      }
    })
  }





  nextPage(page:number){
    this.solicitudService.getLastFiveSolicitudesRechazadas(page).subscribe({
      next: page => {
        this.solicitudesRechazadas = page.content;
        this.pagina = {
          totalElements :page.totalElements,
          totalPages :page.totalPages,
          page: page.number
        }
      },
      error: error =>{
        console.log(error)
      }
    })
  }

}
