import { defineStore } from 'pinia';

interface AnimateState{
    isStep:boolean;
    mode:number;
    isStepFinished:boolean;
    isNext:boolean;
}

const numOfMode = 2;

export const useAnimateStore = defineStore({
    id: 'animate',
    state: ():AnimateState => ({
        isStep:true,
        mode:0,
        isStepFinished:true,
        isNext:false
    }),
    actions:{
        changeMode(){
            this.mode = (this.mode + 1) % numOfMode;
            if(this.mode === 0) {
                this.isStep = true;
            }
            else{
                this.isStep = false;
            }
        },
        nextStep(){
            this.isStepFinished = false;
            this.isNext = true;
        },
        finishedStep(){
            this.isNext = false;
            this.isStepFinished = true;
        }
    }
});