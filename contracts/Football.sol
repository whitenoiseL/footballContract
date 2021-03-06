/**
    不写注释的 jj.length-=18cm
 */
pragma solidity >=0.4.21;

contract Football {

    address public admin;
    uint256 public userMap_cnt;
    uint256 public common_count;
    uint256 public vip_count;
    uint256 public rankMap_cnt;
    uint256 public cardMap_cnt;
    uint256 public power_count;
    uint256 public matchMap_cnt;
    uint256 public saleCardMap_cnt;
    uint256 public common_card_price = 1;
    uint256 public vip_card_price = 1;
    uint256 public power_price=5;

    mapping(uint256=>uint256) public user_map;//根据玩家address找玩家id，一律用user_id不用address
    mapping(uint256=>uint256) public contest_map;//根据比赛id找卡牌id，这个数据结构没什么卵用
    
    Card[] public card_list;//游戏中全部卡牌，索引即id
    User[] public user_list;//游戏中全部玩家，索引即id
    Contest[] public contest_list;//游戏中全部比赛，索引即id


    mapping(uint256=>uint256[]) public user_contest_map;//某个玩家的比赛记录,返回比赛记录的id
    mapping(uint256=>uint256[]) public user_card_map;//某个玩家的全部卡牌，返回卡牌的id
    mapping(uint256=>uint256[]) public user_team_map;//某个玩家的当前队伍，返回队伍中card的id
    mapping(uint256=>uint256[]) public onmarket_map;//转会市场在售卡牌

    event Transfer(address indexed _from, address indexed _to, uint256 _value);
    //卡牌：id，所有者，球员id，胜场数（用于计算属性），是否在售
    struct Card { 
        uint256  card_id;
        uint256  owner_id;
        uint256  player_id;
        uint256  level;
        bool  on_market;
        uint256 card_price;
    }

    //用户信息：地址，是否抽过免费卡(默认true），卡数量，卡list,上次登录时间，体力值，比赛数，比赛列表，球队成员
    struct User {
        address user_address;
        uint256 last_time;
        uint256 power;
        uint256 user_card_cnt;
        uint256 user_contest_cnt;
    }

    //比赛：我的地址，挑战者地址，我的分数，对方分数，成长值
    struct Contest {
        uint256 my_id;
        uint256 challenger_id;
        uint256 my_score;
        uint256 challenger_score;
        uint256 team_point;
    }

    constructor() public{
        admin = address(0);
        userMap_cnt = 1;
        common_count = 1;
        vip_count = 1;
        rankMap_cnt = 1;
        cardMap_cnt = 1;
        power_count = 1;
        matchMap_cnt = 1;
        saleCardMap_cnt = 1;
        common_card_price = 3;
        vip_card_price = 1;
        power_price = 1;
        User memory user = User(address(0),now,0,0,0);
        user_list.push(user);
        Card memory card = Card(0,0,0,0,false,0);
        card_list.push(card);
            
    }
     
    //生成随机数，左闭右开
    function random(uint256 begin,uint256 end) public view returns(uint256) {
        uint256 number = uint256(keccak256(abi.encodePacked(abi.encodePacked(now),msg.sender,block.difficulty))) % (end-begin);
        return number+begin;
    }

    function salt_random(uint256 begin,uint256 end,uint256 salt) public view returns(uint256) {
        uint256 number = uint256(keccak256(abi.encodePacked(abi.encodePacked(now),msg.sender,block.difficulty,salt))) % (end-begin);
        return number+begin;
    }

    function get_matchMap_cnt() public view returns(uint256) {
        return matchMap_cnt;
    }

    function get_address() public view returns(address) {
        return msg.sender;
    }

    function get_userMap_cnt() public view returns(uint256) {
        return userMap_cnt;
    }

    function get_cardMap_cnt() public view returns(uint256) {
        return cardMap_cnt;
    }
    
    function get_vip_count() public view returns(uint256) {
        return vip_count;
    }

    function get_common_count() public view returns(uint256) {
        return common_count;
    }

    function get_power_count() public view returns(uint256) {
        return power_count;
    }

    function get_saleCardMap_cnt() public view returns(uint256) {
        return saleCardMap_cnt;
    }
    
    function random_all_card() public view returns(uint256) {
        return uint256(random(1,301));
    }

    function random_goalkeeper_card(uint256 salt) public view returns(uint256) {
        uint16[61] memory goalKeeperList = [62 , 63 , 64 , 65 , 66 , 67 , 68 , 69 , 70 , 71 , 72 , 73 , 74 , 75 , 76 , 77 , 78 , 79 , 80 , 81 , 171 , 178 , 179 , 180 , 185 , 186 , 187 , 188 , 189 , 190 , 191 , 192 , 193 , 197 , 198 , 199 , 202 , 203 , 204 , 208 , 214 , 215 , 218 , 221 , 222 , 223 , 226 , 227 , 229 , 251 , 252 , 270 , 277 , 280 , 283 , 287 , 290 , 291 , 292 , 295 , 299];
        return goalKeeperList[salt_random(0, goalKeeperList.length,salt)];
    }

    function random_not_goalkeeper_card(uint256 salt) public view returns(uint256) {
        uint16[239] memory notGoalKeeperList =[1 , 2 , 3 , 4 , 5 , 6 , 7 , 8 , 9 , 10 , 11 , 12 , 13 , 14 , 15 , 16 , 17 , 18 , 19 , 20 , 21 , 22 , 23 , 24 , 25 , 26 , 27 , 28 , 29 , 30 , 31 , 32 , 33 , 34 , 35 , 36 , 37 , 38 , 39 , 40 , 41 , 42 , 43 , 44 , 45 , 46 , 47 , 48 , 49 , 50 , 51 , 52 , 53 , 54 , 55 , 56 , 57 , 58 , 59 , 60 , 61 , 82 , 83 , 84 , 85 , 86 , 87 , 88 , 89 , 90 , 91 , 92 , 93 , 94 , 95 , 96 , 97 , 98 , 99 , 100 , 101 , 102 , 103 , 104 , 105 , 106 , 107 , 108 , 109 , 110 , 111 , 112 , 113 , 114 , 115 , 116 , 117 , 118 , 119 , 120 , 121 , 122 , 123 , 124 , 125 , 126 , 127 , 128 , 129 , 130 , 131 , 132 , 133 , 134 , 135 , 136 , 137 , 138 , 139 , 140 , 141 , 142 , 143 , 144 , 145 , 146 , 147 , 148 , 149 , 150 , 151 , 152 , 153 , 154 , 155 , 156 , 157 , 158 , 159 , 160 , 161 , 162 , 163 , 164 , 165 , 166 , 167 , 168 , 169 , 170 , 172 , 173 , 174 , 175 , 176 , 177 , 181 , 182 , 183 , 184 , 194 , 195 , 196 , 200 , 201 , 205 , 206 , 207 , 209 , 210 , 211 , 212 , 213 , 216 , 217 , 219 , 220 , 224 , 225 , 228 , 230 , 231 , 232 , 233 , 234 , 235 , 236 , 237 , 238 , 239 , 240 , 241 , 242 , 243 , 244 , 245 , 246 , 247 , 248 , 249 , 250 , 253 , 254 , 255 , 256 , 257 , 258 , 259 , 260 , 261 , 262 , 263 , 264 , 265 , 266 , 267 , 268 , 269 , 271 , 272 , 273 , 274 , 275 , 276 , 278 , 279 , 281 , 282 , 284 , 285 , 286 , 288 , 289 , 293 , 294 , 296 , 297 , 298 , 300];
        return notGoalKeeperList[salt_random(0, notGoalKeeperList.length,salt)];
    }

    function random_vip_card() public view returns(uint256) {
        return uint256(random(1,82));
    }
    function random_common_card() public view returns(uint256) {
        return uint256(random(1,219));
    }

    function get_admin() public view returns(address) {
        return admin;
    }

    function get_common_card_price() public view returns(uint256) {
        return common_card_price;
    }
    
    function get_vip_card_price() public view returns(uint256) {
        return vip_card_price;
    }

    function get_power_price() public view returns(uint256) {
        return power_price;
    }

    function set_common_card_price(uint256 price) public {
        require(msg.sender == admin);
        common_card_price = price;
    }

    function set_vip_card_price(uint256 price) public {
        require(msg.sender == admin);
        vip_card_price = price;
    }

    function set_power_price(uint256 price) public {
        require(msg.sender == admin);
        power_price = price;
    }

    // 用户注册顺便送卡
    function user_register() public {
        address user_from = msg.sender;
        uint256 user_id = get_user_id(user_from);
        if (user_id == 0){
            User memory user = User(user_from,now,5,0,0);
            user_list.push(user);
            user_id = user_list.length-1;
            user_map[uint256(user_from)] = user_id;
            for(uint256 i=0;i<4;i++) {
                Card memory card = Card(card_list.length,user_id,random_not_goalkeeper_card(i),0,false,0);
                user_card_map[user_id].push(card_list.length);
                card_list.push(card);
                user_team_map[user_id].push(card_list.length-1);
            }
            Card memory card2 = Card(card_list.length,user_id,random_goalkeeper_card(4),0,false,0);
            user_card_map[user_id].push(card_list.length);
            card_list.push(card2);
            user_team_map[user_id].push(card_list.length-1);
        }
    }
    
    //用户登录，如果没注册则返回地址空，需要去注册
    function user_login() public view returns(address,uint256,uint256,uint256,uint256){
        address user_from = msg.sender;
        uint256 user_id = get_user_id(user_from);
        if (user_id == 0){
            return (msg.sender,0,0,0,0);
        }
        User memory user = user_list[user_id];
        return (user.user_address,user.user_card_cnt,user.last_time,user.power,user.user_contest_cnt);
    }
    
    // 根据user_id获取address
    function get_user_address(uint256 user_id) public view returns(address) {
        User memory user = user_list[user_id];
        return user.user_address;
      
    }
    function get_user_id(address user_address) public view returns(uint256) {
        return user_map[uint256(user_address)];
    }

    function get_user_count() public view returns(uint256) {
        return user_list.length;
    }
    
    //获取用户的队伍，返回card_id数组
    function get_user_team(address user_address) public view returns(uint256[5] memory) {
        uint256[] storage temp_team =  user_team_map[get_user_id(user_address)];
        uint256[5] memory user_team;
        for(uint256 i=0;i<5;i++){
            user_team[i] = temp_team[i];
        }
        return user_team;
    }
     
    //获取用户的全部卡牌
    function get_user_all_card() public view returns(uint256[999] memory ,uint256){
        uint256 user_id = get_user_id(msg.sender);
        uint256[] storage temp_card_list = user_card_map[user_id];
        uint256[999] memory user_all_card;
        for(uint256 i=0;i<temp_card_list.length;i++) {
            user_all_card[i] = temp_card_list[i];
        }
        return (user_all_card,user_card_map[user_id].length);
    }

    //购买体力
    function buy_power(uint256 value) public payable{
        require(value > power_price);
        User memory user = user_list[get_user_id(msg.sender)];
        //require(now-user.last_time>=86400);
        emit Transfer(msg.sender, admin, value);
        uint256 user_id = user_map[uint256(msg.sender)];
        user_list[user_id].power+=5;
        user_list[user_id].last_time = now;
    }
    
    //get free power
    function get_power_power() public{
        User memory user = user_list[get_user_id(msg.sender)];
        require(now-user.last_time>=86400);
        uint256 user_id = user_map[uint256(msg.sender)];
        user_list[user_id].power+=5;
        user_list[user_id].last_time = now;
    }
    //get all user
    function get_all_users() public view returns(address[9999] memory,uint256){
        address[9999] memory all_user_address;
        uint256 user_count = 0;
        for(uint256 i=0;i<user_list.length;i++) {
            all_user_address[i] = user_list[i].user_address;
            user_count+=1;
        }
        return (all_user_address,user_count);
    }
    //获取卡牌信息
    function get_card_info(uint256 card_id) public view returns(uint256,uint256,uint256,uint256,bool,uint256) {
        Card memory card = card_list[card_id];
        return (card.card_id,card.owner_id,card.player_id,card.level,card.on_market,card.card_price);
    }

    //判断卡牌是不是vip的
    function judge_card_vip(uint256 card_id) public view returns(bool) {
        Card memory card = card_list[card_id];
        return card.player_id<=81; 
    }

    //买一张普通卡
    function buy_common_card(uint256 value) public payable{
        // require(value >= common_card_price);
        emit Transfer(msg.sender, admin, value);
        uint256 user_id = get_user_id(msg.sender);
        Card memory card = Card(card_list.length,user_id,random_common_card(),0,false,0);
        user_card_map[user_id].push(card_list.length);
        card_list.push(card);
    }
    
    //买一张vip卡
    function buy_vip_card(uint256 value) public payable{
        require(value >= vip_card_price);
        emit Transfer(msg.sender, admin, value);
        uint256 user_id = get_user_id(msg.sender);
        Card memory card = Card(card_list.length,user_id,random_vip_card(),0,false,0);
        user_card_map[user_id].push(card_list.length);
        card_list.push(card);
    }

    //更改队伍中的卡片
    function change_team(uint256 old_card_id, uint256 new_card_id) public {
        uint256[5] memory user_team = get_user_team(msg.sender);
        for(uint256 i=0;i<5;i++){
            if(user_team[i] == old_card_id){
                user_team[i] = new_card_id;
                break;
            }
        }
        uint256 user_id = get_user_id(msg.sender);
        user_team_map[user_id] = user_team;
    }
    
    //设置队伍
    function set_team(uint256[5] memory new_team) public {
        uint256 user_id = get_user_id(msg.sender);
        user_team_map[user_id] = new_team;
    }
    
    
    //card是否在队伍中
    function is_card_in_team(uint256 card_id) public view returns(bool) {
        Card memory card = card_list[card_id];
        uint256 user_id = get_user_id(msg.sender);
        uint256[] memory user_team = user_team_map[user_id];
        for(uint256 i=0;i<5;i++){
            if(user_team[i] == card.card_id){
                return true;
            }
        }
        return false;
    }

    //出售一张卡
    function sale_card(uint256 card_id, uint256 card_price) public {
        Card memory card = card_list[card_id];
        uint256 user_id = get_user_id(msg.sender);
        require(card.owner_id == user_id && !card.on_market && !is_card_in_team(card_id));
        card_list[card_id].card_price = card_price;
        card_list[card_id].on_market = true;
    }
    
    // 获取市场上所有在售card
    function get_all_card_on_market() view public returns(uint256[9999] memory ,uint256 ) {
        uint256[9999] memory card_on_market;
        uint256 card_count = 0;
        for(uint256 i=0;i<card_list.length;i++) {
            if(card_list[i].on_market) {
                card_on_market[card_count++] = card_list[i].card_id;
            }
        }
        return (card_on_market,card_count);
    }
    //把一张卡从用户的卡牌列表删除
    function remove_card_from_user_card_map(uint256 card_id) public {
        uint256 user_id = card_list[card_id].owner_id;
        uint256 begin = 9999;
        for(uint i=0;i<user_card_map[user_id].length;i++) {
            if(user_card_map[user_id][i] == card_id) {
                begin = i;
                break;
            }
        }
        for(uint j=begin;j<user_card_map[user_id].length-1;j++) {
            user_card_map[user_id][j] = user_card_map[user_id][j+1];
        }
        user_card_map[user_id].length--;
    }
    //买卡
    function buy_card(uint256 card_id, uint256 value) public payable{
        Card memory card = card_list[card_id];
        uint256 user_id = get_user_id(msg.sender);
        require(card.on_market && card.card_price<=value);
        address card_owner_address = user_list[user_id].user_address;
        emit Transfer(msg.sender, card_owner_address, value);//我，中本聪，打钱
        remove_card_from_user_card_map(card_id);//从原来的owner cardlist中删除
        user_card_map[user_id].push(card_id);//加到购买者的cardlist中
        card_list[card_id].owner_id = user_id;//变更所有权
        card_list[card_id].on_market = false;//下架
    }

    //add levle
    function add_level(uint256 card_id, uint256 add) public {
        card_list[card_id].level+=add;
    }
}
