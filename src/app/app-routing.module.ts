import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersListPageComponent } from './UsersPages/users-list-page/users-list-page.component';
import { EditUserPageComponent } from './UsersPages/edit-user-page/edit-user-page.component';
import { AddNewUserPageComponent } from './UsersPages/add-new-user-page/add-new-user-page.component';
import { LoginPageComponent } from './Components/AuthenticationPages/login-page/login-page.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule) },
  { path: 'login', component: LoginPageComponent},
  { path: 'users-list', component: UsersListPageComponent},
  { path: 'edit-user', component: EditUserPageComponent},
  { path: 'edit-user/:id', component: EditUserPageComponent},
  { path: 'add-new-user', component: AddNewUserPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
