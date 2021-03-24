import {MediaMatcher} from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from "./../../auth.service";

@Component({
  selector: 'app-default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  mobileQuery: MediaQueryList;

  currentUser: any = {};
  sideBarOpen = true;

  private _mobileQueryListener: () => void;

  constructor(
    private _router: Router,
    private _auth: AuthService,
    private actRoute: ActivatedRoute,
    changeDetectorRef: ChangeDetectorRef, 
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {

  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
