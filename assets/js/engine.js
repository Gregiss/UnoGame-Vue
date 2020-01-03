const app = new Vue({
    el: "#app",
    data:{
        colors: [
            {"color" : "Blue"},
            {"color" : "Green"},
            {"color" : "Red"},
            {"color" : "Yellow"}
        ],
        cards: [],
        myHand: [],
        mesa: [],
        buy: [],
        buyCardCard: {"type": "reverse", "number": '1', "color": 'Blue'},
        compreiCard: false,
        bots: [],
        quantasComprei: 0,
        vez: -1,
        pulouVez: false,
        sentido: null,
        trocouDeSentido: false
    },
    created(){
        this.newGame()
    },
    methods:{
        botIniciar(){
            this.bots = []
            for(var i = 0; i < 3; i++){
                this.bots.push({
                    "name": "",
                    "cards": []
                })
            }
            for(var i = 0; i < 3; i++){
            for(var b = 0; b < 5; b++){
                var cardRandom = Math.floor(Math.random() * this.cards.length)
                while(this.cards[cardRandom].number == "Wild_Draw" 
                || 
                this.cards[cardRandom].number == "Skip"
                || 
                this.cards[cardRandom].number == "Draw"
                || 
                this.cards[cardRandom].number == "Reverse"){
                    cardRandom = Math.floor(Math.random() * this.cards.length)
                }
                this.bots[i].cards.push(
                    {"id": this.bots[i].cards.length+1,
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color,
                    "hover": false,
                    "playing": false
                    }
                )
            }
          }
        },
        totalBuy(){
            this.buy = []
            for(var i= 0; i < 30; i++){
                this.buy.push(i)
            }
        },
        mountCardsEspecial(){
            for(var i = 0; i < 4; i++){
                this.cards.push(
                    {"type": "reverse", "number": 'Reverse', "color": this.colors[i].color}
                )
            }
            for(var i = 0; i < 4; i++){
                this.cards.push(
                    {"type": "reverse", "number": 'Draw', "color": this.colors[i].color}
                )
            }
            for(var i = 0; i < 4; i++){
                this.cards.push(
                    {"type": "reverse", "number": 'Skip', "color": this.colors[i].color}
                )
            }
            this.cards.push(
                {"type": "reverse", "number": 'Wild_Draw'}
            )
        },
        mountCardNormal(){
            this.cards = []
            for(var i = 0; i < 4; i++){
                for(var b = 0; b <= 9; b++){
                    this.cards.push(
                        {"type": "normal", "number": b, "color": this.colors[i].color}
                    )
                }
            }
        },
        mountMyHand(){
            this.myHand = []
            for(var i =0; i < 5; i++){
                const cardRandom = Math.floor(Math.random() * this.cards.length)
                this.myHand.push(
                    {"id": this.myHand.length+1,
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color,
                    "hover": false,
                    "playing": false
                    },
                )
            }
        },
        newGame(){
            this.sentido = 0
            this.mountCardNormal()
            this.mountCardsEspecial()
            this.gerarMesa()
            this.totalBuy()
            this.mountMyHand()
            this.botIniciar()
        },
        hoverCard(card){
            const id = this.myHand.indexOf(card)
            this.myHand[id].hover = true
        },
        gerarMesa(){
            var cardRandom = Math.floor(Math.random() * this.cards.length)
            while(this.cards[cardRandom].number == "Wild_Draw" 
            || 
            this.cards[cardRandom].number == "Skip"
            || 
            this.cards[cardRandom].number == "Draw"
            || 
            this.cards[cardRandom].number == "Reverse"){
                cardRandom = Math.floor(Math.random() * this.cards.length)
            }
            this.mesa.push(
                {"id": this.myHand.length+1,
                "number": this.cards[cardRandom].number,
                "color": this.cards[cardRandom].color,
                "hover": false,
                "playing": false
                },
            )
        },
        saiuCard(card){
            const id = this.myHand.indexOf(card)
            this.myHand[id].hover = false
        },
        playCard(card){
            if(this.vez == -1){
            const id = this.myHand.indexOf(card)
            if(this.myHand[id].number == this.mesa[this.mesa.length - 1].number
              ||
              this.myHand[id].color == this.mesa[this.mesa.length - 1].color
              ){
            this.myHand[id].playing = true
            setTimeout(() => {
                this.mesa.push(card)
                this.myHand.splice(id, 1)
                this.reogarnizarId()  
                this.passarVez()
            },300);  
           }
        }
        },
        reogarnizarId(){
            if(this.vez == -1){
            var myHandTemp = []
            const arrayTemp = this.myHand
            for(var i = 0; i < this.myHand.length; i++){
                myHandTemp.push(
                    {"id": i + 1,
                    "number": arrayTemp[i].number,
                    "color": arrayTemp[i].color,
                    "hover": false,
                    "playing": false
                    },
                )
            }
            this.myHand = myHandTemp
        }
        },
        reogarnizarIdBot(){
            var myHandTemp = []
            const arrayTemp = this.bots[this.vez]
            for(var i = 0; i < this.myHand.length; i++){
                myHandTemp.cards.push(
                    {"id": i + 1,
                    "number": arrayTemp.cards[i].number,
                    "color": arrayTemp.cards[i].color,
                    "hover": false,
                    "playing": false
                    },
                )
            }
            this.bots[this.vez] = botHandTemp
        },
        buyCard(){
            if(this.vez == -1){
            if(this.quantasComprei == 0){
            this.quantasComprei = 1;
            this.compreiCard = true
            const cardRandom = Math.floor(Math.random() * this.cards.length)
            this.buyCardCard = this.cards[cardRandom]
            setTimeout(() => {
                this.myHand.push(
                    {"id": this.myHand.length+1,
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color,
                    "hover": false,
                    "playing": false
                    },
            )
            this.reogarnizarId()
            this.buy.shift()
            this.compreiCard = false
            },300);
         }
        }
        },
        compraDuas(){
            for(var i = 0; i < 2; i++){
                var cardRandom = Math.floor(Math.random() * this.cards.length)
                while(this.cards[cardRandom].number == "Wild_Draw" 
                || 
                this.cards[cardRandom].number == "Skip"
                || 
                this.cards[cardRandom].number == "Draw"
                || 
                this.cards[cardRandom].number == "Reverse"){
                    cardRandom = Math.floor(Math.random() * this.cards.length)
                }
                this.bots[this.vez + 1].cards.push(
                    {"id": this.bots[i].cards.length+1,
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color,
                    "hover": false,
                    "playing": false
                    }
                )
            }
        },
        passarVez(){
            this.quantasComprei = 0
            this.pulouVez = false
            if(this.mesa[this.mesa.length - 1].number === "Skip"){
                if(this.sentido == 0){
                this.vez += 2
                } else{
                    this.vez = 1
                }
                this.pulouVez = true
                this.botJogar()
            }
            else if(this.mesa[this.mesa.length - 1].number === "Draw"){
                this.compraDuas()
                this.reogarnizarIdBot()
                if(this.sentido == 0){
                    this.vez += 1
                } else{
                    this.vez = 1
                }
                this.pulouVez = true
            }
            else if(this.mesa[this.mesa.length - 1].number === "Reverse"){
                if(this.vez == -1){
                    if(this.sentido == 0){
                        this.sentido = 1
                    } else{
                        this.sentido = 0
                    }
                }
            }
            
            if(!this.pulouVez){
            setTimeout(() => {
            if(this.sentido = 0){
            if(this.vez == -1){
                this.vez = 0
                this.botJogar()
            } else if(this.vez == 0){ 
                this.vez = 1
                this.botJogar()
            } else if(this.vez == 1){
                this.vez = 2
                this.botJogar()
            } else if(this.vez == 2){
                this.vez = -1
            }
           } else{
            if(this.vez == -1){
                this.vez = 2
                this.botJogar()
            } else if(this.vez == 0){ 
                this.vez = -1
            } else if(this.vez == 1){  
                this.vez = 0 
                this.botJogar()
            } else if(this.vez == 2){
                this.vez = 1
                this.botJogar()
            }
           }
            },1500);
         }
        },
        botJogar(){
            if(this.vez !== -1){
                var id = Math.floor(Math.random() * this.bots[this.vez].cards.length)
                var tentativas = 0;
                while(tentativas < 3){
                    if(this.bots[this.vez].cards[id].number == this.mesa[this.mesa.length - 1].number
                        ||
                        this.bots[this.vez].cards[id].color == this.mesa[this.mesa.length - 1].color
                        ){
                            break;
                        } else{
                        tentativas++
                        id = Math.floor(Math.random() * this.bots[this.vez].cards.length)
                        }
                }
                if(this.bots[this.vez].cards[id].number === this.mesa[this.mesa.length - 1].number
                  ||
                  this.bots[this.vez].cards[id].color === this.mesa[this.mesa.length - 1].color
                  ){
                    console.log("tem")
                setTimeout(() => {
                    this.mesa.push(this.bots[this.vez].cards[id])
                    this.bots[this.vez].cards.splice(id, 1)
                    this.passarVez()
                },300);
               } else{
                 console.log("n tem")
                 this.passarVez()
               }
        }
        }
    }
})