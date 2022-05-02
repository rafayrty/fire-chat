export default class Input{
    private input:HTMLInputElement;
    constructor(){
       this.input =  this.initlalize()
    }
    
    initlalize(){
        let input = document.querySelector('input')!;
        return input;
    }

    sendAnimate(){
        this.input.addEventListener('input',(e)=>{
            console.log(e)
        })
    }
}