export interface MascotasPage {
  content:          Mascota[];
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

export interface Mascota {
  id?:              number;
  nombre:          string;
  fechaNacimiento: Date;
  color:           string;
  descripcion:     string;
  fotoPrincipal?:   string;
  genero:          Genero;
  especie:         Especie;
  raza:            Raza;
  estadoSalud:     EstadoSalud;
}

export interface Genero {
  id:     number;
  nombre?: string;
}

export interface Especie {
  id:     number;
  nombre?: string;
}

export interface EstadoSalud {
  id:     number;
  estado?: string;
}

export interface Raza {
  id:      number;
  nombre?:  string;
  especie?: Especie;
}

export interface Pageable {
  sort:       Sort;
  offset:     number;
  pageSize:   number;
  pageNumber: number;
  paged:      boolean;
  unpaged:    boolean;
}

export interface Sort {
  empty:    boolean;
  sorted:   boolean;
  unsorted: boolean;
}

export interface Foto{
  id:     number;
  link: string;
  mascota:Mascota;
}

export interface Pagination {
  totalPages: number;
  page: number;
  totalElements: number;
}

export interface MascotaId {
  id: number;
}

export interface solicitudAdopcion {
  idMascota:number;
  titulo: string;
  descripcion: string;
}

