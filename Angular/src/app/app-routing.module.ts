import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './authGuard/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {path:'signup', component:SignupComponent },
  {path:'edit/:id', component:SignupComponent,canActivate:[AuthGuard] },
  {path:'login',component:LoginComponent},
  {path:'',component:DashboardComponent},
  {path:'list',component:ListComponent},
  {path:'view/:id',component:ViewUserComponent, canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[AuthGuard]
})
export class AppRoutingModule { }
