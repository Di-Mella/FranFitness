import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.page.html',
  styleUrls: ['./videos.page.scss'],
})
export class VideosPage {

  constructor() { }

  swiperSliperChanged(e: any){
    console.log('changed: ', e)
  }

}
