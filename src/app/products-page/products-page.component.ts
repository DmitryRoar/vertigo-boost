import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-page',
  templateUrl: './products-page.component.html',
  styleUrls: ['./products-page.component.scss']
})
export class ProductsPageComponent implements OnInit {

  imgSrc = '../../assets/img/triangle.svg'

  constructor() { }

  ngOnInit(): void {
  }

}
