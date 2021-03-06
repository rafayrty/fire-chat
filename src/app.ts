import Input from './classes/input';
import Database from './classes/firebase';
import {
    ref,
    set,
    serverTimestamp,
    onValue,
    query,
} from "firebase/database"
import Auth from './classes/auth';
interface message {
    name: string,
        message: string,
        createAt: number,
        date: string
}
class Chat {

    private input: Input;
    private auth: Auth;

    constructor() {
        this.input = new Input()
        this.resizeChatWindow();
        window.addEventListener('resize', () => {
            this.resizeChatWindow();
        })
        this.sendMessageListener();
        this.auth = new Auth();

        if (this.auth.fetchUser() === null) {
            let r = (Math.random() + 1).toString(36).substring(7);
            let name = prompt("What is Your Name?", "guest-" + r);
            if (name !== '' && name !== null){
                localStorage.setItem("user", name);
                this.fetchMessages();
            }
        }else{
            this.fetchMessages();
        }

    }

    fetchMessages() {
        let html: string = ``;
        const mostViewedPosts = query(ref(Database, 'messages'));
        let messages: message[] = [];
        let dates: string[] = [];
        let notif:boolean = false;

        
        //Firebase Fetching Starts
        onValue(mostViewedPosts, (snapshot) => {
            this.input.inputValue = '';
            html = ``;
            messages = [];
            dates = [];
            const data = snapshot.val();
            let played = false;
            for (const key in data) {
                messages.push({
                    message: data[key]['message'],
                    name: data[key]['name'],
                    createAt: data[key]['createAt'],
                    date: new Date(data[key]['createAt']).toLocaleDateString('en-US', {
                        month: '2-digit',
                        day: "2-digit",
                        year: "numeric"
                    })
                })
                // if(data[key]['name']!==this.auth.fetchUser() && notif!==false){
                //     if(played===false){
                //         var audio = new Audio('notif.mp3');
                //         audio.play();
                //     }
                // }

                dates.push(new Date(data[key]['createAt']).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: "2-digit",
                    year: "numeric"
                }));
                played = true;

            }
            notif = true;
            dates = [...new Set(dates)];

            dates.forEach(date => {
                let data = messages.filter((msg: message) => msg.date == date)
                html += `
        <div class="date">
            ${date}
         </div>`;

         

                data.forEach((msg: message) => {
                    html += `<div class="msg ${msg.name===this.auth.fetchUser() ? 'sender' : 'receiver'}">

         ${msg.name===this.auth.fetchUser() ? '': ` <div class="msg-avatar">
         <img src="/avatar.png" alt="">
     </div>

     <svg id="tip" width="10" height="12" viewBox="0 0 10 12" fill="none"
         xmlns="http://www.w3.org/2000/svg">
         <path
             d="M9 0C9 0 3.26206 0 1.8 0C0.33795 0 3.14713e-05 1.5 1.35003 3C2.70003 4.5 8.50063 9.5 9 11C9.49936 12.5 9 0 9 0Z"
             fill="#F2F2F7" />
         </svg>` }
            <div class="msg-content">
                <div class="msg-text">
                    ${msg.message}	
                </div>
                <div class="msg-info">
                    <div class="msg-info__time">
                       ${new Date(msg.createAt).toLocaleTimeString([],{hour: '2-digit', minute: '2-digit'})}
                    </div>
                    <div class="msg-info__receipt">

                        <svg width="18" height="10" viewBox="0 0 18 10" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <path d="M11.7931 1.00041L4.63338 8.87892L1.142 5.5396" stroke="#81E299"
                                stroke-linecap="round" stroke-linejoin="round" />
                            <path d="M16.7401 0.999996L9.57997 8.87892L6.98385 6.42003" stroke="#81E299"
                                stroke-linecap="round" stroke-linejoin="round" />
                        </svg>

                    </div>
                </div>
            </div>

            ${msg.name===this.auth.fetchUser() ?

            `<svg id="tip" width="10" height="12" viewBox="0 0 10 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M1 0C1 0 6.73794 0 8.2 0C9.66205 0 9.99997 1.5 8.64997 3C7.29997 4.5 1.49937 9.5 1 11C0.500641 12.5 1 0 1 0Z"
                    fill="#007AFF" />
            </svg>`: '' }

        </div>


            `;
                })
            })
            let chatUI = document.querySelector('.chat-ui') !;
            chatUI.innerHTML = html;
            let element = document.querySelector('main')!;
            element.scrollTop = element.clientHeight;
            console.log(element.clientHeight);
            // })
        });

        // window.scrollTo(0, document.body.scrollHeight);

    }

    resizeChatWindow() {
        let header = document.querySelector('header') !;
        let { height: headerHeight } = header.getBoundingClientRect();

        let footer = document.querySelector('footer') !;
        let { height: footerHeight } = footer.getBoundingClientRect();

        let chatHeight = window.innerHeight - (headerHeight + footerHeight);

        let main = document.querySelector('main') !;
        main.style.height = chatHeight.toString() + "px";
    }

    sendMessageListener() {

        let send = document.querySelector('#send') !as HTMLElement;
        send.addEventListener('click', () => {
            this.sendMessage();
            this.input.sendSVG();
        })


    }
    sendMessage(){
      
        let r = (Math.random() + 1).toString(36).substring(7);
        let message = this.input.inputValue;
        if (message === '') return
        const timestamp = Date.now();
        set(ref(Database, "messages/" + timestamp), {
            createAt: serverTimestamp(),
            name: this.auth.fetchUser(),
            message,
        });
        window.scrollTo(0, document.body.scrollHeight);

    }

}


let chat = new Chat();

