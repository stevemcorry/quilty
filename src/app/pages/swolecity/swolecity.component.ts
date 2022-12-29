import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { ExerciseObj } from 'app/models/exercise.model';

@Component({
  selector: 'app-swolecity',
  templateUrl: './swolecity.component.html',
  styleUrls: ['./swolecity.component.scss']
})
export class SwolecityComponent implements OnInit {

  user;
  muscleGroup: {
    arms: false,
    legs: false,
    shoulders: false,
    chest: false,
    back: false,
    abs: false,
    cardio: false,
  };
  newExercise = new ExerciseObj();
  constructor(public auth:AngularFireAuth) {
    this.auth.authState.subscribe(user => {
      console.log('true user', user)
      if(user){
        this.user = user.uid;
      }
    })

    // this.muscleGroup = fb.group({
    //   arms: false,
    //   legs: false,
    //   shoulders: false,
    // });
    
  }

  ngOnInit() {
  }
  addExercise(){
    console.log('good!')
  }

}
