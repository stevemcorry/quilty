export class SeshExercise {
    exerciseId: string;
    exerciseName: string;
    muscleGroup: string;
    sets: Array<Sets>
    constructor( exerciseId: string = null, exerciseName: string = null, muscleGroup: string = null, sets: Array<Sets> = []){
        this.exerciseId = exerciseId;
        this.exerciseName = exerciseName;
        this.muscleGroup = muscleGroup;
        this.sets = sets;
    }
}


export class Sets {
    reps: number;
    weight: number;
    constructor(reps: number = null, weight: number = null){
        this.reps = reps;
        this.weight = weight;
    }
}