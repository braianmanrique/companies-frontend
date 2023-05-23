import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.css']
})
export class BreadcrumbsComponent implements OnDestroy {
  public title !: string;
  public titleSubs$: Subscription;

  constructor(private router: Router){
   this.titleSubs$ = this.getDataRuote().subscribe( (data) => {
    console.log(data)
    this.title = data['title'];
    document.title = `Frontend - ${this.title}`
  })
  }

  ngOnDestroy(): void {
    this.titleSubs$.unsubscribe();
  }

  getDataRuote(){
     return this.router.events
      .pipe(
        filter((event): event is ActivationEnd => event instanceof ActivationEnd),
        filter((event:ActivationEnd) => event.snapshot.firstChild === null ),
        map((event:ActivationEnd) => event.snapshot.data)
      )
      
    }
}
