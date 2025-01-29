import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { ProfileRoutingModule } from "./product-detail-routing.module";

@Component({
    selector: "app-profile",
    imports: [CommonModule, ProfileRoutingModule],
    templateUrl: "./profile.component.html",
    styleUrl: "./profile.component.css",
})
export class ProfileComponent {
}
