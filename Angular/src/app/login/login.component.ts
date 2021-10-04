import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit ,OnDestroy{

  empform:FormGroup;
  isLoading:boolean=false;
  private authStatusSub:Subscription;

  constructor(public authService:ServicesService) { }
  ngOnInit(): void {
    this.empform=new FormGroup({
      'email': new FormControl('',[Validators.required, Validators.email]),
      'password': new FormControl('',Validators.required)
    })

    this.authStatusSub=this.authService.getMessage().subscribe(
      authStatus=>{
        this.isLoading=false
      }
    )

  }

  onLogin(){
    if(this.empform.invalid){
      return;
    }
    this.isLoading=true
    this.authService.login(this.empform.value.email,this.empform.value.password)
  }

  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }

}
