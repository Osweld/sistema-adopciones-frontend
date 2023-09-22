import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from '../../service/pets.service';
import { Foto, Mascota } from '../../interfaces/pets.interface';
import { SharedService } from 'src/app/shared/Servicios/shared.service';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent implements OnInit {

  @Input() mascota!: Mascota

  fotos:Foto[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  uploadedImages: string[] = [];
  abiliteUploadMultipleFotos:boolean = false;
  selectedFiles: File[] = [];






  constructor(
    private petService: PetsService,
    private sharedService:SharedService) { }


  ngOnInit(): void {
    if(this.mascota.fotoPrincipal){
      this.imagePreview = this.mascota.fotoPrincipal
    }

    this.petService.getFotosByMascotaId(this.mascota.id!).subscribe({
      next : fotos => {
        if (fotos && fotos.length > 0) {
          this.fotos = fotos;
          this.fotos.forEach(foto => this.uploadedImages.push(foto.link));
        }
      }
    })

  }

  CompareOldNewImages():boolean{
    return (this.mascota.fotoPrincipal === this.imagePreview)
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
      this.selectedFile = file;
    }
  }



  upload() {
    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
      this.petService.uploadFotoPrincipal(this.mascota.id!,formData).subscribe({
        next : mascota => {
          this.sharedService.mostrarMensaje("green","subida de foto principal","La foto se a subido exitosamente")
        },
        error : error => {
          this.sharedService.mostrarMensaje("red","subida de foto principal","No se pudo subir la foto")
        }
      })
    } else {

    }
  }


  onFilesSelected(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.abiliteUploadMultipleFotos = true
      const files = event.target.files;
      if (files.length > 4) {
        this.sharedService.mostrarMensaje("red","subida de imagenes","No se puede subir mas de 4 imagenes")
        return;
      }

      this.uploadedImages = [];

      for (let file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.uploadedImages.push(e.target.result);
        }
        reader.readAsDataURL(file);
        this.selectedFiles.push(file);
      }

    }
  }


  uploadMultiplePhotos() {
    if (this.uploadedImages) {
      const formData = new FormData();
      for (let file of this.selectedFiles) {
        formData.append('imagenes', file, file.name);
      }
      this.petService.uploadFotos(this.mascota.id!,formData).subscribe({
        next : mascota => {
          this.sharedService.mostrarMensaje("green","subida de fotos","Las fotos se a subido exitosamente")
          this.abiliteUploadMultipleFotos = false
        },
        error : error => {
          this.sharedService.mostrarMensaje("red","subida de fotos","No se pudo subir las fotos")
        }
      })
    } else {

    }
  }

}
