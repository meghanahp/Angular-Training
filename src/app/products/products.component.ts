import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from '../shared/shared.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {
userSubscription: Subscription;
  constructor(private sharedService: SharedService) { 
      this.userSubscription = this.sharedService.onUpdateSession().subscribe(data => {
        console.log(data);
      })
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  ngOnInit(): void {
  }

}
