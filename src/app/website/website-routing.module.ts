import { RouterModule, Routes } from "@angular/router";
import { NotFoundComponent } from "@/domains/info/pages/not-found/not-found.component";
import { AuthGuard } from "../guards/auth.guard";
import { LayoutComponent } from "./layout/layout.component";
import { NgModule } from "@angular/core";
import { ProductDetailComponent } from "./pages/product-detail/product-detail.component";

export const routes: Routes = [
    {
        path: "",
        component: LayoutComponent,
        children: [
            {
                path: "",
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import("./pages/list/list.component").then(
                        (m) => m.ListComponent
                    ),
                pathMatch: "full",
            },
            {
                path: "about",
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import("../domains/info/pages/about/about.component").then(
                        (m) => m.AboutComponent
                    ),
            },
            {
                path: "profile",
                canActivate: [AuthGuard],
                loadComponent: () =>
                    import("./pages/profile/profile.component").then(
                        (m) => m.ProfileComponent
                    ),
            },
            {
                path: "product/:id",
                canActivate: [AuthGuard],
                component: ProductDetailComponent,
                data: {
                    preload: true,
                },
            },
            {
                path: "auth",
                loadChildren: () =>
                    import("../modules/auth/auth-routing.module").then(
                        (m) => m.AuthRoutingModule
                    ),
            },
        ],
    },
    {
        path: "**",
        component: NotFoundComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class webSiteRoutingModule {}
