export interface UserPage {
  content:          User[];
  pageable:         Pageable;
  last:             boolean;
  totalElements:    number;
  totalPages:       number;
  size:             number;
  number:           number;
  sort:             Sort;
  first:            boolean;
  numberOfElements: number;
  empty:            boolean;
}

export interface User {
  id?:              number;
  nombres:         string;
  apellidos:       string;
  fechaNacimiento: Date;
  numeroDui:       string;
  direccion:       string;
  email:           string;
  telefono:        string;
  username?:        string;
  password?:        string;
  genero:          Genero;
  rol:             Rol;
}

export interface Genero {
  id:     number;
  nombre?: string;
}

export interface Rol {
  id:     number;
  nombre?: string;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageNumber: number;
  pageSize:   number;
  unpaged:    boolean;
  paged:      boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

export interface Pagination {
  totalPages: number;
  page: number;
  totalElements: number;
}

export interface ChangePassword {
  oldPassword: string;
  newPassword: string;
}

export interface SolicitudPage {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Solicitud[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface Solicitud {
  id:                         number;
  motivo:                     string;
  descripcion:                string;
  comentarioGestionSolicitud: string;
  mascota:                    Mascota;
  usuario:                    User;
  estadoSolicitudAdopcion:    Estado;
}

export interface Estado {
  id:     number;
  estado: string;
}

export interface EstadoMascota {
  id:     number;
  estado: string;
}

export interface Mascota {
  id:              number;
  nombre:          string;
  fechaNacimiento: Date;
  color:           string;
  descripcion:     string;
  fotoPrincipal:   string;
  genero:          Especie;
  especie:         Especie;
  raza:            Raza;
  estadoSalud:     Estado;
  estadoMascota:   EstadoMascota;
}

export interface Especie {
  id:     number;
  nombre: string;
}

export interface Raza {
  id:      number;
  nombre:  string;
  especie: Especie;
}

export interface VerificarSolicitudDatos{
  idSolicitud:number;
  idEstadoSolicitud:number;
  comentarios:string
}

export interface Hora {
  id:       number;
  horaCita?: string;
}

export interface Cita {
  id?:                  number;
  fechaCita:           Date;
  motivoCita:          string;
  descripcion?:         string;
  solicitudAdopcion:   Solicitud;
  estadoCitaSolicitud?: EstadoCita;
  horaCitaSolicitud:   Hora;
}

export interface EstadoCita {
  id:     number;
  estado: string;
}

export interface CitaPage {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Cita[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}

export interface CrearAdopcion{
  idUsuario: number;
  idMascota: number;
}

export interface Adopcion{
  id:              number;
  mascota:         Mascota;
  usuario:         User;
}

export interface AdopcionPage {
  totalElements:    number;
  totalPages:       number;
  size:             number;
  content:          Adopcion[];
  number:           number;
  sort:             Sort;
  first:            boolean;
  last:             boolean;
  numberOfElements: number;
  pageable:         Pageable;
  empty:            boolean;
}


