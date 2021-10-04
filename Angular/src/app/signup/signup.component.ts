import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  empform:FormGroup;
  isLoading:boolean=false;
  user:Object;
  private id:string;
   mode="create";
   private authStatusSub:Subscription;
 constructor(
        private fb:FormBuilder,
        private authservice:ServicesService,
        private router :Router, private route:ActivatedRoute) { }
  ngOnInit(): void {
    this.empform = this.fb.group({
      user_id: [''],
      user_name:['',Validators.required],
      user_email: ['',[Validators.required,Validators.email]],
      user_password:['',Validators.required],
    });


      this.authStatusSub=this.authservice.getMessage().subscribe(
        authStatus=>{
          this.isLoading=false;
        }
      );

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.mode='edit';
        this.id=paramMap.get('id');
        this.isLoading=true
        this.authservice.ViewUser(this.id).subscribe((res:Object)=>{
          this.isLoading=false
          this.user=res[0];
          console.log(this.user)
          this.empform.patchValue(this.user)
        });
      }else{
        this.mode='create';
        this.id=null;
      }
    });

  }

  onSignup(){
    if(this.empform.invalid){
      return;
    }
    this.isLoading=true;
    if(this.mode==='create'){
        this.authservice.createUser(this.empform.value);
    }else{
      this.authservice.updateUser(this.empform.value).subscribe(
        (res)=>{
          console.log(res);
          this.router.navigate(["/list"]);
        },
        (err)=>{
          console.log(err);
        }
      )
    }
    this.empform.reset();

  }
  ngOnDestroy(){
    this.authStatusSub.unsubscribe();
  }
}
