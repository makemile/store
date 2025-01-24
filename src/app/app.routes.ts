import { Routes } from '@angular/router';
import { ProductDetailComponent } from 'src/app/website/pages/product-detail/product-detail.component';
import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { LayoutComponent } from './website/layout/layout.component';
import { AuthGuard} from './modules/auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        canActivate:[AuthGuard],
        loadComponent: () =>
          import('./website/pages/list/list.component').then(
            (m) => m.ListComponent
          ),
          pathMatch: 'full'
      },
      {
        path: 'about',
        canActivate: [AuthGuard],
        loadComponent: () =>
          import('./domains/info/pages/about/about.component').then(
            (m) => m.AboutComponent
          ),
      },
      {
        path: 'product/:id',
        canActivate: [AuthGuard],
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
