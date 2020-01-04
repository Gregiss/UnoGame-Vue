const playAudio = new Audio('./assets/sound/taking_card.wav');

console.log("UNO v0.1")
console.log("UNO ENGINE v0.1")

const engine = new Vue({
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
        trocouDeSentido: false,
        modal: false,
        modalTitle: "",
        pause: false,
        loading: false,
		playing: false,
		jogueiCarta: false
    },
    created(){
        this.loading = true
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
                    {"type": "reverse", "number": 'Draw', "color": this.colors[i].color}
                )
            }
            for(var i = 0; i < 4; i++){
                this.cards.push(
                    {"type": "reverse", "number": 'Skip', "color": this.colors[i].color}
                )
            }
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
            this.modal = false
            this.sentido = 0
            this.mountCardNormal()
            this.mountCardsEspecial()
            this.gerarMesa()
            this.totalBuy()
            this.mountMyHand()
            this.botIniciar()
            this.verficarSeGanharam()
            this.pause = false
			this.vez = -1
        },
        hoverCard(card){
            const id = this.myHand.indexOf(card)
            this.myHand[id].hover = true
        },
        gerarMesa(){
			this.mesa = []
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
			if(!this.jogueiCarta){
			this.jogueiCarta = true
            const id = this.myHand.indexOf(card)
            if(this.myHand[id].number == this.mesa[this.mesa.length - 1].number
              ||
              this.myHand[id].color == this.mesa[this.mesa.length - 1].color
              ||
              this.myHand[id].number == "Wild_Draw"
              ){
            this.myHand[id].playing = true
            playAudio.play()
            setTimeout(() => {
                this.mesa.push(card)
                this.myHand.splice(id, 1)
                this.reogarnizarId()  
                this.passarVez()
            },300);  
			  }
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
                    {
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color
                    }
                )
            }
			this.mesa.pop()
        },
        compra4(){
            for(var i = 0; i < 4; i++){
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
                this.bots[0].cards.push(
                    {
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color
                    }
                )
            }
        },
        passarVez(){
            this.quantasComprei = 0
            this.pulouVez = false
            if(this.mesa[this.mesa.length - 1].number === "Skip"){
                this.vez = 1
                this.pulouVez = true
				this.mesa.pop()
                this.botJogar()
            }
            else if(this.mesa[this.mesa.length - 1].number === "Draw"){
                this.compraDuas()
                this.vez = 1
                this.pulouVez = true
				this.mesa.pop()
                this.botJogar()
            }
            
            if(!this.pulouVez){
            setTimeout(() => {
  
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
				this.jogueiCarta = false
            }
            },1000);
         }
        },
        verficarSeGanharam(){
            const verificando = setInterval(() => {
                if(this.myHand.length == 0){
                    this.modal = true
                    this.modalTitle = "Você ganhou, parabéns"
                    this.pause = true
                    clearInterval(verificando)
                }
                else if(this.bots[0].cards.length == 0){
                        this.modal = true
                        this.modalTitle = "Você perdeu, que pena :/"
                        this.pause = true
                        clearInterval(verificando)
                    } 
                else if(this.bots[1].cards.length == 0){
                        this.modal = true
                        this.modalTitle = "Você perdeu, que pena :/"
                        this.pause = true
                        clearInterval(verificando)
                    } 
                else if(this.bots[2].cards.length == 0){
                        this.modal = true
                        this.modalTitle = "Você perdeu, que pena :/"
                        this.pause = true
                        clearInterval(verificando)
                    } 
            }, 400)
        },
        naoQueroJogar(){
            this.vez = 0
            this.botJogar()
        },
        botJogar(){
            if(!this.pause){
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
				 const cardRandom = Math.floor(Math.random() * this.cards.length)
					while(this.cards[cardRandom].number == "Wild_Draw" 
					|| 
					this.cards[cardRandom].number == "Skip"
					|| 
					this.cards[cardRandom].number == "Draw"
					|| 
					this.cards[cardRandom].number == "Reverse"){
						cardRandom = Math.floor(Math.random() * this.cards.length)
					}
				 this.bots[this.vez].cards.push(
                    {
                    "number": this.cards[cardRandom].number,
                    "color": this.cards[cardRandom].color
                    }
                 )
                 this.passarVez()
               }
            }
        }
        }
    }
})