import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pagination } from '../../interfaces/shared.interface';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit {

  constructor() { }
//<app-paginacion [pagina]="pagina" (selectPage)="nextPage($event)"></app-paginacion>
  @Input() pagina?:Pagination
  @Output() selectPage = new EventEmitter<number>();

  ngOnInit(): void {
  }

  changePage(page:number){
    this.selectPage.emit(page)
  }
}
