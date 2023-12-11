import { Component } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/Services/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.css']
})
export class UsersListPageComponent {


  editCache: { [key: string]: { edit: boolean; data: User } } = {};

  listOfUsers : User[] = [];

  listOfColumn: any= [
    {
      title: 'first Name',
      name: 'firstName',
      compare: (a: User, b: User) => a.firstName.localeCompare(b.firstName),
      priority: 3
    },
    {
      title: 'last Name',
      name: 'lastName',
      compare: (a: User, b: User) => a.lastName.localeCompare(b.lastName),
      priority: false
    },
    {
      title: 'user Name',
      name: 'userName',
      compare: (a: User, b: User) => a.userName.localeCompare(b.userName),
      priority: 2
    },
    {
      title: 'email',
      name: 'email',
      compare: (a: User, b: User) => a.email.localeCompare(b.email),
      priority: 1
    },
    {
      title: 'creation Date',
      name: 'creationDate',
      compare: (a: User, b: User) => a.creationDate.localeCompare(b.creationDate),
      priority: false
    },
    {
      title: 'Status',
      name: 'active',
      compare: (a: User, b: User) => a.active==(b.active),
      priority: false
    }    
  ];
  
  searchInput: string = '';
  
  pageSize: number = 10;

  currentPage: number = 0;

  totalPages: number = 10;

  totalElements: number = 0;

  constructor(private userService:UserService, private router: Router){}
  

  ngOnInit(){
    this.getAllUsers();
  }

  getAllUsers():void{
    this.userService.getWithPagination(this.currentPage, this.pageSize).subscribe(
      (response : any)=>{
        if (response && response.data && response.data.content) {
          this.listOfUsers = response.data.content;
          this.totalElements = response.data.totalElements;  
          //this.currentPage = response.data.pageable.pageNumber;
          //this.totalPages = response.data.totalPages;    
          console.log(response);
          console.log("total pages: ", this.totalPages, "current page :", this.currentPage);
          
                
          //this.updateEditCache();
        }else{
          console.error('Invalid API response format:', response);
        }
        (error: any) => {
          console.error('Error fetching users:', error);
        }
      }
    )    
    //this.updateEditCache();
  }

  getAll(): void{
    this.userService.getAll().subscribe(
      (data) =>{
        console.log(data);
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  getUserWithId(Id: string): any{
    this.userService.getUserWithId(Id).subscribe(
      (data) =>{
        console.log(data);
      },
      (error) =>{
        console.error(error);
      }
    )
  }

  deleteUserWithId(Id: string): void{
    this.userService.deleteUserWithId(Id).subscribe(
      () => {
        this.listOfUsers = this.listOfUsers.filter(
          user => user.id !== Id);
      },
      (error: any) => {
        console.error('Error deleting user:', error);
      }
    )
  }

  sort(event: any, column: any): void{
    const sortColumn = column.name;
    const sortDirection = event === 'ascend' ? 'ASC' : 'DESC';
    
    this.listOfColumn.forEach((col: any) => {
      if (col !== column) {
        col.nzSortOrder = null;
      }
    });

    console.log("sort const", sortColumn , sortDirection );
    this.currentPage = 0;
    this.userService.getUsersWithSort(this.currentPage,this.pageSize,sortColumn,sortDirection).subscribe(
      (response: any) => {
        if (response && response.data && response.data.content) {
          this.listOfUsers = response.data.content;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching sorted users:', error);
      }
    );
  }

  
  search(input: string): void{
    this.currentPage = 0;
    this.userService.searchUser(input,this.currentPage,this.pageSize,'id','ASC').subscribe(
      (response: any) => {
        if (response && response.data && response.data.content) {
          this.listOfUsers = response.data.content;
        } else {
          console.error('Invalid API response format:', response);
        }
      },
      (error: any) => {
        console.error('Error fetching users:', error);
      }
    );//todo : change error messages 
  }

  navigateToEditUser(userId: string): void {
    this.router.navigate(['/edit-user', userId]);
  }
  
  changePageSize($event: number) {
    this.pageSize=$event;
    this.getAllUsers();
  }

  changePageIndex($event: number) {
    console.log($event);
    this.currentPage = $event - 1;
    this.getAllUsers();
  }

/* Edit

  startEdit(id: string): void {
    this.editCache[id].edit = true;
  }

  saveEdit(id: string): void {
    const index = this.listOfUsers.findIndex(item => item.id === id);
    Object.assign(this.listOfUsers[index], this.editCache[id].data);
    this.userService.updateUser(id, this.listOfUsers[index]).subscribe(
      (response: any) => {
        if (response && response.data && response.data.content) {
          console.log('apdated user', response.data.content);
        }else{
          (error: any) => {
            console.error('Error updating user:', error);
          }
        }
      }
    );
    this.editCache[id].edit = false;
  }

  cancelEdit(id: string): void {
    const index = this.listOfUsers.findIndex(item => item.id === id);
    this.editCache[id] = {
      data: { ...this.listOfUsers[index] },
      edit: false
    };
  }

  updateEditCache(): void {
    this.listOfUsers.forEach(item => {
      this.editCache[item.id] = {
        edit: false,
        data: { ...item }
      };
    });
    console.log("edit", this.editCache);
    
  }
  
  */
}
