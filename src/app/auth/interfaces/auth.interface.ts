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
  username:        string;
  password:        string;
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


