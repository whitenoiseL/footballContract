"use strict";

var Card = function() {

    LocalContractStorage.defineMapProperty(this, "cardMap");
    LocalContractStorage.defineMapProperty(this, "card2userMap");
    LocalContractStorage.defineProperty(this, "cardMap_cnt", null);

    LocalContractStorage.defineProperty(this, "common_card_price", null);
    LocalContractStorage.defineProperty(this, "vip_card_price", null);
    LocalContractStorage.defineProperty(this, "power_price", null);
    LocalContractStorage.defineProperty(this, "common_count", null);
    LocalContractStorage.defineProperty(this, "vip_count", null);
    LocalContractStorage.defineProperty(this, "power_count", null);

    LocalContractStorage.defineMapProperty(this, "saleCardMap");
    LocalContractStorage.defineMapProperty(this, "saleCardIndexMap");
    LocalContractStorage.defineProperty(this, "saleCardMap_cnt", null);

    LocalContractStorage.defineMapProperty(this, "userMap");
    LocalContractStorage.defineMapProperty(this, "rankuserMap");
    LocalContractStorage.defineMapProperty(this, "userrankMap");
    LocalContractStorage.defineProperty(this, "userMap_cnt", null);
    LocalContractStorage.defineProperty(this, "rankMap_cnt", null);

    LocalContractStorage.defineMapProperty(this, "matchMap");
    LocalContractStorage.defineProperty(this, "matchMap_cnt", null);

};

Card.prototype = {
    init: function() {
        // todo
        //this.size = 1;
        this.admin = Blockchain.transaction.from;
        this.userMap_cnt = 1;
        this.common_count = 1;
        this.vip_count = 1;
        this.rankMap_cnt = 1;
        this.cardMap_cnt = 1;
        this.power_count = 1;
        this.matchMap_cnt = 1;
        this.saleCardMap_cnt = 1;
        this.common_card_price = 0.03 * this._nasToWei();
        this.vip_card_price = 0.1 * this._nasToWei();
        this.power_price = 0.1 * this._nasToWei();
        //this.saleCardMap.set("10","0.1")
    },

    get_matchMap_cnt: function() {
        return this.matchMap_cnt
    },

    get_address: function() {
        return Blockchain.transaction.from
    },

    get_userMap_cnt: function() {
        return this.userMap_cnt
    },

    get_cardMap_cnt: function() {
        return this.cardMap_cnt
    },

    get_vip_count: function() {
        return this.vip_count
    },

    get_common_count: function() {
        return this.common_count
    },

    get_power_count: function() {
        return this.power_count
    },

    get_saleCardMap_cnt: function() {
        return this.saleCardMap_cnt
    },

    _nasToWei: function() {
        return 1000000000000000000;
    },

    random_all_card: function() {
        let num = parseInt(Math.random(219).toFixed(3) * 218 + 82)
        return num;
    },

    random_goalkeeper_card: function() {
        let num = parseInt(Math.random().toFixed(2) * 60)
        return num;
    },

    random_not_goalkeeper: function() {
        let num = parseInt(Math.random().toFixed(2) * 238)
        return num;
    },

    random_vip_card: function() {
        let num = parseInt(Math.random().toFixed(2) * 80 + 1)
        return num;
    },

    test_common: function() {
        let card_type = this.random_all_card()
        let card = this.get_common_card_type(card_type)
        return card_type + "," + card
    },
    /*
        test_all_common: function() {
            let res = "82:"+ get_common_card_type(0)
            for(let i = 1;i<219;i++){
                let card = this.get_common_card_type(i)
                res += "_"+(i+81).toString()+":"+card
            }
            return res
        },
        */

    test_common_card: function(value) {
        let res = "82:" + this.get_common_card_type("82") + "\n"
        for (let i = 1; i < parseInt(value); i++) {
            //let card = this.get_common_card_type(i)
            res += this.test_common() + "\n"
        }
        return res
    },

    test_goalkeeper: function() {

        let card_change = ["62", "63", "64", "65", "66", "67", "68", "69", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "80",
            "81", "171", "178", "179", "180", "185", "186", "187", "188", "189", "190", "191", "192", "193", "197", "198", "199",
            "202", "203", "204", "208", "214", "215", "218", "221", "222", "223", "226", "227", "229", "251", "252", "270", "277",
            "280", "283", "287", "290", "291", "292", "295", "299"
        ]
        let mid_type = this.random_goalkeeper_card()
        let card_type = card_change[mid_type]
        //let card_type = this.random_goalkeeper_card()
        let card = this.get_goalkeeper(card_type);
        return card_type + "," + card
    },

    test_not_goalkeeper: function() {

        let card_change = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60", "61", "82", "83", "84", "85", "86", "87", "88", "89", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "100", "101", "102", "103", "104", "105", "106", "107", "108", "109", "110", "111", "112", "113", "114", "115", "116", "117", "118", "119", "120",
            "121", "122", "123", "124", "125", "126", "127", "128", "129", "130", "131", "132", "133", "134", "135", "136", "137", "138", "139", "140", "141", "142", "143", "144", "145", "146", "147", "148", "149", "150", "151", "152", "153", "154", "155", "156", "157", "158", "159", "160", "161", "162", "163", "164", "165", "166", "167", "168", "169", "170", "172", "173", "174", "175", "176", "177", "181", "182", "183", "184", "194", "195", "196", "200", "201", "205", "206", "207", "209", "210", "211", "212", "213", "216", "217", "219", "220", "224", "225", "228", "230", "231", "232", "233", "234", "235", "236", "237", "238", "239", "240", "241", "242", "243", "244", "245", "246", "247", "248", "249",
            "250", "253", "254", "255", "256", "257", "258", "259", "260", "261", "262", "263", "264", "265", "266", "267", "268", "269", "271", "272", "273", "274", "275", "276", "278", "279", "281", "282", "284", "285", "286", "288", "289", "293", "294", "296", "297", "298", "300"
        ]
        let mid_type = this.random_not_goalkeeper()
        let card_type = card_change[mid_type]
        //let card_type = this.random_goalkeeper_card()
        let card = this.get_common_card_type(card_type);
        if (card == null) {
            card = this.get_vip_card_type(card_type);
        }
        return card_type + "," + card
    },
    /*
        test_all_goalkeeper: function() {
            let res = "62:"+ this.get_goalkeeper("62");
            for(let i = 1;i<61;i++){
                let card_type = this.random_goalkeeper_card()
                let card = this.get_goalkeeper(card_type);
                res += "_"+i+":"+card
            }
            return res
        },
        */

    test_goalkeeper_card: function(value) {
        let res = "299:" + this.get_goalkeeper("299") + "\n";
        for (let i = 1; i < parseInt(value); i++) {
            //let mid = this.random_goalkeeper_card()
            // let card_type = this.random_goalkeeper_card()
            // let card = this.get_goalkeeper(card_type);
            res += this.test_goalkeeper() + "\n"
        }
        return res
    },

    test_vip: function() {
        let card_type = this.random_vip_card()
        let card = this.get_vip_card_type(card_type)
        return card_type + "," + card
    },
    /*
        test_all_vip: function() {
            res = "1:"+ get_vip_card_type(0)
            for(let i = 1;i<82;i++){
                let card = this.get_vip_card_type(i)
                res += "_"+i+":"+card
            }
            return res
        },
        */

    test_vip_card: function(value) {
        let res = "1:" + this.get_vip_card_type("1") + "\n"
        for (let i = 1; i < value; i++) {
            // let card = this.get_vip_card_type(i)
            res += this.test_vip() + "\n"
        }
        return res
    },


    get_common_card_type: function(type) {
        let card = {
            "82": "贝莱林,51,75,95,0.51,0.75,0.95,0,0,status0",
            "83": "弗洛伦齐,79,76,85,0.79,0.76,0.85,0,0,status0",
            "84": "比达尔,81,84,77,0.81,0.84,0.77,0,0,status0",
            "85": "纳因戈兰,80,81,79,0.8,0.81,0.79,0,0,status0",
            "86": "皮什切克,66,81,79,0.66,0.81,0.79,1,0,status0",
            "87": "利希施泰纳,59,79,81,0.59,0.79,0.81,1,0,status0",
            "88": "达米安,58,80,80,0.58,0.8,0.8,1,0,status0",
            "89": "埃弗拉,51,83,77,0.51,0.83,0.77,1,0,status0",
            "90": "莫雷诺,68,70,89,0.68,0.7,0.89,1,0,status0",
            "91": "范安霍尔特,62,71,88,0.62,0.71,0.88,1,0,status0",
            "92": "西迪贝,67,77,82,0.67,0.77,0.82,1,0,status0",
            "93": "豪梅-科斯塔,59,76,83,0.59,0.76,0.83,1,0,status0",
            "94": "史蒂芬-拉杜,64,84,75,0.64,0.84,0.75,1,0,status0",
            "95": "米歇尔-马塞多,46,70,89,0.46,0.7,0.89,1,0,status0",
            "96": "拉云,72,74,84,0.72,0.74,0.84,1,0,status0",
            "97": "达尼洛,70,78,80,0.7,0.78,0.8,1,0,status0",
            "98": "库尔扎瓦,69,79,79,0.69,0.79,0.79,1,0,status0",
            "99": "耶德林,51,65,93,0.51,0.65,0.93,1,0,status0",
            "100": "纳尔多,69,86,72,0.69,0.86,0.72,1,0,status0",
            "101": "弗尔萨利科,55,77,81,0.55,0.77,0.81,1,0,status0",
            "102": "拉斯-迪亚拉,53,81,77,0.53,0.81,0.77,1,0,status0",
            "103": "泰特,42,79,79,0.42,0.79,0.79,1,0,status0",
            "104": "乌姆蒂蒂,64,82,75,0.64,0.82,0.75,1,0,status0",
            "105": "西莫-纳瓦罗,47,76,81,0.47,0.76,0.81,1,0,status0",
            "106": "巴尔特拉,46,84,73,0.46,0.84,0.73,1,0,status0",
            "107": "马尔基尼奥斯,38,84,73,0.38,0.84,0.73,1,0,status0",
            "108": "蒂亚戈-门德斯,67,71,85,0.67,0.71,0.85,1,0,status0",
            "109": "格雷茨卡,70,75,81,0.7,0.75,0.81,1,0,status0",
            "110": "阿达玛-特拉奥雷,57,70,86,0.57,0.7,0.86,1,0,status0",
            "111": "阿兰,64,79,77,0.64,0.79,0.77,1,0,status0",
            "112": "马尔基西奥,74,76,79,0.74,0.76,0.79,1,0,status0",
            "113": "鲁西隆,62,70,85,0.62,0.7,0.85,1,0,status0",
            "114": "A-图雷,51,74,81,0.51,0.74,0.81,1,0,status0",
            "115": "巴勒,49,73,82,0.49,0.73,0.82,1,0,status0",
            "116": "阿奇姆彭,65,63,91,0.65,0.63,0.91,0,0,status0",
            "117": "桑松,75,77,77,0.75,0.77,0.77,1,0,status0",
            "118": "里卡多-罗德里格斯,67,80,74,0.67,0.8,0.74,1,0,status0",
            "119": "拉斐尔,57,74,80,0.57,0.74,0.8,1,0,status0",
            "120": "佩兰,65,84,70,0.65,0.84,0.7,1,0,status0",
            "121": "贝尔奇切,55,76,78,0.55,0.76,0.78,1,0,status0",
            "122": "马塞尔-里瑟,76,67,86,0.76,0.67,0.86,0,0,status0",
            "123": "西普里安,75,73,80,0.75,0.73,0.8,1,0,status0",
            "124": "达波,71,74,79,0.71,0.74,0.79,1,0,status0",
            "125": "拉米雷斯,73,77,76,0.73,0.77,0.76,0,0,status0",
            "126": "阿马维,67,74,79,0.67,0.74,0.79,1,0,status0",
            "127": "科杰洛,66,75,78,0.66,0.75,0.78,1,0,status0",
            "128": "德比希,65,79,74,0.65,0.79,0.74,1,0,status0",
            "129": "巴斯蒂安斯,59,73,80,0.59,0.73,0.8,1,0,status0",
            "130": "胡梅尔斯,58,89,64,0.58,0.89,0.64,1,0,status0",
            "131": "普恩杰,34,70,83,0.34,0.7,0.83,1,0,status0",
            "132": "塞纳德-卢利奇,72,71,81,0.72,0.71,0.81,1,0,status0",
            "133": "格雷罗,72,73,79,0.72,0.73,0.79,1,0,status0",
            "134": "阿萨莫阿,73,71,80,0.73,0.71,0.8,1,0,status0",
            "135": "托利索,76,76,75,0.76,0.76,0.75,1,0,status0",
            "136": "马斯切拉诺,53,85,66,0.53,0.85,0.66,1,0,status0",
            "137": "德罗西,64,81,69,0.64,0.81,0.69,1,0,status0",
            "138": "拉斯-本德,64,82,68,0.64,0.82,0.68,1,0,status0",
            "139": "帕罗洛,77,76,73,0.77,0.76,0.73,1,0,status0",
            "140": "戈纳隆,62,82,67,0.62,0.82,0.67,1,0,status0",
            "141": "桑德罗,69,76,72,0.69,0.76,0.72,1,0,status0",
            "142": "特谢拉,79,60,87,0.79,0.6,0.87,0,0,status0",
            "143": "特谢拉,79,60,87,0.79,0.6,0.87,1,0,status0",
            "144": "卡斯特罗,72,73,74,0.72,0.73,0.74,1,0,status0",
            "145": "德莱尼,71,74,73,0.71,0.74,0.73,1,0,status0",
            "146": "赫迪拉,76,81,66,0.76,0.81,0.66,1,0,status0",
            "147": "基米希,67,76,71,0.67,0.76,0.71,1,0,status0",
            "148": "尤努佐维奇,72,69,77,0.72,0.69,0.77,1,0,status0",
            "149": "斯特罗曼,74,78,68,0.74,0.78,0.68,1,0,status0",
            "150": "科拉罗夫,69,79,67,0.69,0.79,0.67,1,0,status0",
            "151": "米林科维奇-萨维奇,70,73,72,0.7,0.73,0.72,1,0,status0",
            "152": "维特塞尔,74,73,71,0.74,0.73,0.71,1,0,status0",
            "153": "因苏亚,65,77,67,0.65,0.77,0.67,1,0,status0",
            "154": "吉尔,39,81,63,0.39,0.81,0.63,1,0,status0",
            "155": "张琳芃,67,69,74,0.67,0.69,0.74,1,0,status0",
            "156": "艾哈迈多夫,70,72,69,0.7,0.72,0.69,1,0,status0",
            "157": "斯特林,71,46,93,0.71,0.46,0.93,0,0,status0",
            "158": "卡洛斯-桑切斯,73,49,90,0.73,0.49,0.9,0,0,status0",
            "159": "王燊超,27,66,72,0.27,0.66,0.72,1,0,status0",
            "160": "若泽-丰特,35,84,54,0.35,0.84,0.54,1,0,status0",
            "161": "帕莱塔,33,83,55,0.33,0.83,0.55,1,0,status0",
            "162": "卢卡斯-莫拉,74,44,93,0.74,0.44,0.93,0,0,status0",
            "163": "萨拉赫,72,45,92,0.72,0.45,0.92,0,0,status0",
            "164": "哈恩,78,52,85,0.78,0.52,0.85,0,0,status0",
            "165": "坎德雷瓦,80,56,81,0.8,0.56,0.81,0,0,status0",
            "166": "奥古斯托-费尔南德斯,70,68,69,0.7,0.68,0.69,1,0,status0",
            "167": "维罗索,70,73,64,0.7,0.73,0.64,1,0,status0",
            "168": "波兰斯基,71,78,59,0.71,0.78,0.59,1,0,status0",
            "169": "托西奇,47,74,63,0.47,0.74,0.63,1,0,status0",
            "170": "胡安-卡拉,54,72,64,0.54,0.72,0.64,1,0,status0",
            "171": "鲁利,1,85,51,0.01,0.85,0.51,2,0,status0",
            "172": "姆巴佩,73,47,88,0.73,0.47,0.88,0,0,status0",
            "173": "施廷德尔,83,65,70,0.83,0.65,0.7,1,0,status0",
            "174": "黄博文,65,64,71,0.65,0.64,0.71,0,0,status0",
            "175": "黄博文,65,64,71,0.65,0.64,0.71,1,0,status0",
            "176": "施维格勒,69,74,61,0.69,0.74,0.61,1,0,status0",
            "177": "柏佳骏,34,62,73,0.34,0.62,0.73,1,0,status0",
            "178": "苏巴西奇,1,82,53,0.01,0.82,0.53,2,0,status0",
            "179": "奥布拉克,1,83,52,0.01,0.83,0.52,2,0,status0",
            "180": "内托,1,84,51,0.01,0.84,0.51,2,0,status0",
            "181": "迪马利亚,79,47,87,0.79,0.47,0.87,0,0,status0",
            "182": "塔利斯卡,80,59,75,0.8,0.59,0.75,1,0,status0",
            "183": "奥古斯托,73,66,68,0.73,0.66,0.68,1,0,status0",
            "184": "蒿俊闵,60,63,71,0.6,0.63,0.71,1,0,status0",
            "185": "胡安-索里亚诺,1,69,65,0.01,0.69,0.65,2,0,status0",
            "186": "安东尼,1,71,63,0.01,0.71,0.63,2,0,status0",
            "187": "约埃尔,1,74,60,0.01,0.74,0.6,2,0,status0",
            "188": "索默,1,83,51,0.01,0.83,0.51,2,0,status0",
            "189": "西里古,1,83,51,0.01,0.83,0.51,2,0,status0",
            "190": "多纳鲁马,1,86,48,0.01,0.86,0.48,2,0,status0",
            "191": "曼丹达,1,86,48,0.01,0.86,0.48,2,0,status0",
            "192": "科斯蒂尔,1,82,51,0.01,0.82,0.51,2,0,status0",
            "193": "布冯,1,87,46,0.01,0.87,0.46,2,0,status0",
            "194": "科雷亚,79,49,83,0.79,0.49,0.83,0,0,status0",
            "195": "格拉德尔,74,44,88,0.74,0.44,0.88,0,0,status0",
            "196": "纳库尔马,70,41,91,0.7,0.41,0.91,0,0,status0",
            "197": "巴尔博萨,1,75,57,0.01,0.75,0.57,2,0,status0",
            "198": "布尔基,1,81,51,0.01,0.81,0.51,2,0,status0",
            "199": "特拉普,1,83,49,0.01,0.83,0.49,2,0,status0",
            "200": "格纳布里,74,43,88,0.74,0.43,0.88,0,0,status0",
            "201": "吴曦,65,63,68,0.65,0.63,0.68,1,0,status0",
            "202": "克拉夫特,1,80,51,0.01,0.8,0.51,2,0,status0",
            "203": "比特勒,1,80,51,0.01,0.8,0.51,2,0,status0",
            "204": "奥利弗-鲍曼,1,82,49,0.01,0.82,0.49,2,0,status0",
            "205": "霍埃尔-坎贝尔,73,42,88,0.73,0.42,0.88,0,0,status0",
            "206": "孙可,57,52,78,0.57,0.52,0.78,0,0,status0",
            "207": "根特纳,74,75,55,0.74,0.75,0.55,1,0,status0",
            "208": "吕菲耶,1,82,48,0.01,0.82,0.48,2,0,status0",
            "209": "菲利普-科斯蒂奇,71,39,90,0.71,0.39,0.9,0,0,status0",
            "210": "韩鹏,72,45,84,0.72,0.45,0.84,0,0,status0",
            "211": "努尔丁-阿姆拉巴特,76,42,86,0.76,0.42,0.86,0,0,status0",
            "212": "萨利布尔,73,39,89,0.73,0.39,0.89,0,0,status0",
            "213": "郜林,67,56,72,0.67,0.56,0.72,0,0,status0",
            "214": "霍恩,1,80,48,0.01,0.8,0.48,2,0,status0",
            "215": "什琴斯尼,1,83,45,0.01,0.83,0.45,2,0,status0",
            "216": "恩库杜,72,35,92,0.72,0.35,0.92,0,0,status0",
            "217": "布鲁马,71,34,93,0.71,0.34,0.93,0,0,status0",
            "218": "斯波尔蒂耶洛,1,84,43,0.01,0.84,0.43,2,0,status0",
            "219": "费利佩-安德森,75,34,92,0.75,0.34,0.92,0,0,status0",
            "220": "佩里西奇,79,42,84,0.79,0.42,0.84,0,0,status0",
            "221": "格尔戈林,1,76,50,0.01,0.76,0.5,2,0,status0",
            "222": "希茨,1,82,44,0.01,0.82,0.44,2,0,status0",
            "223": "费尔曼,1,83,43,0.01,0.83,0.43,2,0,status0",
            "224": "威尔逊,73,34,91,0.73,0.34,0.91,0,0,status0",
            "225": "梅尔滕斯,75,36,89,0.75,0.36,0.89,0,0,status0",
            "226": "卡斯特尔斯,1,80,45,0.01,0.8,0.45,2,0,status0",
            "227": "米兰特,1,82,43,0.01,0.82,0.43,2,0,status0",
            "228": "托马斯-穆勒,83,46,78,0.83,0.46,0.78,0,0,status0",
            "229": "孔西利,1,84,40,0.01,0.84,0.4,2,0,status0",
            "230": "卡里略,76,32,91,0.76,0.32,0.91,0,0,status0",
            "231": "贝拉拉比,77,33,90,0.77,0.33,0.9,0,0,status0",
            "232": "巴坎布,78,35,88,0.78,0.35,0.88,0,0,status0",
            "233": "奥斯曼-登贝莱,73,31,92,0.73,0.31,0.92,0,0,status0",
            "234": "埃斯维因,72,32,91,0.72,0.32,0.91,0,0,status0",
            "235": "恩吉耶,68,30,93,0.68,0.3,0.93,0,0,status0",
            "236": "普利亚,79,41,82,0.79,0.41,0.82,0,0,status0",
            "237": "赫尔曼,75,31,91,0.75,0.31,0.91,0,0,status0",
            "238": "本-阿尔法,82,40,82,0.82,0.4,0.82,0,0,status0",
            "239": "格德斯,76,35,87,0.76,0.35,0.87,0,0,status0",
            "240": "卡马诺,69,32,90,0.69,0.32,0.9,0,0,status0",
            "241": "汤森,75,32,89,0.75,0.32,0.89,0,0,status0",
            "242": "亚历杭德罗-戈麦斯,74,31,90,0.74,0.31,0.9,0,0,status0",
            "243": "黑勒,70,28,93,0.7,0.28,0.93,0,0,status0",
            "244": "伊哈洛,73,40,81,0.73,0.4,0.81,0,0,status0",
            "245": "德佩,77,30,90,0.77,0.3,0.9,0,0,status0",
            "246": "凯塔-巴尔德,76,29,91,0.76,0.29,0.91,0,0,status0",
            "247": "穆坎乔,76,29,91,0.76,0.29,0.91,0,0,status0",
            "248": "埃泽杰尔,74,28,92,0.74,0.28,0.92,0,0,status0",
            "249": "因莫比莱,83,38,82,0.83,0.38,0.82,0,0,status0",
            "250": "热尔维尼奥,69,28,92,0.69,0.28,0.92,0,0,status0",
            "251": "曾诚,1,70,50,0.01,0.7,0.5,2,0,status0",
            "252": "乌尔赖希,1,81,39,0.01,0.81,0.39,2,0,status0",
            "253": "布莱斯维特,76,34,85,0.76,0.34,0.85,0,0,status0",
            "254": "维尔纳,75,27,91,0.75,0.27,0.91,0,0,status0",
            "255": "沙拉维,75,31,87,0.75,0.31,0.87,0,0,status0",
            "256": "加克佩,70,28,90,0.7,0.28,0.9,0,0,status0",
            "257": "卡瓦尼,83,42,76,0.83,0.42,0.76,0,0,status0",
            "258": "恩特普,75,26,91,0.75,0.26,0.91,0,0,status0",
            "259": "卡拉斯科,78,29,88,0.78,0.29,0.88,0,0,status0",
            "260": "德普列维尔,75,33,84,0.75,0.33,0.84,0,0,status0",
            "261": "于汉超,64,41,76,0.64,0.41,0.76,0,0,status0",
            "262": "卢卡库,82,34,82,0.82,0.34,0.82,0,0,status0",
            "263": "利昂-贝利,70,23,93,0.7,0.23,0.93,0,0,status0",
            "264": "特略,70,24,92,0.7,0.24,0.92,0,0,status0",
            "265": "哈梅斯-罗德里格斯,85,40,76,0.85,0.4,0.76,0,0,status0",
            "266": "贝拉尔迪,80,30,85,0.8,0.3,0.85,0,0,status0",
            "267": "尼昂,74,26,89,0.74,0.26,0.89,0,0,status0",
            "268": "武磊,72,31,84,0.72,0.31,0.84,0,0,status0",
            "269": "拉维奇,71,33,82,0.71,0.33,0.82,0,0,status0",
            "270": "张鹭,1,70,45,0.01,0.7,0.45,2,0,status0",
            "271": "安德烈-格雷,74,23,91,0.74,0.23,0.91,0,0,status0",
            "272": "马尔科-萨乌,72,22,92,0.72,0.22,0.92,0,0,status0",
            "273": "加梅罗,84,35,79,0.84,0.35,0.79,0,0,status0",
            "274": "因西涅,72,25,89,0.72,0.25,0.89,0,0,status0",
            "275": "费基尔,77,31,83,0.77,0.31,0.83,0,0,status0",
            "276": "帕托,78,27,86,0.78,0.27,0.86,0,0,status0",
            "277": "维维亚诺,1,81,32,0.01,0.81,0.32,2,0,status0",
            "278": "阿斯帕斯,82,29,83,0.82,0.29,0.83,0,0,status0",
            "279": "穆里尔,74,23,89,0.74,0.23,0.89,0,0,status0",
            "280": "颜骏凌,1,69,43,0.01,0.69,0.43,2,0,status0",
            "281": "孙兴慜,81,25,86,0.81,0.25,0.86,0,0,status0",
            "282": "约维蒂奇,82,33,78,0.82,0.33,0.78,0,0,status0",
            "283": "顾超,1,69,42,0.01,0.69,0.42,2,0,status0",
            "284": "埃德尔,80,25,85,0.8,0.25,0.85,0,0,status0",
            "285": "巴舒亚伊,80,27,83,0.8,0.27,0.83,0,0,status0",
            "286": "莫德斯特,82,33,77,0.82,0.33,0.77,0,0,status0",
            "287": "张思鹏,1,65,45,0.01,0.65,0.45,2,0,status0",
            "288": "巴卡,81,24,85,0.81,0.24,0.85,0,0,status0",
            "289": "科尔内,73,22,86,0.73,0.22,0.86,0,0,status0",
            "290": "杨智,1,63,44,0.01,0.63,0.44,2,0,status0",
            "291": "郭全博,1,64,43,0.01,0.64,0.43,2,0,status0",
            "292": "隋维杰,1,65,42,0.01,0.65,0.42,2,0,status0",
            "293": "罗西,81,23,82,0.81,0.23,0.82,0,0,status0",
            "294": "伊卡尔迪,82,26,79,0.82,0.26,0.79,0,0,status0",
            "295": "王大雷,1,74,31,0.01,0.74,0.31,2,0,status0",
            "296": "伊瓜因,87,24,80,0.87,0.24,0.8,0,0,status0",
            "297": "本泽马,84,22,81,0.84,0.22,0.81,0,0,status0",
            "298": "于大宝,67,30,73,0.67,0.3,0.73,0,0,status0",
            "299": "刘殿座,1,62,40,0.01,0.62,0.4,2,0,status0",
            "300": "姜宁,66,19,78,0.66,0.19,0.78,0,0,status0",
        }

        return card[type]
    },

    get_goalkeeper: function(type) {
        let card = {
            "62": "洛里,1,87,64,0.01,0.87,0.64,2,0,status0",
            "63": "诺伊尔,1,89,60,0.01,0.89,0.6,2,0,status0",
            "64": "安东尼-洛佩斯,1,86,62,0.01,0.86,0.62,2,0,status0",
            "65": "埃德森-莫赖斯,1,81,63,0.01,0.81,0.63,2,0,status0",
            "66": "卡斯帕-舒梅切尔,1,83,61,0.01,0.83,0.61,2,0,status0",
            "67": "乔-哈特,1,84,60,0.01,0.84,0.6,2,0,status0",
            "68": "德赫亚,1,88,56,0.01,0.88,0.56,2,0,status0",
            "69": "纳瓦斯,1,87,56,0.01,0.87,0.56,2,0,status0",
            "70": "塞兰特斯,1,81,61,0.01,0.81,0.61,2,0,status0",
            "71": "马修-瑞安,1,82,60,0.01,0.82,0.6,2,0,status0",
            "72": "汉达诺维奇,1,86,56,0.01,0.86,0.56,2,0,status0",
            "73": "阿森霍,1,84,56,0.01,0.84,0.56,2,0,status0",
            "74": "布拉沃,1,83,56,0.01,0.83,0.56,2,0,status0",
            "75": "贝戈维奇,1,83,55,0.01,0.83,0.55,2,0,status0",
            "76": "沃尔姆,1,79,58,0.01,0.79,0.58,2,0,status0",
            "77": "雷纳,1,80,57,0.01,0.8,0.57,2,0,status0",
            "78": "阿雷奥拉,1,84,53,0.01,0.84,0.53,2,0,status0",
            "79": "罗斯尔,1,79,57,0.01,0.79,0.57,2,0,status0",
            "80": "安德雷斯-费尔南德斯,1,80,56,0.01,0.8,0.56,2,0,status0",
            "81": "哈尔多松,1,100,100,0.01,1,1,2,0,status0",
            "171": "鲁利,1,85,51,0.01,0.85,0.51,2,0,status0",
            "178": "苏巴西奇,1,82,53,0.01,0.82,0.53,2,0,status0",
            "179": "奥布拉克,1,83,52,0.01,0.83,0.52,2,0,status0",
            "180": "内托,1,84,51,0.01,0.84,0.51,2,0,status0",
            "185": "胡安-索里亚诺,1,69,65,0.01,0.69,0.65,2,0,status0",
            "186": "安东尼,1,71,63,0.01,0.71,0.63,2,0,status0",
            "187": "约埃尔,1,74,60,0.01,0.74,0.6,2,0,status0",
            "188": "索默,1,83,51,0.01,0.83,0.51,2,0,status0",
            "189": "西里古,1,83,51,0.01,0.83,0.51,2,0,status0",
            "190": "多纳鲁马,1,86,48,0.01,0.86,0.48,2,0,status0",
            "191": "曼丹达,1,86,48,0.01,0.86,0.48,2,0,status0",
            "192": "科斯蒂尔,1,82,51,0.01,0.82,0.51,2,0,status0",
            "193": "布冯,1,87,46,0.01,0.87,0.46,2,0,status0",
            "197": "巴尔博萨,1,75,57,0.01,0.75,0.57,2,0,status0",
            "198": "布尔基,1,81,51,0.01,0.81,0.51,2,0,status0",
            "199": "特拉普,1,83,49,0.01,0.83,0.49,2,0,status0",
            "202": "克拉夫特,1,80,51,0.01,0.8,0.51,2,0,status0",
            "203": "比特勒,1,80,51,0.01,0.8,0.51,2,0,status0",
            "204": "奥利弗-鲍曼,1,82,49,0.01,0.82,0.49,2,0,status0",
            "208": "吕菲耶,1,82,48,0.01,0.82,0.48,2,0,status0",
            "214": "霍恩,1,80,48,0.01,0.8,0.48,2,0,status0",
            "215": "什琴斯尼,1,83,45,0.01,0.83,0.45,2,0,status0",
            "218": "斯波尔蒂耶洛,1,84,43,0.01,0.84,0.43,2,0,status0",
            "221": "格尔戈林,1,76,50,0.01,0.76,0.5,2,0,status0",
            "222": "希茨,1,82,44,0.01,0.82,0.44,2,0,status0",
            "223": "费尔曼,1,83,43,0.01,0.83,0.43,2,0,status0",
            "226": "卡斯特尔斯,1,80,45,0.01,0.8,0.45,2,0,status0",
            "227": "米兰特,1,82,43,0.01,0.82,0.43,2,0,status0",
            "229": "孔西利,1,84,40,0.01,0.84,0.4,2,0,status0",
            "251": "曾诚,1,70,50,0.01,0.7,0.5,2,0,status0",
            "252": "乌尔赖希,1,81,39,0.01,0.81,0.39,2,0,status0",
            "270": "张鹭,1,70,45,0.01,0.7,0.45,2,0,status0",
            "277": "维维亚诺,1,81,32,0.01,0.81,0.32,2,0,status0",
            "280": "颜骏凌,1,69,43,0.01,0.69,0.43,2,0,status0",
            "283": "顾超,1,69,42,0.01,0.69,0.42,2,0,status0",
            "287": "张思鹏,1,65,45,0.01,0.65,0.45,2,0,status0",
            "290": "杨智,1,63,44,0.01,0.63,0.44,2,0,status0",
            "291": "郭全博,1,64,43,0.01,0.64,0.43,2,0,status0",
            "292": "隋维杰,1,65,42,0.01,0.65,0.42,2,0,status0",
            "295": "王大雷,1,74,31,0.01,0.74,0.31,2,0,status0",
            "299": "刘殿座,1,62,40,0.01,0.62,0.4,2,0,status0",
        }
        return card[type]
    },

    get_vip_card_type: function(type) {
        let card = {
            "1": "C罗,92,33,92,0.92,0.33,0.92,0,0,status0",
            "2": "贝尔,100,57,100,1,0.57,1,0,0,status0",
            "3": "奥巴梅扬,84,37,96,0.84,0.37,0.96,0,0,status0",
            "4": "梅西,90,26,89,0.9,0.26,0.89,0,0,status0",
            "5": "阿圭罗,88,23,89,0.88,0.23,0.89,0,0,status0",
            "6": "罗伊斯,85,40,90,0.85,0.4,0.9,0,0,status0",
            "7": "迪巴拉,87,24,88,0.87,0.24,0.88,0,0,status0",
            "8": "内马尔,84,30,91,0.84,0.3,0.91,0,0,status0",
            "9": "瓦尔迪,80,54,93,0.8,0.54,0.93,0,0,status0",
            "10": "苏亚雷斯,90,42,82,0.9,0.42,0.82,0,0,status0",
            "11": "胡尔克,87,43,85,0.87,0.43,0.85,0,0,status0",
            "12": "格列兹曼,85,30,86,0.85,0.3,0.86,0,0,status0",
            "13": "阿扎尔,81,32,90,0.81,0.32,0.9,0,0,status0",
            "14": "罗本,85,32,86,0.85,0.32,0.86,0,0,status0",
            "15": "沃尔科特,77,38,93,0.77,0.38,0.93,0,0,status0",
            "16": "桑切斯,84,40,86,0.84,0.4,0.86,0,0,status0",
            "17": "马夏尔,79,42,91,0.79,0.42,0.91,0,0,status0",
            "18": "道格拉斯-科斯塔,78,49,92,0.78,0.49,0.92,0,0,status0",
            "19": "雷米,80,34,89,0.8,0.34,0.89,0,0,status0",
            "20": "伊尼亚基-威廉姆斯,75,34,94,0.75,0.34,0.94,0,0,status0",
            "21": "拉卡泽特,83,38,86,0.83,0.38,0.86,0,0,status0",
            "22": "马内,76,36,93,0.76,0.36,0.93,0,0,status0",
            "23": "金斯利-科曼,76,19,93,0.76,0.19,0.93,0,0,status0",
            "24": "科诺普良卡,79,33,90,0.79,0.33,0.9,0,0,status0",
            "25": "许尔勒,81,36,88,0.81,0.36,0.88,0,0,status0",
            "26": "莱万多夫斯基,87,38,81,0.87,0.38,0.81,0,0,status0",
            "27": "夸德拉多,76,58,92,0.76,0.58,0.92,0,0,status0",
            "28": "卡列洪,78,35,90,0.78,0.35,0.9,0,0,status0",
            "29": "马丁斯,77,33,91,0.77,0.33,0.91,0,0,status0",
            "30": "萨内,75,35,92,0.75,0.35,0.92,0,0,status0",
            "31": "阿尔巴,69,81,93,0.69,0.81,0.93,1,0,status0",
            "32": "凯尔-沃克,63,79,90,0.63,0.79,0.9,1,0,status0",
            "33": "阿拉巴,73,82,86,0.73,0.82,0.86,1,0,status0",
            "34": "塞梅多,54,75,92,0.54,0.75,0.92,1,0,status0",
            "35": "安东尼奥-瓦伦西亚,66,79,87,0.66,0.79,0.87,1,0,status0",
            "36": "阿莱士-桑德罗,64,79,87,0.64,0.79,0.87,1,0,status0",
            "37": "拜利,42,84,82,0.42,0.84,0.82,1,0,status0",
            "38": "阿尔维斯,70,78,87,0.7,0.78,0.87,1,0,status0",
            "39": "奥里耶,66,80,85,0.66,0.8,0.85,1,0,status0",
            "40": "克莱因,61,79,86,0.61,0.79,0.86,1,0,status0",
            "41": "拉莫斯,63,87,78,0.63,0.87,0.78,1,0,status0",
            "42": "卢克-肖,51,79,86,0.51,0.79,0.86,1,0,status0",
            "43": "蒂亚戈-席尔瓦,57,90,74,0.57,0.9,0.74,1,0,status0",
            "44": "马里奥-加斯帕尔,70,80,83,0.7,0.8,0.83,1,0,status0",
            "45": "坎特,66,81,82,0.66,0.81,0.82,1,0,status0",
            "46": "加亚,58,75,88,0.58,0.75,0.88,1,0,status0",
            "47": "胡安弗兰,58,79,84,0.58,0.79,0.84,1,0,status0",
            "48": "阿斯皮利奎塔,56,84,79,0.56,0.84,0.79,1,0,status0",
            "49": "卡瓦哈尔,45,81,82,0.45,0.81,0.82,1,0,status0",
            "50": "科斯切尔尼,40,85,78,0.4,0.85,0.78,1,0,status0",
            "51": "德马科斯,62,74,88,0.62,0.74,0.88,1,0,status0",
            "52": "马图伊迪,67,83,79,0.67,0.83,0.79,1,0,status0",
            "53": "菲利佩,62,82,80,0.62,0.82,0.8,1,0,status0",
            "54": "瓦拉内,45,85,77,0.45,0.85,0.77,1,0,status0",
            "55": "马塞洛,69,82,79,0.69,0.82,0.79,1,0,status0",
            "56": "杜桑-巴斯塔,67,80,81,0.67,0.8,0.81,1,0,status0",
            "57": "蒙托亚,50,75,86,0.5,0.75,0.86,1,0,status0",
            "58": "斯莫林,46,84,77,0.46,0.84,0.77,1,0,status0",
            "59": "亚历克斯-比达尔,67,69,91,0.67,0.69,0.91,1,0,status0",
            "60": "科尔曼,68,81,79,0.68,0.81,0.79,1,0,status0",
            "61": "丹尼-罗斯,63,78,82,0.63,0.78,0.82,1,0,status0",
            "62": "洛里,1,87,64,0.01,0.87,0.64,2,0,status0",
            "63": "诺伊尔,1,89,60,0.01,0.89,0.6,2,0,status0",
            "64": "安东尼-洛佩斯,1,86,62,0.01,0.86,0.62,2,0,status0",
            "65": "埃德森-莫赖斯,1,81,63,0.01,0.81,0.63,2,0,status0",
            "66": "卡斯帕-舒梅切尔,1,83,61,0.01,0.83,0.61,2,0,status0",
            "67": "乔-哈特,1,84,60,0.01,0.84,0.6,2,0,status0",
            "68": "德赫亚,1,88,56,0.01,0.88,0.56,2,0,status0",
            "69": "纳瓦斯,1,87,56,0.01,0.87,0.56,2,0,status0",
            "70": "塞兰特斯,1,81,61,0.01,0.81,0.61,2,0,status0",
            "71": "马修-瑞安,1,82,60,0.01,0.82,0.6,2,0,status0",
            "72": "汉达诺维奇,1,86,56,0.01,0.86,0.56,2,0,status0",
            "73": "阿森霍,1,84,56,0.01,0.84,0.56,2,0,status0",
            "74": "布拉沃,1,83,56,0.01,0.83,0.56,2,0,status0",
            "75": "贝戈维奇,1,83,55,0.01,0.83,0.55,2,0,status0",
            "76": "沃尔姆,1,79,58,0.01,0.79,0.58,2,0,status0",
            "77": "雷纳,1,80,57,0.01,0.8,0.57,2,0,status0",
            "78": "阿雷奥拉,1,84,53,0.01,0.84,0.53,2,0,status0",
            "79": "罗斯尔,1,79,57,0.01,0.79,0.57,2,0,status0",
            "80": "安德雷斯-费尔南德斯,1,80,56,0.01,0.8,0.56,2,0,status0",
            "81": "哈尔多松,1,100,100,0.01,1,1,2,0,status0",
        }
        return card[type]
    },

    get_admin: function() {
        return this.admin
    },

    get_card_id: function(card_id) {
        return this.cardMap.get(card_id)
    },

    get_common_card_price: function() {
        return this.common_card_price
    },

    get_vip_card_price: function() {
        return this.vip_card_price
    },

    get_power_price: function() {
        return this.power_price
    },

    set_common_card_price: function(value) {
        let from = Blockchain.transaction.from;
        if (from === this.admin) {
            this.common_card_price = parseFloat(value) * this._nasToWei();
            return true
        }
        return false;
    },

    add_power: function(value) {
        let from = Blockchain.transaction.from;
        if (from === this.admin) {
            for (let i = 1; i < this.rankMap_cnt; i++) {
                let user_from = this.rankuserMap.get(i)
                let user_info = this.userMap.get(user_from)
                user_info["power"] += parseInt(value)
                this.userMap.set(user_from, user_info)
            }
            return true
        }
        return false;
    },

    set_vip_card_price: function(value) {
        let from = Blockchain.transaction.from;
        if (from === this.admin) {
            this.vip_card_price = parseFloat(value) * this._nasToWei();
            return true
        }
        return false;
    },

    set_power_price: function(value) {
        let from = Blockchain.transaction.from;
        if (from === this.admin) {
            this.power_price = parseFloat(value) * this._nasToWei();
            return true
        }
        return false;
    },

    get_power: function() {
        let value = Blockchain.transaction.value;
        if (value.lt(this.power_price)) {
            return "your price is wrong";
        }
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        this.trans("n1LPKfnvF4HZdCALDKje8yE1p2td8eytRdK", value.toString());
        user_info["power"] += 10
        this.userMap.set(user_from, user_info)
        this.power_count += 1
        return true;
    },

    get_match: function(match_id) {
        return this.matchMap.get(match_id)
    },

    get_card_owner: function(card_id) {
        return this.card2userMap.get(card_id)
    },

    get_card_status: function(card_id) {
        return this.cardMap.get(card_id)
    },

    get_card_price: function(card_id) {
        return parseFloat(this.saleCardMap.get(card_id))
    },

    _out: function(value) {
        let user_from = Blockchain.transaction.from
        if (user_from === this.admin) {
            var result = Blockchain.transfer(this.admin, value * this._nasToWei());
            return result;
        }
    },

    _2user: function(address, value) {
        let from = Blockchain.transaction.from;
        if (from === this.admin) {
            var result = Blockchain.transfer(address, value * this._nasToWei());
            return result;
        }
        return true;
    },

    trans: function(to, value) {
        let result = Blockchain.transfer(to, value);
        return result;
    },

    get_sale_card: function(card_id) {
        let value = new BigNumber(Blockchain.transaction.value);
        let user_from = Blockchain.transaction.from;
        let user_info = this.userMap.get(user_from)
        if (!user_info) {
            let myDate = new Date();
            let time = myDate.toLocaleString();
            let name = this.get_vip_card_type(this.random_vip_card()).split(",")[0]
            user_info = {
                "user_free": 0,
                "user_name": name + this.userMap_cnt.toString(),
                "user_card_cnt": 0,
                "card_list": "_",
                "status": 0,
                "lasttime": time,
                "power": 5,
                "match": "_0_",
                "team": "_"
            };
            this.userMap.set(user_from, user_info)
            this.rankuserMap.set(this.userMap_cnt, user_from)
            this.userrankMap.set(user_from, this.userMap_cnt)
            this.userMap_cnt++
                //this.get_free_card()
        }
        let card = this.cardMap.get(card_id);
        if (!card) {
            this.trans(user_from, value);
            return "there isn't the card";
        }
        let parts = card.split(",")
        if (parts[10] != "status-1") {
            this.trans(user_from, value);
            return "the card is not on sale";
        }

        let sale_price = parseFloat(this.saleCardMap.get(card_id)) * this._nasToWei()
        if (value.lt(sale_price)) {
            return "your price is wrong";
        }

        let owner = this.card2userMap.get(card_id)
        this.trans(owner, 0.9 * sale_price);
        this.trans("n1LPKfnvF4HZdCALDKje8yE1p2td8eytRdK", 0.1 * sale_price);

        card.replace("status-1", "status0")
        this.cardMap.set(card_id, card)

        this.transCard(card_id, this.card2userMap.get(card_id), user_from);

        this.saleCardMap.delete(card_id)
        this.change_card_status(card_id, "status0")
        this.card2userMap.set(card_id, user_from)
        return sale_price;
    },

    transCard: function(card_id, old_owner, new_owner) {
        //let user_info_old = this.userMap.get(old_owner)
        let user_info_new = this.userMap.get(new_owner)

        //user_info_old["card_list"] = user_info_old["card_list"].replace("_"+card_id.toString()+"_","_")
        //user_info_old["user_card_cnt"] -= 1

        //this.userMap.set(old_owner,user_info_old)

        user_info_new["card_list"] += card_id.toString() + "_"
        user_info_new["user_card_cnt"] += 1

        this.userMap.set(new_owner, user_info_new)

        return true;
    },


    get_free_card: function() {
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        if (!user_info) {
            let myDate = new Date();
            let time = myDate.toLocaleString();
            let name = this.test_vip().split(",")[1]
            user_info = {
                "user_free": 0,
                "user_name": name + this.userMap_cnt.toString(),
                "user_card_cnt": 0,
                "card_list": "_",
                "status": 0,
                "lasttime": time,
                "power": 10,
                "match": "_0_",
                "team": "_"
            };
            this.userMap.set(user_from, user_info)
            this.userMap_cnt++
                //this.get_free_card()
        }
        //user_info = this.userMap.get(user_from)
        if (user_info["user_free"]) {
            return "you have got free cards"
        }
        //let id = []
        for (let i = 0; i < 5; i++) {
            let card_id = this.cardMap_cnt
            //user_info["team"] += card_id+"_"
            //id.push(card_id)
            //let card_type = this.random_all_card()
            let card = this.test_not_goalkeeper();
            if (i == 0) {
                /*
                let card_change = [62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80,
                    81, 171, 178, 179, 180, 185, 186, 187, 188, 189, 190, 191, 192, 193, 197, 198, 199,
                    202, 203, 204, 208, 214, 215, 218, 221, 222, 223, 226, 227, 229, 251, 252, 270, 277,
                    280, 283, 287, 290, 291, 292, 295, 299]
                let mid_type = this.random_goalkeeper_card()
                card_type = card_change[mid_type]
                */
                card = this.test_goalkeeper();
            }
            //card.toString().replace(/status0/g,"status1")
            this.cardMap.set(card_id, card)
            //this.change_card_status(card_id,"status1")
            this.cardMap_cnt++
                //let current_id = user_info["user_card_cnt"].toString()
                //user_info[current_id] = card_id
                user_info["card_list"] += card_id.toString() + "_"
            user_info["user_card_cnt"] += 1
            this.card2userMap.set(card_id, user_from)
        }
        user_info["user_free"] = 1
        //this.change_user_team(id[0],id[1],id[2],id[3],id[4])
        //user_info["team"] = user_info["card_list"]
        this.userMap.set(user_from, user_info)
        return user_info
    },

    get_common_card: function() {
        let value = Blockchain.transaction.value;
        if (value.lt(this.common_card_price)) {
            return "your price is wrong";
        }
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let name = this.test_vip().split(",")[1]
        if (!user_info) {
            let myDate = new Date();
            let time = myDate.toLocaleString();
            user_info = {
                "user_free": 0,
                "user_name": name + this.userMap_cnt.toString(),
                "user_card_cnt": 0,
                "card_list": "_",
                "status": 0,
                "lasttime": time,
                "power": 10,
                "match": "_0_",
                "team": "_"
            };
            this.userMap.set(user_from, user_info)
            this.userMap_cnt++
                //this.get_free_card()
        }
        let card_id = this.cardMap_cnt
        //let card_type = this.random_common_card()
        let card = this.test_common()
        this.cardMap.set(card_id.toString(), card)
        this.cardMap_cnt++
            //let current_id = user_info["user_card_cnt"].toString()
            //user_info[current_id] = card_id
            user_info["card_list"] += card_id.toString() + "_"
        user_info["user_card_cnt"] += 1
        this.card2userMap.set(card_id, user_from)
        this.userMap.set(user_from, user_info)
        this.vip_count += 1
        this.trans("n1LPKfnvF4HZdCALDKje8yE1p2td8eytRdK", value.toString());
        return card
    },

    get_vip_card: function() {
        let value = Blockchain.transaction.value;
        if (value.lt(this.vip_card_price)) {
            return "your price is wrong";
        }
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let name = this.test_vip().split(",")[1]
        if (!user_info) {
            let myDate = new Date();
            let time = myDate.toLocaleString();
            user_info = {
                "user_free": 0,
                "user_name": name + this.userMap_cnt.toString(),
                "user_card_cnt": 0,
                "card_list": "_",
                "status": 0,
                "lasttime": time,
                "power": 10,
                "match": "_0_",
                "team": "_"
            };
            this.userMap.set(user_from, user_info)
            this.userMap_cnt++
                //this.get_free_card()
        }
        let card_id = this.cardMap_cnt
        //let card_type = this.random_vip_card()
        let card = this.test_vip();
        this.cardMap.set(card_id.toString(), card)
        this.cardMap_cnt++
            //let current_id = user_info["user_card_cnt"].toString()
            //user_info[current_id] = card_id
            user_info["card_list"] += card_id.toString() + "_"
        user_info["user_card_cnt"] += 1
        this.card2userMap.set(card_id, user_from)
        this.userMap.set(user_from, user_info)
        this.vip_count += 1
        this.trans("n1LPKfnvF4HZdCALDKje8yE1p2td8eytRdK", value.toString());
        return card
    },

    get_user_player: function(address) {
        let user_info = this.userMap.get(address)
        return user_info
    },

    user_login: function() {
        let user_from = Blockchain.transaction.from;
        let user_info = this.userMap.get(user_from)
        if (!user_info) {
            //this.get_free_card()
            return "first"
        } else {
            return user_info
        }
    },

    get_free_power: function() {
        let user_from = Blockchain.transaction.from;
        let user_info = this.userMap.get(user_from)
        let myDate = new Date();
        let time = myDate.toLocaleString();
        let date = time.split(",")[0]
        let olddate = user_info["lasttime"].split(",")[0]
        if (date != olddate) {
            user_info["power"] += 5
            user_info["lasttime"] = time
            this.userMap.set(user_from, user_info)
            return true
        }
        return false
    },

    get_user_cnt: function() {
        return this.userMap_cnt
    },

    sale_my_card: function(card_id, price) {
        if (parseFloat(price) < parseFloat(this.common_card_price / this._nasToWei())) {
            return "low price"
        }
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let card_list = user_info["card_list"]
        if (card_list.indexOf("_" + card_id + "_") == -1) {
            return "you don't have the card"
        }
        let card = this.cardMap.get(card_id);
        let parts = card.split(",")
        if (parts[10] == "status1") {
            return "the card is in your team";
        } else if (parts[10] == "status-1") {
            return "the card is on the market";
        }
        this.change_card_status(card_id, "status-1")
        this.saleCardMap.set(card_id, price)
        this.saleCardIndexMap.set(this.saleCardMap_cnt.toString(), card_id)
        this.saleCardMap_cnt++

            //let user_info_old = this.userMap.get(old_owner)
            //let user_info_new = this.userMap.get(new_owner)

            user_info["card_list"] = user_info["card_list"].replace("_" + card_id.toString() + "_", "_")
        user_info["user_card_cnt"] -= 1

        this.userMap.set(user_from, user_info)
        return card_id + "," + price
    },

    cancle_sale_mycard: function(card_id) {
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let owner = this.card2userMap.get(card_id)
        if (owner != user_from) {
            return "you don't have the right"
        }
        let card = this.cardMap.get(card_id);
        card.replace("status-1", "status0")
        this.cardMap.set(card_id, card)
        this.saleCardMap.delete(card_id)
        return 1
    },

    foreach_sale_card: function() {
        let l = this.saleCardMap_cnt
        let res = ""
        for (let i = 1; i < l; i++) {
            let salecard_id = this.saleCardIndexMap.get(i)
            let salecard_price = this.saleCardMap.get(salecard_id)
            if (!salecard_price) {
                continue
            }
            let salecard_data = this.cardMap.get(salecard_id)
            if (res === "") {
                res += salecard_id + "~" + salecard_data + "~" + salecard_price
            } else {
                res += "_" + salecard_id + "~" + salecard_data + "~" + salecard_price
            }
        }
        return res
    },

    foreach_rank_card: function() {
        let l = this.rankMap_cnt
        let res = ""
        for (let i = 1; i < l; i++) {
            let rankcard = this.rankuserMap.get(i.toString())
            if (res === "") {
                res += i.toString() + ":" + rankcard.toString()
            } else {
                res += "_" + i.toString() + ":" + rankcard.toString()
            }
        }
        return res
    },

    change_user_team: function(id1, id2, id3, id4, id5) {
        //panduan fanhuizhi
        let dic = {}
        if (!dic[id1]) {
            dic[id1] = 1
        }
        if (!dic[id2]) {
            dic[id2] = 1
        }
        if (!dic[id3]) {
            dic[id3] = 1
        }
        if (!dic[id4]) {
            dic[id4] = 1
        }
        if (!dic[id5]) {
            dic[id5] = 1
        }
        if (dic.length < 5) {
            return "wrong"
        }

        if (!this.judge_card_in_user(id1)) {
            return "you don't have the card"
        }


        if (!this.check_card_not_status(id1, "status-1")) {
            return "you can't use the card"
        }
        if (!this.judge_card_in_user(id2)) {
            return "you don't have the card"
        }
        if (!this.check_card_not_status(id2, "status-1")) {
            return "you can't use the card"
        }
        if (!this.judge_card_in_user(id3)) {
            return "you don't have the card"
        }
        if (!this.check_card_not_status(id3, "status-1")) {
            return "you can't use the card"
        }
        if (!this.judge_card_in_user(id4)) {
            return "you don't have the card"
        }
        if (!this.check_card_not_status(id4, "status-1")) {
            return "you can't use the card"
        }
        if (!this.judge_card_in_user(id5)) {
            return "you don't have the card"
        }
        if (!this.check_card_not_status(id5, "status-1")) {
            return "you can't use the card"
        }

        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let old_team = user_info["team"]
        if (old_team != "_") {
            let old_parts = old_team.split("_")
            for (let i = 1; i < 6; i++) {
                this.change_card_status(old_parts[i], "status0")
            }
        } else {
            this.rankuserMap.set(this.rankMap_cnt, user_from)
            this.userrankMap.set(user_from, this.rankMap_cnt)
            this.rankMap_cnt += 1;
        }
        //判断ID以及status
        let newteam = "_" + id1 + "_" + id2 + "_" + id3 + "_" + id4 + "_" + id5 + "_"
        user_info["team"] = newteam
        this.change_card_status(id1, "status1")
        this.change_card_status(id2, "status1")
        this.change_card_status(id3, "status1")
        this.change_card_status(id4, "status1")
        this.change_card_status(id5, "status1")
        this.userMap.set(user_from, user_info)
        return user_info["team"]
    },

    judge_card_in_user: function(card_id) {
        let user_from = Blockchain.transaction.from
        let user_info = this.userMap.get(user_from)
        let card_list = user_info["card_list"]
        if (card_list.indexOf("_" + card_id.toString() + "_") == -1) {
            return 0
        }
        return 1
    },

    check_card_status: function(card_id, status) {
        let card = this.cardMap.get(card_id)
        let parts = card.split(",")
        if (parts[10] == status) {
            return 1
        }
        return 0
    },

    check_card_not_status: function(card_id, status) {
        let card = this.cardMap.get(card_id)
        let parts = card.split(",")
        if (parts[10] != status) {
            return 1
        }
        return 0
    },

    change_card_status: function(card_id, new_status) {
        let card = this.cardMap.get(card_id)
        let parts = card.split(",")
        parts[10] = new_status
        let newcard = parts[0]
        for (let i = 1; i < 11; i++) {
            newcard += "," + parts[i]
        }
        this.cardMap.set(card_id, newcard)
        return 1
    },

    random_vs: function() {
        let num = Math.random().toFixed(2) * 100
        return num;
    },

    create_team: function(cards) {
        var attackArr = []
        var defend = []
        var id = []
        var position = []
        var team = [0, 0, 0, 0, 0]
        var visited = [false, false, false, false, false]
        for (var i = 1; i < 6; i++) {
            let card = this.cardMap.get(cards[i])
            let parts = card.split(",")
            attackArr.push(parts[2])
            defend.push(parts[3])
            id.push(cards[i])
            position.push(parts[8])
        }
        for (let i = 0; i < 5; i++) {
            if (parseInt(position[i]) == 2) {
                visited[i] = true;
                team[4] = id[i];
                break;
            }
        }
        var attacker = 1
        for (let i = 0; i < 5; i++) {
            if (!visited[i] && parseFloat(attackArr[i]) > parseFloat(attackArr[attacker])) {
                attacker = i;
            }
        }
        visited[attacker] = true;
        team[0] = id[attacker];

        var defender = 1
        for (let i = 0; i < 5; i++) {
            if (!visited[i] && parseFloat(defend[i]) > parseFloat(defend[defender])) {
                defender = i;
            }
        }
        visited[defender] = true;
        team[3] = id[defender];
        var flag = 1;
        for (let i = 0; i < 5; i++) {
            if (!visited[i]) {
                team[flag] = id[i];
                visited[i] = true;
                flag++;
            }
        }
        return team;
    },

    get_player_basic_args: function(playerId) {
        let card = this.cardMap.get(playerId)
        let parts = card.split(",")
        let attack_arg = parseFloat(parts[2]) + parseFloat(parts[5]) * parseFloat(parts[9])
        let defend_arg = parseFloat(parts[3]) + parseFloat(parts[6]) * parseFloat(parts[9])
        let speed_arg = parseFloat(parts[4]) + parseFloat(parts[7]) * parseFloat(parts[9])
        return [attack_arg, defend_arg, speed_arg]
    },

    attack: function(teamA, teamB) { // A attack B
        let defenderA = this.get_player_basic_args(teamA[3])
        let defenderB = this.get_player_basic_args(teamB[3])
        let attackerA = this.get_player_basic_args(teamA[0])
        let attackerB = this.get_player_basic_args(teamB[0])
        let keeperA = this.get_player_basic_args(teamA[4])
        let keeperB = this.get_player_basic_args(teamB[4])
        let middleA1 = this.get_player_basic_args(teamA[1])
        let middleB1 = this.get_player_basic_args(teamB[1])
        let middleA2 = this.get_player_basic_args(teamA[2])
        let middleB2 = this.get_player_basic_args(teamB[2])
        let middleA = middleA1 ? Math.random() > 0.5 : middleA2;
        let middleB = middleB1 ? Math.random() > 0.5 : middleB2;

        if (Math.random() > Math.min(Math.max(parseFloat(defenderA[0] * 1.6 - attackerB[1]) / 100, 0.5), 0.98)) { //defender to middle
            return 0;
        } else {
            if (Math.random() > Math.min(Math.max(parseFloat(middleA[0] * 1.4 - middleB[1]) / 100, 0.5), 0.98)) { //middle to attacker
                return 0;
            } else {
                if (Math.random() > Math.min(Math.max(parseFloat(attackerA[0] * 1.2 - defenderB[1]) / 100, 0.4), 0.98)) { //attacker pass defender
                    return 0;
                } else {
                    if (Math.random() > Math.min(Math.max(parseFloat(attackerA[0] * 1.5 - keeperB[2]) / 100, 0.2), 0.98)) { //dandao
                        return 0;
                    }
                }
            }
        }
        return 1;
    },

    team_vs: function(userid) {
        let user_from = Blockchain.transaction.from;
        // if(user_from == userid){
        //     return "you can't compete with yourself"
        // }
        let user_infoA = this.userMap.get(user_from)
        let user_infoB = this.userMap.get(userid)

        if (user_infoA["power"] < 1) {
            return "your power is not enough"
        }

        let cards_A = user_infoA["team"].split("_")
        let cards_B = user_infoB["team"].split("_")
        let team_A = this.create_team(cards_A)
        let team_B = this.create_team(cards_B)
        let att_A = 0
        let defen_A = 0
        let speed_A = 0
        let att_B = 0
        let defen_B = 0
        let speed_B = 0
        let score_A = 0
        let score_B = 0
        for (let i = 0; i < 5; i++) {
            let args_A = this.get_player_basic_args(team_A[i])
            let args_B = this.get_player_basic_args(team_B[i])
            att_A += args_A[0]
            speed_A += args_A[1]
            defen_A += args_A[2]
            att_B += args_B[0]
            speed_B += args_B[1]
            defen_B += args_B[2]
        }

        let time_A = Math.min(Math.max(speed_A / 40, 3), 7);
        let time_B = Math.min(Math.max(speed_B / 40, 3), 7);

        for (let i = 0; i < time_A; i++) {
            score_A += this.attack(team_A, team_B);
        }

        for (let i = 0; i < time_B; i++) {
            score_B += this.attack(team_B, team_A);
        }

        let teampoint = 0

        if (score_A > score_B) {
            let dif = parseFloat((att_A + defen_A - att_B - defen_B) / 10)
            teampoint = 1
            if (dif > 0) {
                teampoint = parseFloat((2 / dif).toFixed(2))
                if (teampoint < 0.2) {
                    teampoint = 0.2
                } else if (teampoint > 1) {
                    teampoint = 1
                }
            }
            for (let i = 1; i < 6; i++) {
                let card = this.cardMap.get(cards_A[i])
                let parts = card.split(",")
                parts[9] = parseFloat(parseFloat(parts[9]) + teampoint)
                let newcard = parts[0]
                for (let i = 1; i < 10; i++) {
                    newcard += "," + parts[i]
                }
                this.cardMap.set(cards_A[i], newcard)
            }
            if (this.userrankMap.get(user_from) > this.userrankMap.get(userid)) {
                let rank_B = this.userrankMap.get(userid)
                let rank_A = this.userrankMap.get(user_from)

                this.userrankMap.set(userid, rank_A)
                this.rankuserMap.set(rank_A, userid)
                this.userrankMap.set(user_from, rank_B)
                this.rankuserMap.set(rank_B, user_from)
            }
        }

        let match = user_from + "_" + userid + "_" + score_A + "_" + score_B + "_" + teampoint
        this.matchMap.set(this.matchMap_cnt, match)

        //user_infoA["lasttime"] = time
        user_infoA["match"] = "_" + this.matchMap_cnt.toString() + "_"
        user_infoA["power"] -= 1
        //user_infoB["match"] += "_"+this.matchMap_cnt.toString() + "_"

        this.userMap.set(user_from, user_infoA)
        this.userMap.set(userid, user_infoB)
        this.matchMap_cnt += 1
        return this.matchMap_cnt - 1

    },
    get_match_info: function(id) {
        let match = this.matchMap.get(id)
        return match
    },

    get_user_power: function() {
        let user_from = Blockchain.transaction.from;
        let user_info = this.userMap.get(user_from);
        return user_info["power"]
    }


}

module.exports = Card;