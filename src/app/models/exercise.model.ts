export class ExerciseObj {
    uid: string;
    exerciseName: string;
    muscleGroup: Array<string>;
    constructor(uid: string = null, exerciseName:string = null, muscleGroup:Array<string> = null){
        this.uid = uid;
        this.exerciseName = exerciseName;
        this.muscleGroup = muscleGroup
    }
}