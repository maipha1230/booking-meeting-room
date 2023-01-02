import { LoaderService } from './../../services/loader.service';
import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  public options: AnimationOptions = {
    path: 'assets/animation.json'
  };

  constructor(public loaderService: LoaderService) {
  }

  ngOnInit(): void {
  }

}
