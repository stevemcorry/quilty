import { SeshExercise } from './seshExercise.model';
export class Workout {
    uid: string;
    seshName: string;
    exercises: Array<SeshExercise>;
    createdAt: Date;
    constructor(uid: string = null, seshName: string = null, exercises: Array<SeshExercise> = [], createdAt: Date = null){
        this.uid = uid;
        this.seshName = seshName;
        this.exercises = exercises;
        this.createdAt = createdAt;

    }
}