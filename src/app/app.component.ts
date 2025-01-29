import { CommonModule } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthService } from "./modules/auth/auth-services.module";
import { HttpClientModule } from "@angular/common/http";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [CommonModule, RouterModule, HttpClientModule],
    providers: [AuthService],
    template: `<router-outlet></router-outlet>`,
})
export class AppComponent implements OnInit {
    title = "store";
    constructor(private authService: AuthService) {}

    ngOnInit(): void {
        this.authService.isValidRefreshToken();
    }
}
