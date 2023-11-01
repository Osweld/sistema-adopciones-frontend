import { Component, OnInit ,Inject} from '@angular/core';
import { Solicitud } from '../../interfaces/auth.interface';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-ver-detalles-solicitud',
  templateUrl: './ver-detalles-solicitud.component.html',
  styleUrls: ['./ver-detalles-solicitud.component.css']
})
export class VerDetallesSolicitudComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<VerDetallesSolicitudComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {solicitud:Solicitud},
  ) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    // Cerrar el diálogo sin enviar datos
    this.dialogRef.close();
  }

}
