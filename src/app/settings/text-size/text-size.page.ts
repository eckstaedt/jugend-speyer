import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-text-size',
  templateUrl: './text-size.page.html',
  styleUrls: ['./text-size.page.scss'],
})
export class TextSizePage implements OnInit {

  public textSize = 15;

  constructor(private storage: Storage) { }

  ngOnInit() { 
    this.storage.get('text-size').then((res: number) => {
      this.textSize = res;
    })
    .catch(() => {
      this.textSize = 15;
    });
  }

  changeFontSize() {
    this.storage.set('text-size', this.textSize);
  }
}
