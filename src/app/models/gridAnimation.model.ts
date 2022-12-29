export class GridAnimationObj {
    name;
    img;
    steps: Array<GridStep>
    constructor(name, img, steps){
        this.name = name;
        this.img = img;

        let tempArr = [];
        steps.forEach(step=>{
            if(step.data){
                let obj = {
                    data: step.data
                }
                tempArr.push(obj)
            } else {
                let obj = {
                    data: step
                }
                tempArr.push(obj)
            }
        })
        this.steps = tempArr;
    }
}

class GridStep {
    data: Array<any>;
    delay: integer;
}