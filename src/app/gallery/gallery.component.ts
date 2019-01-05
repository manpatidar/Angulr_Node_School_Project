import { Component, OnInit } from '@angular/core';
import { NgModule, VERSION } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser';

import {
  AccessibilityConfig, Action, AdvancedLayout, ButtonEvent, ButtonsConfig, ButtonsStrategy, ButtonType, Description, DescriptionStrategy, GalleryService,
  DotsConfig, GridLayout, Image, ImageModalEvent, LineLayout, PlainGalleryConfig, PlainGalleryStrategy, PreviewConfig
} from 'angular-modal-gallery';


@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {

  name: string;
  
    constructor(private galleryService: GalleryService) {
      this.name = `${VERSION.full}`
    }
  
    imageIndex = 1;
    galleryId = 1;
  
  ngOnInit(){

  }
    plainGalleryRowATags: PlainGalleryConfig = {
      strategy: PlainGalleryStrategy.ROW,
      layout: new LineLayout({ width: '115px', height: '86px' }, { length: 1, wrap: true }, 'flex-start'),
      advanced: { aTags: true, additionalBackground: '50% 50%/cover' }
    };
    imagesRect: Image[] = [
      new Image(0,{ img: '/assets/images/A.jpg' }),
      new Image(1,{ img: '/assets/images/B.jpg' }),
      new Image(2,{ img: '/assets/images/C.jpg' }),
      new Image(3,{ img: '/assets/images/D.jpg' }),
      new Image(4,{ img: '/assets/images/E.jpg' }),
      new Image(5,{ img: '/assets/images/F.jpg' }),
      new Image(6,{ img: '/assets/images/G.jpg' }),
      new Image(7,{ img: '/assets/images/H.jpg' }),
      new Image(8,{ img: '/assets/images/I.jpg' }),
      new Image(9,{ img: '/assets/images/J.jpg' })
    ];
    imagesRect1: Image[] = [
      new Image(0,{ img: '/assets/images/K.jpg' }),
      new Image(1,{ img: '/assets/images/L.jpg' }),
      new Image(2,{ img: '/assets/images/M.jpg' }),
      new Image(3,{ img: '/assets/images/N.jpg' }),
      new Image(4,{ img: '/assets/images/O.jpg' }),
      new Image(5,{ img: '/assets/images/P.jpg' }),
      new Image(6,{ img: '/assets/images/Q.jpg' }),
      new Image(7,{ img: '/assets/images/R.jpg' }),
      new Image(8,{ img: '/assets/images/S.jpg' }),
      new Image(9,{ img: '/assets/images/T.jpg' })
    ];
    imagesRect2: Image[] = [
      new Image(0,{ img: '/assets/images/U.jpg' }),
      new Image(1,{ img: '/assets/images/V.jpg' }),
      new Image(2,{ img: '/assets/images/W.jpg' }),
      new Image(3,{ img: '/assets/images/X.jpg' }),
      new Image(4,{ img: '/assets/images/Y.jpg' }),
      new Image(5,{ img: '/assets/images/Z.jpg' }),
      new Image(6,{ img: '/assets/images/AA.jpg' }),
      new Image(7,{ img: '/assets/images/AB.jpg' }),
      new Image(8,{ img: '/assets/images/AC.jpg' })
    ];
    imagesRect3: Image[] = [
      new Image(0,{ img: '/assets/images/1.jpg' }),
      new Image(1,{ img: '/assets/images/2.jpg' }),
      new Image(2,{ img: '/assets/images/3.jpg' }),
      new Image(3,{ img: '/assets/images/4.jpg' }),
      new Image(4,{ img: '/assets/images/5.jpg' }),
      new Image(5,{ img: '/assets/images/6.jpg' }),
      new Image(6,{ img: '/assets/images/7.jpg' }),
      new Image(7,{ img: '/assets/images/8.jpg' }),
      new Image(8,{ img: '/assets/images/9.jpg' }),
      new Image(9,{ img: '/assets/images/10.jpg' })
    ];
    imagesRect4: Image[] = [
      new Image(0,{ img: '/assets/images/11.jpg' }),
      new Image(1,{ img: '/assets/images/12.jpg' }),
      new Image(2,{ img: '/assets/images/13.jpg' }),
      new Image(3,{ img: '/assets/images/14.jpg' }),
      new Image(4,{ img: '/assets/images/15.jpg' }),
      new Image(5,{ img: '/assets/images/16.jpg' }),
      new Image(6,{ img: '/assets/images/17.jpg' }),
      new Image(7,{ img: '/assets/images/18.jpg' }),
      new Image(8,{ img: '/assets/images/19.jpg' }),
      new Image(9,{ img: '/assets/images/20.jpg' })
    ];
    imagesRect5: Image[] = [
      new Image(0,{ img: '/assets/images/21.jpg' }),
      new Image(1,{ img: '/assets/images/22.jpg' }),
      new Image(2,{ img: '/assets/images/23.jpg' }),
      new Image(3,{ img: '/assets/images/24.jpg' }),
      new Image(4,{ img: '/assets/images/25.jpg' }),
      new Image(5,{ img: '/assets/images/26.jpg' }),
      new Image(6,{ img: '/assets/images/27.jpg' }),
      new Image(7,{ img: '/assets/images/28.jpg' }),
      new Image(8,{ img: '/assets/images/29.jpg' }),
      new Image(9,{ img: '/assets/images/30.jpg' })
    ];
    imagesRect6: Image[] = [
      new Image(0,{ img: '/assets/images/31.jpg' }),
      new Image(1,{ img: '/assets/images/32.jpg' }),
      new Image(2,{ img: '/assets/images/33.jpg' }),
      new Image(3,{ img: '/assets/images/34.jpg' }),
      new Image(4,{ img: '/assets/images/35.jpg' }),
      new Image(5,{ img: '/assets/images/36.jpg' }),
      new Image(6,{ img: '/assets/images/37.jpg' }),
      new Image(7,{ img: '/assets/images/38.jpg' }),
      new Image(8,{ img: '/assets/images/38.jpg' }),
      new Image(9,{ img: '/assets/images/39.jpg' })
    ];

  
  /* images = ['A.jpg', 'B.jpg',
  'C.jpg', 'D.jpg','E.jpg', 'F.jpg','G.jpg','H.jpg',
  'I.jpg','J.jpg','K.jpg','L.jpg','M.jpg', 'N.jpg',
  'O.jpg', 'P.jpg','Q.jpg','R.jpg','U.jpg','V.jpg',
  'W.jpg','X.jpg', 'Y.jpg', 'Z.jpg', 'AA.jpg', 'AB.jpg',
  'AC.jpg','1.jpg', '2.jpg','3.jpg', '4.jpg','5.jpg',
  '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg','11.jpg',
  '12.jpg','13.jpg', '14.jpg','15.jpg', '16.jpg', '17.jpg',
  '18.jpg', '19.jpg', '20.jpg','21.jpg', '22.jpg','23.jpg',
  '24.jpg','25.jpg','26.jpg', '27.jpg', '28.jpg','29.jpg', 
  '30.jpg','31.jpg',  '32.jpg', '33.jpg', '34.jpg','35.jpg', 
  '36.jpg'
]; */
}
