import { Component, OnInit } from '@angular/core';
import { YoutubeService } from '../../services/youtube.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: any[];

  constructor(private youtubeService: YoutubeService,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    setTimeout(() => this.spinner.hide(), 4000);
    this.videos = [];
    this.youtubeService.getVideos(50).subscribe(res => {
      for (let list of res["items"]) {
        this.videos.push(list);
      }
    });
  }

  convertCount(count: any) {
    if (parseInt(count) >= 1000000) {
      const str = (parseInt(count) / 1000000).toPrecision(2).toString();
      return `${str}M`;
    }
    if (parseInt(count) >= 1000) {
      const str = (parseInt(count) / 1000).toFixed(0).toString();
      return `${str}K`;
    }
  }

}
