import { Routes } from '@angular/router';
import { ProductDetailComponent } from '@/products/pages/product-detail/product-detail.component';
import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./domains/products/pages/list/list.component').then(
            (m) => m.ListComponent
          ),
      },
      {
        path: 'about',
        loadComponent: () =>
          import('./domains/info/pages/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'product/:id',
        component: ProductDetailComponent,
        data: { prerender: false },
      },
      {
        path: 'auth',
        loadChildren: () =>
          import('./modules/auth/auth-routing.module').then(
            (m) => m.AuthRoutingModule
          ),
      },
    ],
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
