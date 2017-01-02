import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {RedditService} from '../../app/services/reddit.service';
import {DetailsPage} from '../details/details';

@Component({
  selector: 'reddits',
  templateUrl: 'reddits.html'
})
export class RedditsPage {
  items: any;
  category: any;
  limit: any;
  constructor(public navCtrl: NavController, private redditService:RedditService) {
    this.getDefaults();
  }

  ngOnInit() {
    this.getPosts(this.category, this.limit);
  }

  getDefaults() {
    this.category = "food";
    this.limit = 5;
  }

  getPosts (category, limit){
      this.redditService.getPosts(category, limit).subscribe(response => {
          this.items = response.data.children;
//        console.log(response);
      });
  }

  viewItem(item)  {
    this.navCtrl.push(DetailsPage, {
      item:item
    });
  }

  changeCategory() {
    this.getPosts(this.category, this.limit);
  }
}
