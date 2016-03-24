module.exports = {
    getMatches : function() {
        //visszaadja az összes meccset
        return [];
    },

    searchMatches : function(keyword) {
        //visszaadja az összes meccset, aminek a bajnokság nevében, vagy valamelyik csapat nevében részleges
        //egyezést talál
        return [];
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