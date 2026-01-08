import { Component } from '@angular/core';

@Component({
  selector: 'app-christmas-scavenger',
  templateUrl: './christmas-scavenger.component.html',
  styleUrls: ['./christmas-scavenger.component.scss']
})
export class ChristmasScavengerComponent {

    step = 0;
    wrongAnswersReply = [
        "No",
        "Jake, keep going!",
        "Wrong answer, give it another shot!",
        "Not quite, think harder!",
        "That's incorrect, try once more 6!+ch"
    ];
    firstClueInput = "";
    forthClueInput = "";

    nextClue(step: number){
        this.step = step;
    }
    wrongAnswer(){
        //choose a random wrong answer message
        const randomIndex = Math.floor(Math.random() * this.wrongAnswersReply.length);
        alert(this.wrongAnswersReply[randomIndex]);
    }
    checkFirstClueInput(){
        if(this.firstClueInput.toLowerCase() == "paper"){
            this.nextClue(2);
        } else{
            this.wrongAnswer();
        }
    }

    fadeIn = true;
    resetFadeIn() {
        this.fadeIn = false;
        // Force reflow to restart animation
        setTimeout(() => {
            this.fadeIn = true;
        }, 1);
    }

    checkForthClueInput(){
        if(this.forthClueInput.toLowerCase() == "tree"){
            this.nextClue(4);
        } else{
            this.wrongAnswer();
        }
    }
    // Speed run game state
    speedRunClicks = 0;
    lastClickTime: number | null = null;
    speedRunActive = false;
    speedRunMaxDelay = 500; // ms between clicks
    speedRunTarget = 15;
    numberOfTries = 0;

    beginSpeedRun() {
        this.speedRunMaxDelay = 500;
        this.speedRunClicks = 0;
        this.lastClickTime = null;
        this.speedRunActive = true;
    }

    speedRunClick() {
        const now = Date.now();
        if (!this.speedRunActive) return;
        if (this.lastClickTime && now - this.lastClickTime > this.speedRunMaxDelay) {
            this.speedRunClicks = 0;
            this.speedRunFail();
            return;
        }
        this.speedRunMaxDelay *= 0.85;
        this.lastClickTime = now;
        this.speedRunClicks++;
        if (this.speedRunClicks >= this.speedRunTarget) {
            this.speedRunActive = false;
            this.nextClue(19);
        }
    }

    speedRunFail() {
        if(this.numberOfTries >= 10){
            alert("You've exceeded the maximum number of tries. The family is bored, and you're making me sad. Moving to the next clue.");
            this.nextClue(19);
            return;
        }
        alert('Too slow! Try again.');
        this.speedRunActive = false;
        this.step = 4;
        this.numberOfTries++;
    }
}
