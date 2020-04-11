import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GalleryComponent } from '../pages/gallery/gallery.component';
import { HomeComponent } from '../pages/home/home.component';
import { GalleryImageComponent } from '../pages/gallery-image/gallery-image.component';

const routes: Routes = [
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' },
  },
  {
    path: 'gallery/photos/:id',
    component: GalleryImageComponent,
    data: { title: 'Image' }
  },
  {
    path: 'home',
    component: HomeComponent,
    data: { title: 'Home' },
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
