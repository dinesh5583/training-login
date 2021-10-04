import { Component, OnInit, Output } from '@angular/core';
import { AuthData } from '../model/auth.model';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  listUsers:AuthData[];
  isLoading:boolean=false

  constructor(private authService:ServicesService) { }
  ngOnInit(): void {
    this.getList()
  }
  getList(){
    this.isLoading=true
    this.authService.getUsers().subscribe((response:AuthData[])=>{
      this.isLoading=false;
        this.listUsers=response;
    })
  }
  onDelete(id){
    if(confirm('Do you Want to delete this contact')){
      this.authService.DeleteUser(id).subscribe(
        (res)=>{
          console.log(res);
          this.getList();
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

  onView(id){

    this.authService.ViewUser(id);
  }


}
