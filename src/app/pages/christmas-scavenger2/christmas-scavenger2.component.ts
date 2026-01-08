import { Component } from '@angular/core';

@Component({
  selector: 'app-christmas-scavenger2',
  templateUrl: './christmas-scavenger2.component.html',
  styleUrls: ['./christmas-scavenger2.component.scss']
})
export class ChristmasScavenger2Component {

    step = 0;
    annoyStepCount = 0;

    randomMathQuestion = "";
    mathTimer = 3; //seconds
    mathTimeout: any = null;
    mathChoices: number[] = [];
    correctMathAnswer: number = 0;

    nextClue(step: number){
        this.step = step;
        if(step === 4){
            this.generateRandomMathProblem();
        }
    }
    annoyStep(){
        this.annoyStepCount++;
    }
    generateRandomMathProblem() {
        this.mathTimer = 2;
        if (this.mathTimeout) {
            clearTimeout(this.mathTimeout);
        }
        const num = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        const num2 = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
        this.correctMathAnswer = num * num2;
        this.randomMathQuestion =  `${num} × ${num2} = ?`;
        // Generate 5 random wrong answers
        const choices = new Set<number>();
        choices.add(this.correctMathAnswer);
        while (choices.size < 6) {
            const wrongNum = Math.floor(Math.random() * (15 - 8 + 1)) + 8;
            const wrongAnswer = wrongNum * wrongNum;
            if (wrongAnswer !== this.correctMathAnswer) {
                choices.add(wrongAnswer);
            }
        }
        this.mathChoices = Array.from(choices).sort(() => Math.random() - 0.5);
        // Start timer
        this.mathTimeout = setTimeout(() => {
            alert('Too slow! Try again.');
            this.generateRandomMathProblem();
        }, this.mathTimer * 1000);
    }

    answerMathQuestion(ans: number, step: number) {
        if (this.mathTimeout) {
            clearTimeout(this.mathTimeout);
        }
        if (ans === this.correctMathAnswer) {
            clearTimeout(this.mathTimeout);
            alert('Correct!');
            this.nextClue(step);
            if(step !== 7) {
                this.generateRandomMathProblem();
            }
        } else {
            alert('Nope! Try again.');
            this.generateRandomMathProblem();
        }
    }
}
