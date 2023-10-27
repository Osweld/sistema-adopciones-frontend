import { Component, OnInit } from '@angular/core';
import { SolicitudService } from '../../services/solicitud.service';
import { Solicitud } from '../../interfaces/auth.interface';

@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrls: ['./solicitud-adopcion.component.css']
})
export class SolicitudAdopcionComponent implements OnInit {

  SolicitudActual!:Solicitud;
  solicitudesRechazadas: Solicitud[] = [];

  constructor(private solicitudService:SolicitudService) {

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
        console.log(this.solicitudesRechazadas)
      },
      error: error =>{
        console.log(error)
      }
    })
  }

}
