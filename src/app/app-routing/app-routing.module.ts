import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from '../pages/gallery/gallery.component';
import { HomeComponent } from '../pages/home/home.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
    data: {
      title: 'Gallery',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    data: {
      title: 'Home',
    },
  },
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
