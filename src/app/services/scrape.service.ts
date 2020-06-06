import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ScrapeService {


  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  };
  access = '?access_token='

  constructor(
    private http: HttpClient,
    ) { }


  scrapeUrl(scrapeUrl){

    let url = `https://us-central1-new-angular-firebase.cloudfunctions.net/scrape`;
    scrapeUrl = `https://stevecorry.com`;
    // scrapeUrl = `https://news.ycombinator.com`;
    // scrapeUrl = `https://www.amazon.com/s?k=oculus&ref=nb_sb_noss`;
    // scrapeUrl = `https://www.walmart.com`;
    // scrapeUrl = `https://www.amazon.ca/Vitamix-Explorian-Professional-Grade-Low-Profile-Refurbished/dp/B07CXVSMZ4/ref=sr_1_5?keywords=vitamix&qid=1555870204&s=gateway&sr=8-5&th=1`;
        
    var params = {url: scrapeUrl};
  
    return this.http.post(url, params, this.httpOptions).subscribe(res=>{
      console.log('res', res);
    }, err =>{
      console.log('error', err)
    })
  
  }

  instaAccess(code){
    return this.http.get(`https://api.instagram.com/v1/users/self/media/recent`+ this.access + code)
  }


}
