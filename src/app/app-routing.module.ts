import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailPageComponent } from './pages/detail-page/detail-page.component';
import { HomeComponent } from './pages/home/home.component';

export const RoutePath = {
  DetailsPage: 'details',
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: RoutePath.DetailsPage,
    component: DetailPageComponent,
    data: {
      title: 'Details Page',
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
