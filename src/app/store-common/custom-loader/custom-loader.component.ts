import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-custom-loader',
  templateUrl: './custom-loader.component.html',
  styleUrls: ['./custom-loader.component.scss']
})
export class CustomLoaderComponent implements OnInit, OnDestroy {
  loading: boolean;
  subscription: Subscription;

  constructor(private loaderService: SharedService) {
    this.subscription = this.loaderService.onUpdateIsLoading().subscribe((v) => {
      console.log(v);
      this.loading = v;
    });

  }
  ngOnInit(): void {
  }
  ngOnDestroy(): void {
      this.subscription.unsubscribe();
  }

}
