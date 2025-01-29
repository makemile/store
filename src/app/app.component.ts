import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./modules/auth/auth-services.module";

@Component({
    selector: "app-root",
    imports: [CommonModule, RouterOutlet],
    template: `
        <div *ngIf="isLoading; else content">Cargando...</div>
        <ng-template #content>
            <router-outlet></router-outlet>
        </ng-template>
    `,
    standalone: true,
})
export class AppComponent implements OnInit {
    title = "store";
    isLoading = true;
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.initializeAuthState();
        this.authService.isAuthenticated$.subscribe(() => {
            this.isLoading = false;
        });
    }
}
