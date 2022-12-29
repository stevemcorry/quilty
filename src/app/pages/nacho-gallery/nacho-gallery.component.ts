import { Component, OnInit } from '@angular/core';
import { MessagesService } from 'app/services/messages.service';

@Component({
  selector: 'app-nacho-gallery',
  templateUrl: './nacho-gallery.component.html',
  styleUrls: ['./nacho-gallery.component.scss']
})
export class NachoGalleryComponent implements OnInit {
  
  author;
  title;
  img;
  gallery = [];
  bidAmmount = 0;
  bidderName = "";

  featuredArt = {
    title: '',
    author: '',
    img: '',
    key: '',
    bids: []
  };


  constructor( public messageSvc: MessagesService) { }

  ngOnInit() {
    this.messageSvc.getArt().subscribe(res=>{
      console.log('art', res);
      this.gallery = res;
    })
  }

  addArt(){
    this.messageSvc.addArt(this.author, this.title, this.img);
  }

  changeModal(art){
    console.log(art)
    this.featuredArt = art;
  }

  getTopBid(bids){
    if(bids){
      let topBid = 0;
      let topBidder = "";
      for(let bid of bids){
        console.log('bid', bid)
        if(bid.amount > topBid){
          topBid = bid.amount;
          topBidder = bid.bidder;
        }
      }
      return "Top Bid: $" + topBid + " by" + " " + topBidder;
    }
  }
  submitBid(key){
    if(this.bidAmmount == 0){
      alert('You must enter an amount.');
      return;
    }
    if(this.bidderName == ""){
      alert('Please enter your name.');
      return;
    }
    this.messageSvc.submitBid(this.bidderName, this.bidAmmount, key).then(res=>{
      this.bidAmmount = 0;
      alert('Thank you for bidding!');
    })


  }


}
