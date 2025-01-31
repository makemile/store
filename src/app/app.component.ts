import { CommonModule } from "@angular/common";
import { Component} from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { AuthService } from "./modules/auth/auth-services.module";

@Component({
    selector: "app-root",
    imports: [CommonModule, RouterOutlet],
    template: `

     
            <router-outlet></router-outlet>
       
    `,
    standalone: true,
})
export class AppComponent  {
    title = "store";
    isLoading = true;
    constructor(private authService: AuthService) {}

    
}
