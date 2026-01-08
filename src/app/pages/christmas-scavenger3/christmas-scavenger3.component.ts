import { Component } from '@angular/core';

@Component({
  selector: 'app-christmas-scavenger3',
  templateUrl: './christmas-scavenger3.component.html',
  styleUrls: ['./christmas-scavenger3.component.scss']
})
export class ChristmasScavenger3Component {
  // Add logic as needed
    step = 0;
    currentQuestionInput = 0;
    stevePics = 12;
    wrongAnswersReply = [
        "That's incorrect, try once more 6!+ch",
        "Nope, Chuck Testa",
        "Please set a better example for the children."
    ];
    nextClue(step: number){ 
        this.step = step;
    }
    checkCurrentQuestionInput(){
        if(this.currentQuestionInput == 29){
            this.nextClue(2);
        } else if(this.currentQuestionInput == 28){
            alert("Haha I lied on the last slide.");
        } else{
            alert("Wrong answer, try again!");
        }
    }
    wrongAnswer(){
        //choose a random wrong answer message
        const randomIndex = Math.floor(Math.random() * this.wrongAnswersReply.length);
        alert(this.wrongAnswersReply[randomIndex]);
    }

}
