import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslatePipe } from "../services/translation/translate.pipe";

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports: [TranslatePipe]
})
export class HomeComponent implements OnInit {

  constructor (private router: Router) {}

  ngOnInit(){
  }
  start() {
    this.router.navigate(['products']);
  }
}
