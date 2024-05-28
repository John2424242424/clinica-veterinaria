import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent {

  @ViewChild('mascotaSubMenu') mascotaSubMenu!: ElementRef;
  @ViewChild('citasSubMenu') citasSubMenu!: ElementRef;
  @ViewChild('historialClinicoSubMenu') historialClinicoSubMenu!: ElementRef;
  @ViewChild('pagosSubMenu') pagosSubMenu!: ElementRef;

  toggleSubMenu(subMenu: string): void {
    if (subMenu === 'mascotas') {
      this.mascotaSubMenu.nativeElement.classList.toggle('hidden');
    } else if (subMenu === 'citas') {
      this.citasSubMenu.nativeElement.classList.toggle('hidden');
    }else if (subMenu === 'historial-clinico') {
      this.historialClinicoSubMenu.nativeElement.classList.toggle('hidden');
    }else if (subMenu === 'pagos') {
      this.pagosSubMenu.nativeElement.classList.toggle('hidden');
    }
  }
}

