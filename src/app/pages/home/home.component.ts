import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  projectRotation = 0;
  @ViewChild('projectsContainer', {static:false}) projectsContainer: ElementRef;
  @HostListener("window:scroll", [])
  onScroll(): void {
    var element = this.projectsContainer.nativeElement;
    if(window.innerWidth < 768){
      this.projectRotation = 0;
      return;
    }
    if ((element.offsetTop - 200) <= window.scrollY) {
      this.projectRotation = 0;
    } else if(((element.offsetTop - 200) - window.scrollY) < 800){
      var rotate = ((element.offsetTop - 200) - window.scrollY)/10;
      this.projectRotation = rotate;
    }else {
      // console.log("else",(element.offsetTop - 200) - window.scrollY);
    }
  }

  constructor(
  ) { }
  

  ngOnInit() {

    // var showHeight = document.getElementById('scrolly-polly-olly').scrollHeight + window.innerHeight;
    // var footerHeight = document.getElementById('footer').clientHeight;
    // var toTop = document.getElementById('to-top');
    // var lastHeight;
    // var toTopTimer;
    // var bottomFlag = false;
    // window.addEventListener('scroll', myFunction);
    // // window.onscroll = function() {myFunction()};
    // toTop.onclick = function(){topFunction();}

    // function myFunction(){
    //   var height = document.body.scrollHeight ? document.body.scrollHeight : document.documentElement.scrollHeight;
    //   var top = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
    //   var bottom = height - footerHeight - top - window.innerHeight;
    //   if(top > showHeight){
    //     // check if scrolled up or down
    //     top > lastHeight ? down() : up();
    //     lastHeight = top;
    //   } else {
    //     toTop.classList.remove("active");
    //     lastHeight = 0;
    //   }
    //   // "sticky" when it reaches the footer
    //   toTop.style.bottom = bottom <= 0 ? (bottom * -1 + 40) + "px" : toTop.style.bottom = "20px";

    // }
    
    // function up(){
    //   bottomFlag = false;
    //   clearTimeout(toTopTimer);
    //   toTop.classList.add("active");
    // }

    // function down(){
    //   activeTimer();
    // }

    // function activeTimer(){
    //   console.log(bottomFlag)
    //   if(!bottomFlag){
    //     toTopTimer = setTimeout(()=>{
    //       toTop.classList.remove("active");
    //     },1000)
    //     bottomFlag = true;
    //   }
    // }

    // function topFunction() {
    //   var c = document.documentElement.scrollTop || document.body.scrollTop;
    //   if (c > 0) {
    //     window.requestAnimationFrame(topFunction);
    //     window.scrollTo(0, c - c / 5);
    //   }
    // }

  }
  ngOnDestroy() {
    
  }

}
