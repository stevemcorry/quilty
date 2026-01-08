export enum SunAmmount {
	Full = '6+ hours direct sun',
    PartialSun = '3-6 hours direct sun',
    PartialShade = '3-6 hours no harsh sun',
    FullShade = '< 3 hours direct sun'
}
export class Img{
    url: string;
    date: string;
    constructor(url = "", date = new Date().toDateString()){
      this.url = url;
      this.date = date;
    }
}
export class WaterLog{
    date: string;
    fertilizer: boolean;
    constructor(date = new Date().toDateString(), fertilizer = false){
        this.date = date;
        this.fertilizer = fertilizer
    }
}
export class Plant{

    key: string; //
    name: string; //
    care: string; //
    img: Img; //
    imgLog: Array<Img>; //
    lastWater: WaterLog; //
    waterLog: Array<WaterLog>; //
    active: boolean; //
    birthdate: string;
    wateringNotes: string;
    sunAmmount: SunAmmount;
    waterFrequency: number;
    soilType: string;

    constructor(key, name, care = "", img:Img = new Img(), imgLog = [], lastWater = null, waterLog = [], active = true, birthdate = new Date().toDateString(), wateringNotes = "", sunAmmount = SunAmmount.PartialSun, waterFrequency = 7, soilType = ""){
        this.key = key;
        this.name = name;
        this.care = care;
        this.img = img;
        this.imgLog = imgLog;
        this.active = active;
        this.birthdate = birthdate;
        this.wateringNotes = wateringNotes;
        this.sunAmmount = sunAmmount;
        this.waterFrequency = waterFrequency;
        this.soilType = soilType;
        if(typeof lastWater == "string"){
            this.lastWater = new WaterLog(lastWater);
        } else {
            this.lastWater = lastWater
        }
        if(waterLog[0] && typeof waterLog[0] == "string"){
            this.waterLog = waterLog.map((log)=>{
                return new WaterLog(log);
            })
        } else {
            this.waterLog = waterLog;
        }
    }
}