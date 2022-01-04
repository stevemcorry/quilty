import { Component, OnInit, HostListener, ElementRef } from '@angular/core';

@Component({
  selector: 'app-js-fun',
  templateUrl: './js-fun.component.html',
  styleUrls: ['./js-fun.component.scss']
})
export class JsFunComponent implements OnInit {

  constructor(private elRef:ElementRef) { }
  
  
  ngOnInit() {
  }
  ngAfterViewInit(){
    this.clock();
  }
  
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    var div = this.elRef.nativeElement.querySelector('div[data-key="'+ event.keyCode +'"]');
    var audio = this.elRef.nativeElement.querySelector('audio[data-key="'+ event.keyCode +'"]');
    if(audio){
      div.classList.add("playing")
      audio.currentTime = 0;
      audio.play()
      div.addEventListener('transitionend', ()=>{div.classList.remove("playing")})
    }
  }

  clock(){
    let [x,y,z] = this.getTime();
    let hour = this.elRef.nativeElement.querySelector('div.hour-hand');
    let min = this.elRef.nativeElement.querySelector('div.min-hand');
    let second = this.elRef.nativeElement.querySelector('div.second-hand');

    hour.style.transform = "rotate("+ (360*z + 90) +"deg)"
    min.style.transform = "rotate("+ (360*y + 90) +"deg)"
    second.style.transform = "rotate("+ (360*x + 90) +"deg)"
    
    setTimeout(()=>{
      this.clock();
    },1000)
  }

  getTime(){
    let time = new Date();
    return [time.getSeconds()/60, time.getMinutes()/60, time.getHours()/12]
  }


}
