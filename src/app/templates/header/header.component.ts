import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    window.addEventListener('scroll', headerScrollFunction);
    // window.onscroll = function() {headerScrollFunction()};
    function headerScrollFunction(){
      var toTop = document.getElementById('header');
      var top = document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop;
      if(top > 50){
        toTop.classList.add('active');
      } else {
        toTop.classList.remove("active");
      }
    }
  }

  

}
