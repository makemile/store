import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { CartService } from "../../../website/services/cart.service";
import { RouterLinkWithHref, RouterLinkActive, Router } from "@angular/router";
import { AuthService } from "src/app/modules/auth/auth-services.module";
import { user } from "src/app/models/user.model";
import { tokenService } from "src/app/modules/auth/token.service";

@Component({
    selector: "app-header",
    imports: [CommonModule, RouterLinkWithHref, RouterLinkActive],
    templateUrl: "./header.component.html",
    styleUrls: ["./header.component.css"],
})
export class HeaderComponent {
   
    hideSiteMenu = signal(true);
    hideHeader = signal(false);
    private cartService = inject(CartService);
    cart = this.cartService.cart;
    total = this.cartService.total;
    user$ : any;

    constructor(private authService: AuthService, private router: Router, private token: tokenService) {
        this.user$ = this.authService.user$
    }

    toogleSideMenu() {
        this.hideSiteMenu.update((prevState) => !prevState);
    }

    Onlogout(){
        this.authService.logout();
    }

    
}
