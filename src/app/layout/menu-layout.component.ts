import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-layout',
  templateUrl: './menu-layout.component.html',
  styleUrls: ['./menu-layout.component.scss'],
  standalone: false,
})
export class MenuLayoutComponent {
    constructor(private menu: MenuController,private router : Router) {}

      isActive(route: string): boolean {
    return this.router.url === route;
  }
    
  toggleMenu() {
    const menu = document.querySelector('ion-menu');
    if (menu) {
      (menu as HTMLIonMenuElement).close();
    }
  }
    
}