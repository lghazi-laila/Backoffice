import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { UsersListPageComponent } from './UsersPages/users-list-page/users-list-page.component';
import { AddNewUserPageComponent } from './UsersPages/add-new-user-page/add-new-user-page.component';
import { EditUserPageComponent } from './UsersPages/edit-user-page/edit-user-page.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { LoginPageComponent } from './Components/AuthenticationPages/login-page/login-page.component';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzPopoverModule } from 'ng-zorro-antd/popover';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';




registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    UsersListPageComponent,
    AddNewUserPageComponent,
    EditUserPageComponent,
    LoginPageComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    NzTableModule,
    NzFormModule ,
    NzInputModule,
    NzCheckboxModule,
    NzButtonModule,
    ReactiveFormsModule,
    NzDividerModule,
    NzTagModule,
    NzSelectModule,
    NzPopoverModule,
    NzDropDownModule,
    NzPaginationModule 
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
