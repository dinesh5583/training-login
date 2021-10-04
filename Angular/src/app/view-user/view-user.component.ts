import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { AuthData } from '../model/auth.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {

  private id:string;
  isLoading:boolean=false
  user:AuthData[];
  constructor(private authService:ServicesService,
          private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.route.paramMap.subscribe((paramMap:ParamMap)=>{
      if(paramMap.has('id')){
        this.id=paramMap.get('id');
        this.isLoading=true
        this.authService.ViewUser(this.id).subscribe((res:AuthData[])=>{
          this.isLoading=false
          this.user=res
          console.log(this.user);
        });
      }
    });
  }


}
