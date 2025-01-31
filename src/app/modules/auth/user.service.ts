import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tokenService } from "./token.service";

@Injectable({
    providedIn: "root",
})
export class userService {
    constructor(private http: HttpClient, private token: tokenService) {}

  
}
