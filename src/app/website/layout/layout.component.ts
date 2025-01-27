import { CommonModule } from "@angular/common";
import { Component, OnDestroy } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { AuthService } from "src/app/modules/auth/auth-services.module";
import { ToastComponent } from "../../shared/components/toast/toast.component";
import { Subscription } from "rxjs";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [CommonModule, HeaderComponent, RouterModule, ToastComponent],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.css",
})
export class LayoutComponent {
    isAuthenticated = false;
    private authSubscription: Subscription | null = null;
    constructor(private authService: AuthService) {}
    ngOnInit(): void {
       this.authSubscription =  this.authService.isAuthenticated$.subscribe((authStatus) => {
            this.isAuthenticated = authStatus;
        });
    }

    ngOnDestroy(): void {
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }
    }
}
