import { Component, OnInit } from '@angular/core';
import {SlideshowModule} from 'ng-simple-slideshow';
import { ViewChild } from '@angular/core/src/metadata/di';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  images = ['A.jpg', 'B.jpg',
  'C.jpg', 'D.jpg',
  'E.jpg', 'F.jpg',
  'G.jpg'
];
  
    ngOnInit() {    }

      constructor(){

      }

      imageUrlArray = ['/assets/images/D.jpg','/assets/images/F.jpg','/assets/images/G.jpg'];
  }
  
  
