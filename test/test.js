const util = require('./util.js');
const data = require('./data.js');
var football = artifacts.require("Football");
contract("football", function(accounts) {
    async function deployContract() {
        football = await football.new();
    }

    function sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }
    

    describe("test admin", function() {
        before(deployContract);
        it("test admin" ,async function(){
            var admin = await football.get_admin();
            console.log("admin",admin);
        })
    })

    describe("test user", function() {
        it("test login" ,async function(){
            var user = await football.user_login();
            console.log("login",user);
        })
        it("test register" ,async function(){
            await football.user_register();
            await football.user_register({from:accounts[1]});
        })

        it("test login again" ,async function(){
            var user = await football.user_login();
            console.log("login",user);
        })
        
        it("buy power" ,async function(){
            await football.buy_power(5);
            var user = await football.user_login();
            console.log("last time",user[2]);
            console.log("power",user[3]);
        })

    })

    describe("test card", function() {

        it("get team" ,async function(){
            var team = await football.get_user_team(accounts[0]);
            for(var i=0;i<5;i++){
                var card = await football.get_card_info(team[i]);
                var player = data.get_player(card[2]);
                var vip = await football.judge_card_vip(card[0]);
                console.log("第",i,"个卡牌");
                console.log("card:",card);
                console.log("player: ",player);
                console.log("vip:",vip);
            }
        })
        it("氪金 " ,async function(){
            await football.buy_common_card(10);
            await football.buy_vip_card(1);
        })
        it("get_user_all_card" ,async function(){
            var card = await football.get_user_all_card();
            for(var i=0;i<card[1];i++){
                console.log(card[0][i]);
            }
        })

        it("change_team" ,async function(){
            await football.change_team(1,11);
            var team = await football.get_user_team(accounts[0]);
            console.log("new team",team);
        })

        it("sale a card" ,async function(){
            await football.sale_card(1,6);
        })

        it("get_all_card_on_market" ,async function(){
            var card = await football.get_all_card_on_market();
            for(var i=0;i<card[1];i++){
                console.log("市场:",card[0][i]);
            }
        })

        it("buy card from market " ,async function(){
            var card_1 = await football.get_user_all_card({from:accounts[1]});
            for(var i=0;i<card_1[1];i++){
                console.log("card of user 1",card_1[0][i]);
            }
            await football.buy_card(1,7,{from:accounts[1]})
            var card = await football.get_all_card_on_market();
            console.log("市场上card数量为",card[1]);
            var card_0 = await football.get_user_all_card({from:accounts[0]});
            var card_1 = await football.get_user_all_card({from:accounts[1]});
            for(var i=0;i<card_0[1];i++){
                console.log("card of user 0",card_0[0][i]);
            }
            for(var i=0;i<card_1[1];i++){
                console.log("card of user 1",card_1[0][i]);
            }
   
        })

      

    })
   
})