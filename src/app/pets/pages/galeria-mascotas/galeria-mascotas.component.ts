import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PetsService } from '../../service/pets.service';
import { Foto, Mascota, MascotaId, Pagination } from '../../interfaces/pets.interface';
import { Router } from '@angular/router';
import { MeGustaService } from '../../service/me-gusta.service';
import { BehaviorSubject, Observable, forkJoin, map, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { SolicitudModalComponent } from '../../components/solicitud-modal/solicitud-modal.component';
import { JwtHelperService } from '@auth0/angular-jwt';



@Component({
  selector: 'app-galeria-mascotas',
  templateUrl: './galeria-mascotas.component.html',
  styleUrls: ['./galeria-mascotas.component.css']
})
export class GaleriaMascotasComponent implements OnInit {

  private likesSubject = new BehaviorSubject<MascotaId[]>([]);
  likes$ = this.likesSubject.asObservable();

  mascotas: Mascota[] = [];
  fotos: Foto[] = [];
  uploadedImages: any[] = [];
  i = 1;
  pagina: Pagination = {
    totalElements: 0,
    totalPages: 0,
    page: 0
  }
  // se podria hacer un metodo que devuelva un booleano que me permita saber si esta en likes la mascota
  // tambien si no esta en likes se agregue al momento de dar like y si esta que se borre
  // como me va a traer todos los likes no es necesario volver a llamar el metodo cada que cambie de pagina


  constructor(
    private PetsService: PetsService,
    private meGustaService: MeGustaService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private jwtHelper: JwtHelperService,
    public dialog: MatDialog) { }

  ngOnInit() {

    if(this.checkRol()){
      this.meGustaService.getAllLikesByUsuario().subscribe(ids => {
        this.likesSubject.next(ids); // Inicializa el BehaviorSubject con los IDs.
        this.getMascotasData()
      });
    }else{
      this.getMascotasData()
    }




  }

  selectedCard(id: number) {
    this.router.navigate(['pets/preview', id])
  }

  valorI(id: number) {
    this.i = id
  }

  filtrarFotosPorId(id: number): Foto[] {
    return this.uploadedImages.filter(foto => foto.mascota.id == id);
  }

  nextPage(page: Number) {
    this.PetsService.getAllMascotasPage(0)
      .subscribe(
        mascotasPage => {
          this.mascotas = mascotasPage.content;
          this.pagina = {
            totalElements: mascotasPage.totalElements,
            totalPages: mascotasPage.totalPages,
            page: mascotasPage.number
          }
          this.loadAllPetPhotos()
        },
        err => console.log(err)
      )
  }

  like(idMascota: number) {
    this.likes$.pipe(take(1)).subscribe(currentLikes => {
      const isLiked = currentLikes.some(like => like.id === idMascota);
      let updatedLikes;

      if (isLiked) {
        // Remueve el like.
        updatedLikes = currentLikes.filter(like => like.id !== idMascota);
      } else {
        // Agrega el like.
        updatedLikes = [...currentLikes, { id: idMascota }];
      }

      // Actualiza los likes antes de detectar los cambios.
      this.likesSubject.next(updatedLikes);
      this.cdr.detectChanges(); // Ahora detecta los cambios después de la actualización.

      // Llama a tu servicio aquí.
      this.meGustaService.saveOrDeleteLike(idMascota).subscribe({
        next: (response) => {
          // Manejar la respuesta o realizar acciones adicionales si es necesario.
        },
        error: (error) => {
          console.error("Ocurrió un error al actualizar el like:", error);
        }
      });
    });
  }


  getClassForLikeIcon(idMascota: number): Observable<string> {
    return this.likes$.pipe(
      map(likes => {
        const isLiked = likes.some(like => like.id === idMascota);
        const result = isLiked ? 'text-yellow-500' : '';
        return result;
      })
    );
  }

  loadAllPetPhotos(): void {
    // Creamos un array de observables.
    const photoRequests: Observable<Foto[]>[] = this.mascotas.map(mascota =>
      this.PetsService.getFotosByMascotaId(mascota.id!)
    );

    // Usamos forkJoin para esperar a que todas las solicitudes se completen.
    forkJoin(photoRequests).subscribe(
      responsesArray => {
        // 'responsesArray' es un array que contiene las respuestas de todas las solicitudes realizadas.
        // Suponiendo que cada respuesta es un array de 'Foto', lo procesamos aquí.
        responsesArray.forEach(fotos => {
          // Aquí, 'fotos' debe ser un array de objetos 'Foto'.
          // Puedes procesar o almacenar estos como necesites.
          if (fotos && fotos.length > 0) {
            // Por ejemplo, agregarlos a tu array de fotos.
            this.fotos.push(...fotos);
            // O si necesitas hacer algo específico con cada foto, usa un bucle.
            fotos.forEach(foto => {
              this.uploadedImages.push(foto);
            });
          }
        });
      },
      error => {
        // No olvides manejar errores aquí.
        console.error('Error al cargar las fotos', error);
      }
    );
  }

  openDialog(idMascota:number,nombreMascota:string): void {
    const dialogRef = this.dialog.open(SolicitudModalComponent, {
      width: '500px',  // Aumenta o disminuye según necesidad
      data:{id : idMascota,nombreMascota : nombreMascota},
      position: { top: '50px' }
    });


    dialogRef.afterClosed().subscribe(result => {
      console.log('Diálogo cerrado');
      console.log('Resultado:', result); // aquí se reciben los datos del formulario si se envían
    });
  }

  checkRol():boolean{
    const token = localStorage.getItem('token');

    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      // Parseamos el campo "authorities" para obtenerlo como un objeto/array JavaScript
      const authorities = JSON.parse(decodedToken.authorities);
      return authorities.some((auth: { authority: string; }) => auth.authority === "ROLE_USER")
    }
    return false;
  }


  getMascotasData(){
    this.PetsService.getAllMascotasPage(0)
        .subscribe(
          mascotasPage => {
            this.mascotas = mascotasPage.content;
            this.pagina = {
              totalElements: mascotasPage.totalElements,
              totalPages: mascotasPage.totalPages,
              page: mascotasPage.number
            }



            this.mascotas.forEach(element => {
              this.PetsService.getFotosByMascotaId(element.id!).subscribe({
                next: fotos => {
                  if (fotos && fotos.length > 0) {
                    this.fotos = fotos;
                    this.fotos.forEach(foto => this.uploadedImages.push(foto));
                  }
                }
              })
            });
          },
          err => console.log(err)
        )
  }


}

