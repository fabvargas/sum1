import { Component, OnInit } from '@angular/core';
import { ApiClientService } from '../services/api-client.service';

@Component({
  selector: 'app-food',
  templateUrl: './food.page.html',
  styleUrls: ['./food.page.scss'],
  standalone:false
})
export class FoodPage implements OnInit {

  foodList: any[] = [];
  selectedFood: any = null;

  constructor(private api: ApiClientService) {}

  ngOnInit() {
    this.api.getFoodList().subscribe(response => {
      this.foodList = response.meals; 
    });
  }

  verDetalle(id: string) {
    this.api.getFood(id).subscribe(response => {
      this.selectedFood = response.meals[0];
    });
  }

  cerrarDetalle() {
    this.selectedFood = null;
  }
}
