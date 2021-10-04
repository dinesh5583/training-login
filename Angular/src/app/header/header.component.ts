import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServicesService } from '../services.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  userIsAuthenticated=false;
  private authListenerSubs: Subscription;
  constructor(private authService:ServicesService) { }
  name:string;

  ngOnInit(): void {
    this.userIsAuthenticated=this.authService.getIsAuth();
    this.authListenerSubs=this.authService.getMessage()
     .subscribe(isAuthenticated=>{
        this.userIsAuthenticated=isAuthenticated;
     })
  }

  onLogout(){
    this.authService.logout();
  }

  ngOnDestroy(){
      this.authListenerSubs.unsubscribe();
  }

}
