import { RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@/info/pages/not-found/not-found.component';
import { CustomPreloadService,} from './service/custom-preload.service'
import { NgModule } from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./website/website.module').then(m => m.webSiteModule),
    data:{
        preload: true
    }
  },
  {
    path: '**',
    component: NotFoundComponent,
  },
];
@NgModule({
    imports: [RouterModule.forRoot(routes, {
        preloadingStrategy: CustomPreloadService
    })],
    exports:[RouterModule]
})
 export class AppRoutingModule{}