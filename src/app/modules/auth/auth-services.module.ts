import { HttpClient } from '@angular/common/http';
import { Injectable} from '@angular/core';
import { user } from 'src/app/shared/model/user.model';



@Injectable({
  providedIn: 'root'
})
export class AuthServicesModule {

constructor(private http: HttpClient){}

createUser(userData: user){
  const url = 'https://api.escuelajs.co/api/v1/users/';
  return this.http.post<user>(url, userData)
}

 }
