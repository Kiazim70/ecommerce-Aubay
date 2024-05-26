import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-car-filter-popup',
  standalone: true,
  imports: [NgIf],
  templateUrl: './car-filter-popup.component.html',
  styleUrl: './car-filter-popup.component.css'
})
export class CarFilterPopupComponent implements OnInit {

  isVisible = false;


  constructor(){

  }

  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }



openPopup(): void {
  this.isVisible = true;
}
 closePopup() {
    this.isVisible = false; 
 }
seeAllCars() {
  console.log('Voir toutes les voitures');
  this.closePopup();}
 
}
