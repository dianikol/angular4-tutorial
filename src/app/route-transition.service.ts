import { ElementRef, Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TimelineLite, TweenLite } from 'gsap';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RouteTransition {

  public unloadPage = new Subject<any>();

  constructor(protected router: Router, protected route: ActivatedRoute) { }

  animatePageOut(el: ElementRef, to) {
    const tl = new TimelineLite({
      onComplete: () => {
        this.goTo(to);
      }
    });
    tl.add( TweenLite.to(el.nativeElement, 0.5, {x: '100%', opacity: 0}) );
  }

  animatePageIn(el: ElementRef, level = 0) {
    const tl = new TimelineLite({
      onComplete: () => {
      }
    });

    if (level > 0) {
      tl.add( TweenLite.to(el.nativeElement, 0.5, {x: '0%', opacity: 1}) );
    } else {
      tl.add( TweenLite.from(el.nativeElement, 0.5, {x: '100%', opacity: 0}) );
    }
  }

  goTo( to ) {
    this.router.navigate(to, {relativeTo: this.route});
  }
}
