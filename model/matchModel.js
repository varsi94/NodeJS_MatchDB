var dateFormat = require("dateformat");
dateFormat.masks.basic = "yyyy mmmm dS, hh:MM:ss";

module.exports = {
    matches: [ {
        id: 1,
        matchType: "Spanyol bajnokság",
        homeTeam: {
            name: "Barcelona",
            nationality: "spanyol"
        },
        awayTeam: {
            name: "Real Madrid",
            nationality: "spanyol"
        },
        homeScore: 1,
        awayScore: 2,
        spectators: 100000,
        date: dateFormat(new Date(2016, 3, 02, 20, 30, 0), "basic"),
        stadium: "Camp Nou",
        referee: "Hernández Hernández"
    }, {
        id: 2,
        matchType: "Bajnokok Ligája",
        homeTeam: {
            name: "Wolfsburg",
            nationality: "német"
        },
        awayTeam: {
            name: "Real Madrid",
            nationality: "spanyol"
        },
        homeScore: 2,
        awayScore: 0,
        spectators: 30000,
        date: dateFormat(new Date(2016, 3, 7, 20, 30, 0), "basic"),
        stadium: "Volkswagen Arena",
        referee: "Hernández Hernández"
    }],
    getMatches : function() {
        //visszaadja az összes meccset
        return this.matches;
    },

    searchMatches : function(keyword) {
        //visszaadja az összes meccset, aminek a bajnokság nevében, vagy valamelyik csapat nevében részleges
        //egyezést talál
        var result = [];
        for (var i = 0; i < this.matches.length; i++) {
            var match = this.matches[i];
            var homeTeamName = match.homeTeam.name.toLocaleLowerCase();
            var awayTeamName = match.awayTeam.name.toLocaleLowerCase();
            var competition = match.matchType.toLocaleLowerCase();
            if (homeTeamName.indexOf(keyword) != -1 || awayTeamName.indexOf(keyword) != -1 || competition.indexOf(keyword) != -1) {
                result.push(match);
            }
        }
        return result;
    },

    deleteMatch : function(id) {
        //törli a megadott azonosítóval rendelkező meccset
    },

    modifyMatch : function(id, match) {
        //módosítja a megadott azonosítóval rendelkező meccset a kapott paraméterre
    },

    createMatch : function(match) {
        //létrehozza a meccset
    },

    checkMatchId : function(id) {
        //visszaadja, hogy létezik-e ilyen meccs azonosító
        return Math.random() < 0.5;
    }
};