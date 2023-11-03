import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { Cita, Pagination, Solicitud } from '../../interfaces/auth.interface';
import { MatDialog } from '@angular/material/dialog';
import { VerDetallesSolicitudComponent } from '../../components/ver-detalles-solicitud/ver-detalles-solicitud.component';
import { AgendarCitaComponent } from '../../components/agendar-cita/agendar-cita.component';
import { CitaService } from '../../services/cita.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrls: ['./solicitud-adopcion.component.css'],
  providers: [DatePipe] // Añade DatePipe a los providers del componente
})
export class SolicitudAdopcionComponent implements OnInit {

  displayedColumns: string[] = ['mascota','motivo',  'actions'];
  displayedColumnsCita: string[] = ['mascota','motivo', 'fecha y hora'];
  SolicitudActual!:Solicitud;
  citas:Cita[] = [];
  solicitudesRechazadas: Solicitud[] = [];
  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  paginaCita:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  constructor(
    private solicitudService:SolicitudService,
    private citaService:CitaService,
     public dialog: MatDialog,
     private datePipe: DatePipe) {

   }

   openDialogVerDetalles(solicitud:Solicitud): void {
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

  openDialogAgendarCita(solicitud:Solicitud): void {
    const dialogRef = this.dialog.open(AgendarCitaComponent, {
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

    this.citaService.getCitaByUsuario(0).subscribe({
      next: page => {
       this.citas = page.content
       this.paginaCita = {
        totalElements :page.totalElements,
        totalPages :page.totalPages,
        page: page.number
      }
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

  nextPageCita(page:number){
    this.citaService.getCitaByUsuario(0).subscribe({
      next: page => {
        this.citas = page.content
        this.paginaCita = {
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

  getFechaHoraCompleta(fecha: string, hora: string): string {
    const fechaCompleta = new Date(fecha + 'T' + hora);
    return this.datePipe.transform(fechaCompleta, 'fullDate') + ' ' + this.datePipe.transform(fechaCompleta, 'shortTime');
  }
}
