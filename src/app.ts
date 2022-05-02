import Input from './classes/input';
class Chat{

    private input:Input;

    constructor(){
        this.input = new Input()
        this.resizeChatWindow();
        window.addEventListener('resize',()=>{
            this.resizeChatWindow();
        })
    }

    resizeChatWindow(){
        let header = document.querySelector('header')!;
        let { height:headerHeight } = header.getBoundingClientRect();

        let footer = document.querySelector('footer')!;
        let { height:footerHeight } = footer.getBoundingClientRect();
        
        let chatHeight = window.innerHeight - (headerHeight + footerHeight);

        let main = document.querySelector('main')!;
        main.style.height = chatHeight.toString() + "px";
        console.log(chatHeight.toString(),main);
    }

}


let chat = new Chat();

