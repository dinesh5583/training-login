import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthData } from './model/auth.model';
import { LoginData } from './model/login.model';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(public http: HttpClient, private router:Router) { }

  private token:string;
  userName:string;
  private isAuthenticated=false;
  errorMessage:string;
  getToken(){
    return this.token;
  }
  getIsAuth(){
    return this.isAuthenticated;
  }

  private subject =new Subject<boolean>();

  getMessage(){                           //getAuthStatusListener
    return this.subject.asObservable();
  }
  createUser(users:AuthData) {
     this.http.post<{token:string,name:string}>("http://localhost:5000/api/signup", users)
     .subscribe(res=>{
       console.log(res)
       const token=res.token;
       this.token=token;
       const name=res.name
      this.userName=name;
       if(token){
         this.isAuthenticated=true;
         this.subject.next(true);
         this.saveAuthData(token,name)
         this.router.navigate(['/list'])
       }
     },error=>{
       this.subject.next(false);
     })

  }
  DeleteUser(id:string){
    return this.http.delete("http://localhost:5000/api/user/"+id);
  }



  ViewUser(id){
     return this.http.get("http://localhost:5000/api/user/"+id);
  }
  login(email: string, password: string) {
    const loginData: LoginData = {email: email, password: password};
    this.http.post<{token:string, name:string, error:string}>("http://localhost:5000/api/login",loginData)
    .subscribe((response)=>{
      const token=response.token;
      this.token=token;
      const name=response.name
      this.userName=name;
      if(token){
        this.isAuthenticated=true;
        this.subject.next(true);
        this.saveAuthData(token,name)
        this.router.navigate(['/list'])
      }
    },(err)=>{
       this.subject.next(false)

    });
  }
  getUsers(){
    return this.http.get("http://localhost:5000/api/users");
  }
  updateUser(user:AuthData){
    return this.http.put("http://localhost:5000/api/user/"+user.user_id,user)
  }

  logout(){
    this.token=null;
    this.subject.next(false);         //user not authenticated
    this.clearAuthData();
    this.router.navigate(['/login'])
  }

  private saveAuthData(token: string,name:string){
    localStorage.setItem('token',token);
    localStorage.setItem('name',name);
  }

  private clearAuthData(){
    localStorage.removeItem('token')
    localStorage.removeItem('name')

  }

   getAuthData(){
    const token= localStorage.getItem('token');
    const name= localStorage.getItem('name');

    if(!token || !name){
      return;
    }
    return {
      token:token,
      name:name
    };
  }

  autoAuthUser(){
    const authInformation=this.getAuthData();
    if(!authInformation){
      return;
    }
    this.token=authInformation.token;
    this.userName=authInformation.name;
    if(this.token){
      this.isAuthenticated=true;
      this.subject.next(true);
    }

  }
  getError(){
    return this.errorMessage;
  }

}



// sendMessage(message:boolean){
  //   this.subject.next(message);
  // }
