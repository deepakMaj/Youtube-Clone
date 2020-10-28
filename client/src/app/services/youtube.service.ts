import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private urlSource = new BehaviorSubject('');
  url = this.urlSource.asObservable();
  apiKey: string = 'AIzaSyCmr8J8cLB_lrbAsCRZaoazjvcSw077K98';

  constructor(private http: HttpClient) { }

  getVideos(): Observable<Object> {
    let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&chart=mostPopular&key=${this.apiKey}&maxResults=50&regionCode=IN`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  searchVideo(value: any) {
    this.urlSource.next(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${value}&key=${this.apiKey}&maxResults=15`);
  }

  searchResult(url: any): Observable<Object> {
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

  getAutocomplete(query: any): Observable<Object> {
    let url = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${query}`;
    return this.http.get(url).pipe(map(res => {
      return res;
    }));
  }

}
