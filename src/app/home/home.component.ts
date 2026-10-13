import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SectionOneComponent } from '../sections/section-one/section-one.component';
import { SectionTwoComponent } from '../sections/section-two/section-two.component';
import { SectionServicosComponent } from '../sections/section-servicos/section-servicos.component';
import { SectionThreeComponent } from '../sections/section-three/section-three.component';
import { SectionFourComponent } from '../sections/section-four/section-four.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    SectionOneComponent,
    SectionTwoComponent,
    SectionServicosComponent,
    SectionThreeComponent,
    SectionFourComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {}
