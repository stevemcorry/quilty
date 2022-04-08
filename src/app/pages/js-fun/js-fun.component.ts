import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

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
    this.cssControl()
    // this.day8()
    // this.day9()
    this.day16();
    // this.day19();
    this.gifControl();
  }
  
  //Day 1
  day1 = false
  @HostListener('window:keydown', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if(this.day12){this.day12(event)}
    if(!this.day1) return
    var div = this.elRef.nativeElement.querySelector('div[data-key="'+ event.keyCode +'"]');
    var audio = this.elRef.nativeElement.querySelector('audio[data-key="'+ event.keyCode +'"]');
    if(audio){
      div.classList.add("playing")
      audio.currentTime = 0;
      audio.play()
      div.addEventListener('transitionend', ()=>{div.classList.remove("playing")})
    }
  }


  //Day 2
  day2 = false
  clock(){
    setTimeout(()=>{
      this.clock();
    },1000)
    if (!this.day2) return;
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


  //Day 3
  @ViewChild('hike', { static: false }) hikePic;
  @ViewChild('spacing', { static: false }) spacing:ElementRef;
  @ViewChild('blur', { static: false }) blur:ElementRef;
  @ViewChild('base', { static: false }) base:ElementRef;
  cssControl(){
    this.base.nativeElement
    let style = `border: ${this.spacing.nativeElement.value}px solid ${this.base.nativeElement.value};filter: blur(${this.blur.nativeElement.value}px)`;
    this.hikePic.nativeElement.style = style;
  }

  //Day 4
  // Get your shorts on - this is an array workout!
    // ## Array Cardio Day 1

    day4(){
    // Some data we can work with

    const inventors = [
      { first: 'Albert', last: 'Einstein', year: 1879, passed: 1955 },
      { first: 'Isaac', last: 'Newton', year: 1643, passed: 1727 },
      { first: 'Galileo', last: 'Galilei', year: 1564, passed: 1642 },
      { first: 'Marie', last: 'Curie', year: 1867, passed: 1934 },
      { first: 'Johannes', last: 'Kepler', year: 1571, passed: 1630 },
      { first: 'Nicolaus', last: 'Copernicus', year: 1473, passed: 1543 },
      { first: 'Max', last: 'Planck', year: 1858, passed: 1947 },
      { first: 'Katherine', last: 'Blodgett', year: 1898, passed: 1979 },
      { first: 'Ada', last: 'Lovelace', year: 1815, passed: 1852 },
      { first: 'Sarah E.', last: 'Goode', year: 1855, passed: 1905 },
      { first: 'Lise', last: 'Meitner', year: 1878, passed: 1968 },
      { first: 'Hanna', last: 'Hammarström', year: 1829, passed: 1909 }
    ];

    const people = [
      'Bernhard, Sandra', 'Bethea, Erin', 'Becker, Carl', 'Bentsen, Lloyd', 'Beckett, Samuel', 'Blake, William', 'Berger, Ric', 'Beddoes, Mick', 'Beethoven, Ludwig',
      'Belloc, Hilaire', 'Begin, Menachem', 'Bellow, Saul', 'Benchley, Robert', 'Blair, Robert', 'Benenson, Peter', 'Benjamin, Walter', 'Berlin, Irving',
      'Benn, Tony', 'Benson, Leana', 'Bent, Silas', 'Berle, Milton', 'Berry, Halle', 'Biko, Steve', 'Beck, Glenn', 'Bergman, Ingmar', 'Black, Elk', 'Berio, Luciano',
      'Berne, Eric', 'Berra, Yogi', 'Berry, Wendell', 'Bevan, Aneurin', 'Ben-Gurion, David', 'Bevel, Ken', 'Biden, Joseph', 'Bennington, Chester', 'Bierce, Ambrose',
      'Billings, Josh', 'Birrell, Augustine', 'Blair, Tony', 'Beecher, Henry', 'Biondo, Frank'
    ];
    
      // Array.prototype.filter()
      //filter returns only items when return is true
      // 1. Filter the list of inventors for those who were born in the 1500's
      let fifteenies = inventors.filter(inventor=>{
        return (inventor.year >= 1500 && inventor.year < 1600)
      })
      console.log(fifteenies)
      
      
      // Array.prototype.map()
      //map always returns the same amount as put in
      // 2. Give us an array of the inventors first and last names
      let firstLast = inventors.map(inventor=>{
        return inventor.first + " " + inventor.last;
      })
      console.log('first last', firstLast)
      
      // Array.prototype.sort()
      // 3. Sort the inventors by birthdate, oldest to youngest
      let sorted = inventors.sort((a,b)=>{
        return a.year - b.year;
      })
      console.log('sorted', sorted)
      
      // Array.prototype.reduce()
      // 4. How many years did all the inventors live all together?
      let reduced = inventors.reduce((total, inventor)=>{
        return total + (inventor.passed - inventor.year);
      },0)
      console.log('reduced', reduced)

      
      // 5. Sort the inventors by years lived
      let sortedByYears = inventors.sort((a,b)=>{
        return (a.passed - a.year) - (b.passed - b.year);
      })
      console.log('sortedByYears', sortedByYears)

      // 6. create a list of Boulevards in Paris that contain 'de' anywhere in the name
      // https://en.wikipedia.org/wiki/Category:Boulevards_in_Paris
      // let deezBoulevards = []
      // document.querySelector('div.mw-category').querySelectorAll('a').forEach((aTag)=>{
      //   if(!aTag.innerText.includes('de')) return
      //   deezBoulevards.push(aTag.innerText);
      // })
      // console.log(deezBoulevards)
      
      // 7. sort Exercise
      // Sort the people alphabetically by last name
      let sortedPeople = people.sort((a, b)=>{
        let aLast = a.split(", ")[1]
        let bLast = b.split(", ")[1]
        return (aLast > bLast) ? 1 : -1
      })
      console.log('sorted People', sortedPeople)

      
      // 8. Reduce Exercise
      // Sum up the instances of each of these
      const data = ['car', 'car', 'truck', 'truck', 'bike', 'walk', 'car', 'van', 'bike', 'walk', 'car', 'van', 'car', 'truck' ];
      let countObj = {}
      data.forEach((x)=>{
        countObj[x] ? countObj[x]++ : countObj[x] = 1
      })
      console.log('counting object <3', countObj)
    }


    //DAY 6

    filteredCities = [];
    cities = [];
    cityCheck;
    async day6(){
      const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
      const cities = [];
      let blob = await fetch(endpoint)
      let data = await blob.json();
      cities.push(...data);
      this.cities = cities;
    }

    findMatches(){
      if(!this.cities[0] || this.cityCheck == "") {
        this.filteredCities = []; 
        return;
      }
      this.filteredCities = this.cities.filter((city)=>{
        const regex = new RegExp(this.cityCheck, 'gi');
        return city.city.match(regex) || city.state.match(regex);
      })
    }


    //Day 7

    day7(){
      // ## Array Cardio Day 2

      const people = [
        { name: 'Wes', year: 1988 },
        { name: 'Kait', year: 1986 },
        { name: 'Irv', year: 1970 },
        { name: 'Lux', year: 2015 }
      ];

      const comments = [
        { text: 'Love this!', id: 523423 },
        { text: 'Super good', id: 823423 },
        { text: 'You are the best', id: 2039842 },
        { text: 'Ramen is my fav food ever', id: 123523 },
        { text: 'Nice Nice Nice!', id: 542328 }
      ];

      // Some and Every Checks
      // Array.prototype.some() // is at least one person 19 or older?
      const isAdult = people.some(person=>{
        const currentYear= (new Date()).getFullYear();
        return currentYear- person.year >= 19
      })
      console.log({isAdult})
      // Array.prototype.every() // is everyone 19 or older?
      const everyOneIsAdult = people.every(person=>{
        const currentYear= (new Date()).getFullYear();
        return currentYear- person.year >= 19
      })
      console.log({everyOneIsAdult})
      // Array.prototype.find()

      const chosenOne = comments.find((comment)=> comment.id == 823423)
      console.log({chosenOne})
      // Find is like filter, but instead returns just the one you are looking for
      // find the comment with the ID of 823423

      // Array.prototype.findIndex()
      const secondOne = comments.findIndex((comment)=> comment.id == 823423)
      console.log({secondOne})
      // Find the comment with this ID
      comments.splice(secondOne, 1);
      // delete the comment with the ID of 823423
      console.table(comments)
    }


    isDrawing = false;
    ctx;
    lastX = 0;
    lastY = 0;
    lineWidth = 0;
    hue = 0;
    @ViewChild('canvasEl', { static: false }) canvasEl:ElementRef<HTMLCanvasElement>;
    day8(){
      this.canvasEl.nativeElement.width = window.innerWidth;
      this.canvasEl.nativeElement.height = window.innerHeight;
      this.ctx = this.canvasEl.nativeElement.getContext('2d');
      this.ctx.lineCap = 'round';
      this.ctx.lineJoin = 'round';
    }
    draw(e){
      if(!this.isDrawing) return
      this.ctx.strokeStyle = `hsl( ${this.hue}, 100%, 50%)`;
      this.ctx.lineWidth = this.lineWidth;
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastX, this.lastY)
      this.ctx.lineTo(e.offsetX, e.offsetY)
      this.ctx.stroke();
      [this.lastX, this.lastY] = [e.offsetX, e.offsetY];
      this.hue++;
      this.lineWidth++;
    }
    downMouse(e){
      this.isDrawing = true;
      this.lineWidth = 10;
      [this.lastX, this.lastY] = [e.offsetX, e.offsetY]
    }


    //DAY 9


    dogs = [{ name: 'Snickers', age: 2 }, { name: 'hugo', age: 8 }];
    @ViewChild('greenBoy', {static: true})greenBoy:ElementRef;
    makeGreen() {
      this.greenBoy.nativeElement.style.color = '#BADA55';
      this.greenBoy.nativeElement.style.fontSize = '50px';
      //Right click on element in inspect and Break on > Attribute to see the console show what funciton is causing the element to change attr
    }


    day9(){

    // Regular
    console.log('regular')

    // Interpolated
    let shit = 'poop'
    console.log('This is cool %s!!', 'poop');
    console.log(`This is cooler ${shit}!!`)

    // Styled
    console.log('%c This is styled!!', 'color: blue; background: white');

    // warning!
    console.warn('Watch out!!')

    // Error :|
    console.error('there has been a mistake')

    // Info
    console.info('There are more polar bears than stephens in the world')

    // Testing
    // console.assert(1 === 2, 'this is just wrong')

    // clearing
    // console.clear();

    // Viewing DOM Elements
    console.log(this.greenBoy)
    console.dir(this.greenBoy)

    // Grouping together
    this.dogs.forEach((dog)=>{
      //groupCollapesed is collapsed by default
      // console.groupCollapsed(`${dog.name}`)
      console.group(`${dog.name}`)
      console.log(`${dog.name} is the coolest dog`)
      console.log(`They are ${dog.age} years old`)
      console.log(`or ${dog.age * 7} in dog years`)
      console.groupEnd()
    })

    // counting
    console.groupCollapsed('Pen Club')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.count('pen')
    console.groupEnd()

    // timing

    console.time('timeout')
    setTimeout(()=>{
      console.timeEnd('timeout')
    },400)

    console.table(this.dogs)

    }

    @ViewChild('videoPlayer', {static: true})videoPlayer:ElementRef<HTMLVideoElement>;
    @ViewChild('progressBar', {static: true})progressBar:ElementRef;
    day11(){
      this.videoPlayer.nativeElement.addEventListener('timeupdate', this.handleProgress.bind(this));
    }
    playingVideo;
    playVideo(x){
      console.log(this.videoPlayer)
      if(x){
        this.videoPlayer.nativeElement.play();
        this.playingVideo = true;
      } else{
        this.videoPlayer.nativeElement.pause();
        this.playingVideo = false;
      }
    }
    addTimeToVideo(x){
      let video = this.videoPlayer.nativeElement;
      video.currentTime = video.currentTime + x;
    }
    handleProgress() {
      const percent = (this.videoPlayer.nativeElement.currentTime / this.videoPlayer.nativeElement.duration) * 100;
      this.progressBar.nativeElement.style.flexBasis = `${percent}%`;
    }


    //Day 12
    pressed = [];
    secretCode = 'steveboy'
    day12(e){
      this.pressed.push(e.key);
      this.pressed.splice(-this.secretCode.length - 1, this.pressed.length - this.secretCode.length)
      if(this.pressed.join('').includes(this.secretCode)){
        alert('you have done it!');
      }
      
    }

    @ViewChild('wow', {static: true})wow: ElementRef<HTMLElement>
    walk =35;
    day16(){
      this.wow.nativeElement.addEventListener('mousemove', this.makeCrazy.bind(this))
    }
    makeCrazy(event){
      console.log(event, this)
      const {offsetHeight: height, offsetWidth: width} = this.wow.nativeElement;
      const {offsetX: x, offsetY: y} = event;
      console.log(x,y, height, width)
      if(event.target){

      }
      let xMove =   (x / width * 80) - (width/2)
      let yMove =   (y / height * 40) - (height/2)

      console.log({xMove}, {yMove}, {height}, {width})

      this.wow.nativeElement.style.textShadow = `${xMove}px ${yMove}px 0 rgba(0,0,0, .4)`;
    }

    bands = ['The Plot in You', 'The Devil Wears Prada', 'Pierce the Veil', 'Norma Jean', 'The Bled', 'Say Anything', 'The Midway State', 'We Came as Romans', 'Counterparts', 'Oh, Sleeper', 'A Skylit Drive', 'Anywhere But Here', 'An Old Dog'];

    @ViewChild('player', {static: true})player:ElementRef;
    @ViewChild('photo', {static: true})photo: ElementRef;
    video;
    canvas;
    ctx2;
    strip;
    snap

    day19() {
      this.video = this.player.nativeElement
      this.canvas = this.photo.nativeElement
      this.ctx2 = this.canvas.getContext('2d')
      this.strip = document.querySelector('.strip');
      this.snap = document.querySelector('.snap');
  
      navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(localMediaStream => {
          console.log(localMediaStream);
        
    //  DEPRECIATION : 
    //       The following has been depreceated by major browsers as of Chrome and Firefox.
    //       video.src = window.URL.createObjectURL(localMediaStream);
    //       Please refer to these:
    //       Deprecated  - https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL
    //       Newer Syntax - https://developer.mozilla.org/en-US/docs/Web/API/HTMLMediaElement/srcObject
          
          this.video.srcObject = localMediaStream;
          this.video.play();
        })
        .catch(err => {
          console.error(`OH NO!!!`, err);
        });
    }


    
    // @ViewChild('gifElements', {static: true})gifElements:ElementRef;
    @ViewChild('mouth', {static: true})mouth:ElementRef<HTMLVideoElement>;

    gifControl(){
    
      this.mouth.nativeElement.addEventListener('mouseenter', this.slowGif.bind(this))
      this.mouth.nativeElement.addEventListener('mouseleave', this.speedGif.bind(this))
      this.mouth.nativeElement.addEventListener('click', this.rewind.bind(this))
    }
    slowGif(){
      this.mouth.nativeElement.playbackRate = .5;
    }
    speedGif(){
      this.mouth.nativeElement.playbackRate = 1;
    }
    rewind(){
      
    }

}
