import { Component, Input, OnInit } from '@angular/core';
import { PetsService } from '../../service/pets.service';
import { Mascota } from '../../interfaces/pets.interface';
import { BooleanInput } from '@angular/cdk/coercion';

@Component({
  selector: 'app-upload-photos',
  templateUrl: './upload-photos.component.html',
  styleUrls: ['./upload-photos.component.css']
})
export class UploadPhotosComponent implements OnInit {

  @Input() mascota!: Mascota

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;



  constructor(private petService: PetsService) { }


  ngOnInit(): void {
    if(this.mascota.fotoPrincipal){
      this.imagePreview = this.mascota.fotoPrincipal
    }

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
      console.log(this.mascota+"mascota")
      const formData = new FormData();
      formData.append('imagen', this.selectedFile, this.selectedFile.name);
      this.petService.uploadFotoPrincipal(this.mascota.id!,formData).subscribe({
        next : mascota => {
          console.log(mascota)
        },
        error : error => {
          console.log(error)
        }
      })
    } else {

    }
  }

}
