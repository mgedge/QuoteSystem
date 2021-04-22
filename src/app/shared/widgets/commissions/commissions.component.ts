import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { FindValueOperator } from 'rxjs/internal/operators/find';
import { CommService } from 'src/app/shared/services/comm.service';

@Component({
  selector: 'app-commissions',
  templateUrl: './commissions.component.html',
  styleUrls: ['./commissions.component.css']
})

export class CommissionsComponent implements OnInit {
  commList: any = [
    {username: '', totalCommissionAmt: '', totalNumCommissions: ''}
  ];

  displayedColumns: string[] = ['username', 'totalCommissionAmt', 'totalNumCommissions'];
  dataSource: any;
  @ViewChild(MatPaginator) set paginator(mp: MatPaginator) {
    this.dataSource.paginator = mp;
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  constructor(
    private _comm: CommService, 
  ) { }

  ngOnInit(): void {
    this.loadComm();
  }

  loadComm() {
    this._comm.getComm().subscribe(comms =>{
      this.commList =comms;
      this.dataSource = this.commList;
    })
  }

}