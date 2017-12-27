import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanDeactivate, Router, RouterStateSnapshot } from '@angular/router';
import { TimelineLite, TweenLite } from 'greensock';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

export interface PageTransition {
  page: ElementRef;
}

@Injectable()
export class RouteTransition implements CanDeactivate<PageTransition> {

  private first: boolean = true;

  constructor(protected router: Router, protected route: ActivatedRoute) {  }

  canDeactivate(component: PageTransition,
                currentRoute: ActivatedRouteSnapshot,
                currentState: RouterStateSnapshot,
                nextState?: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.animatePageOut(component.page);
  }

  animatePageOut(el: ElementRef): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const tl = new TimelineLite({
        onComplete: () => {
          resolve(true);
        }
      });
      tl.add( TweenLite.to(el.nativeElement, 0.5, {x: '100%', opacity: 0}) );
    });
  }

  animatePageIn(el: ElementRef, level = false) {

    if ( this.first ) {
      this.first = false;
      return;
    }

    const tl = new TimelineLite({
      onComplete: () => {

      }
    });

    if (level) {
      tl.add( TweenLite.to(el.nativeElement, 0.5, {x: '0%', opacity: 1}) );
    } else {
      tl.add( TweenLite.from(el.nativeElement, 0.5, {x: '100%', opacity: 0}) );
    }
  }
}
