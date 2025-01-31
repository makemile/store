import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "../../shared/components/header/header.component";
import { ToastComponent } from "../../shared/components/toast/toast.component";
import { AuthService } from "src/app/modules/auth/auth-services.module";

@Component({
    selector: "app-layout",
    standalone: true,
    imports: [CommonModule, HeaderComponent, RouterModule, ToastComponent],
    templateUrl: "./layout.component.html",
    styleUrl: "./layout.component.css",
})
export class LayoutComponent {
    constructor(private authService: AuthService) {}
    ngOnInit() {
        // this.authService.getUser().subscribe(users => {
            
        // });
    }
}
