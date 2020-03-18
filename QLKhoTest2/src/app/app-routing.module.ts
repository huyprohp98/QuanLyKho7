import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Trang chủ'
    },
    children: [
      {
        path: 'danh-muc',
        loadChildren: () => import('./views/categories/categories.module').then(m => m.CategoriesModule)
      }
    ]
  } 
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
