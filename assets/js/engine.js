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
        compreiCard: false
    },
    created(){
        this.newGame()
    },
    methods:{
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
            this.mountCardNormal()
            this.mountCardsEspecial()
            this.gerarMesa()
            this.totalBuy()
            this.mountMyHand()
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
            const id = this.myHand.indexOf(card)
            if(this.myHand[id].number == this.mesa[this.mesa.length - 1].number
              ||
              this.myHand[id].color == this.mesa[this.mesa.length - 1].color
              ){
            this.myHand[id].playing = true
            setTimeout(() => {
                this.myHand.splice(id, 1)
                this.reogarnizarId()
                this.mesa.push(card)
            },300);
           }
        },
        reogarnizarId(){
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
                console.log(arrayTemp[i].number)
            }
            this.myHand = myHandTemp
        },
        buyCard(){
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
})