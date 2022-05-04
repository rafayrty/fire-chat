export default class Input{
    private input:HTMLInputElement;
    constructor(){
       this.input =  this.initlalize()
       this.sendAnimate();
    }
    
    initlalize(){
        let input = document.querySelector('input')!;
        return input;
    }

    sendAnimate(){
        this.input.addEventListener('input',(e)=>{
            this.sendSVG();
        })
        let send = document.getElementById('send')! as HTMLElement;

        this.input.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              send.dispatchEvent(new Event('click'));
            }
          });

    }
    get inputValue(){
        return this.input.value;
    }
    set inputValue(value){
        this.input.value = value
    }
    sendSVG(){
        let path = document.querySelector("#sendpath")! as HTMLElement;
        if(this.input.value!==''){
            path.style.fill = "#007AFF";
        }else{
            path.style.fill = "#8E8E93";
        }
    }
}