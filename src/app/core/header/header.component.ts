import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Response } from '@angular/http';

import { DataStorageService } from '../../shared/data-storage.service';
import { AuthService } from '../../auth/auth.service';
import { RouteTransition } from '../../route-transition.service';
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  @ViewChild('page') page: ElementRef;

  constructor(private dataStorageService: DataStorageService,
              public authService: AuthService,
              private routeTransition: RouteTransition,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
  }

  goTo(to) {
    this.routeTransition.unloadPage.next(to);
  }

  onSaveData() {
    this.dataStorageService.storeRecipes()
      .subscribe(
        (response: Response) => {
          console.log(response);
        }
      );
  }

  onFetchData() {
    this.dataStorageService.getRecipes();
  }

  onLogout() {
    this.authService.logout();
  }
}
