import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent implements OnInit {
  searchValue = '';
  users: any = [];
  displayedColumns: string[] = ['UserID', 'username', 'firstname', 'lastname', 'image', 'buttons'];
  dataSource = new MatTableDataSource<Element>(this.users);

  constructor(
    private _auth: AuthService,
  ) {  }

  @ViewChild(MatPaginator)
  set paginator(value: MatPaginator) {
    this.dataSource.paginator = value;
  }

  @ViewChild(MatSort)
  set sort(value: MatSort) {
    this.dataSource.sort = value;
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this._auth.getUsers().subscribe(users => {
      this.dataSource.data = users;
    })
  }

  removeUser(_id: string) {
    if (window.confirm('Are you sure?')) {
      this._auth.deleteUser(_id).subscribe((res) => {
        this.loadUsers();
      });
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}

interface Element {
  QuoteID: String
  username: String
  customer: String
  email: String
  status: String
  discount: String
}