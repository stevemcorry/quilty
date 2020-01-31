import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  // constructor() {

  //   this.scroll();

  //  }

  // scroll(){

  //   window.onscroll = function() {
  //     this.homeScroll()
  //   };
    
  // }

  // homeFunction(){
  //   document.getElementById('to-top').onclick = function(){topFunction();}

  //   function topFunction() {
  //     var c = document.documentElement.scrollTop || document.body.scrollTop;
  //     if (c > 50) {
  //       window.requestAnimationFrame(this.topFunction);
  //       window.scrollTo(0, c - c / 5);
  //     }
  //   }
  // }
  // homeScroll(){

  //   var toTop = document.getElementById('to-top');
  //   var showHeight = document.getElementById('scrolly-polly-olly').scrollHeight + window.innerHeight;
  //   // var showHeight = 1000; 
  //   var footerHeight = document.getElementById('footer').clientHeight;
  //   // var footerHeight = 500;


  //   function myFunction(){
  //     console.log('why no scroll?')
  //     var height = document.body.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
  //     var top = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
  //     var bottom = height - footerHeight - top - window.innerHeight;
  //     if(top > showHeight){
  //       toTop.classList.add("active");
  //     } else {
  //       toTop.classList.remove("active");
  //     }
  //     if(bottom <= 0){
  //       toTop.style.bottom = (bottom * -1 + 40) + "px";
  //     } else {
  //       toTop.style.bottom = "20px";
  //     }
  //   }

  // }


}
