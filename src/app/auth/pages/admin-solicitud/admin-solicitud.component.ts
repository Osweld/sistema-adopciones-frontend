import { Component, OnInit } from '@angular/core';
import { Pagination, Solicitud } from '../../interfaces/auth.interface';
import { SolicitudService } from '../../services/solicitud.service';
import { MatDialog } from '@angular/material/dialog';
import { VerificarSolicitudComponent } from '../../components/verificar-solicitud/verificar-solicitud.component';

@Component({
  selector: 'app-admin-solicitud',
  templateUrl: './admin-solicitud.component.html',
  styleUrls: ['./admin-solicitud.component.css']
})
export class AdminSolicitudComponent implements OnInit {

  displayedColumns: string[] = ['mascota','motivo', 'usuario', 'actions'];
  solicitudes:Solicitud[] = [];
  pagina:Pagination = {
    totalElements :0,
    totalPages :0,
    page: 0
  }

  constructor(
    private solicitudService:SolicitudService,
    public dialog: MatDialog) { }

  ngOnInit(): void {
    this.solicitudService.getSolicitudesWithPagination(0).subscribe({
      next: page =>{
        this.solicitudes = page.content
        this.pagina = {
          totalElements :page.totalElements,
          totalPages :page.totalPages,
          page: page.number
        }
        console.log(this.solicitudes)
      }
    })

  }

  openDialog(solicitud:Solicitud): void {
    const dialogRef = this.dialog.open(VerificarSolicitudComponent, {
      width: '600px',  // Aumenta o disminuye según necesidad
      data:{solicitud:solicitud},
      position: { top: '10px' }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
      console.log('Resultado:', result); // aquí se reciben los datos del formulario si se envían
    });
  }


  nextPage(page:Number){
    this.solicitudService.getSolicitudesWithPagination(page).subscribe(page =>{
      this.solicitudes = page.content
      this.pagina = {
        totalElements :page.totalElements,
        totalPages :page.totalPages,
        page: page.number
      }
    })
  }

}
