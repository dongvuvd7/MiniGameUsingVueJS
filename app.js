new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        gameIsRunning: false,
        turns: [],

    },
    methods: {
        startNewGame: function(){
            this.gameIsRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns =  [];
        },
        attack: function(){
            //monster
            if(this.checkPlayerOption()){
                return;
            }
            this.monsterAttacks();

            //player
            var damage1 = this.inputDamage(4, 10);
            this.monsterHealth -= damage1;
            this.turns.unshift({
                 isPlayer : true,
                textLog: 'Player hits monster for ' + damage1,
            });
            this.checkPlayerOption();

        },
        specialAttack: function(){
            if(this.checkPlayerOption()){
                return;
            }
            this.monsterAttacks();

            //player
            var damage1 = this.inputDamage(10, 20);
            this.monsterHealth -= damage1;
            this.turns.unshift({
                 isPlayer : true,
                textLog: 'Player hits monster for ' + damage1,
            });
            this.checkPlayerOption();
        },
        heal: function(){
            if(this.playerHealth > 60){
                 alert('Health > 60 cannot using heal');
                 return false;
            }
            else if(this.playerHealth < 40){
                var buff = this.inputDamage(30, 40);
                this.playerHealth += buff;
                this.turns.unshift({
                   isPlayer : true,
                   textLog: 'Player buff ' + buff,
               });
            }
            else{
                this.playerHealth = 60;
                this.turns.unshift({
                   isPlayer : true,
                   textLog: 'Player buff to 60 health',
               });
            }
            this.monsterAttacks();
        },
        giveUp: function(){
            this.gameIsRunning = false;
            alert('You were give up');
            this.turns = [];
            this.playerHealth = 100;
            this.monsterHealth = 100;
        },
        monsterAttacks: function(){
            var damage = this.inputDamage(4, 10);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer : false,
                textLog: 'Monster hits player for ' + damage,
            });
            this.checkPlayerOption();
        },
        inputDamage: function(minDamage, maxDamage){
            return Math.max(Math.floor(Math.random() * maxDamage) +1, minDamage);
        },
        checkPlayerOption: function() {
            if(this.monsterHealth <= 0){
                if(confirm('You won! Play a new game ?')){
                    this.startNewGame();
                    // this.gameIsRunning = true;
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            }
            else if(this.playerHealth <= 0) {
                if(confirm('You lost! Play a new game ?')){
                    this.startNewGame();
                    // this.gameIsRunning = true;
                } else {
                    this.gameIsRunning = false;
                }
                return true;
            } 
            return;
        }
    },
});