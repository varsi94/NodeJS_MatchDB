module.exports = {
    teams : [],

    getTeam : function(id) {
        //visszaadja a megadott ID-hoz tartozó csapatot
    },

    getTeams: function() {
        return [
            {
                id: 1,
                name: "Real Madrid",
                nationality: "Spaninsh"
            },
            {
                id: 2,
                name: "Barcelona",
                nationality: "Spanish"
            }
        ];
    },

    createTeam : function(team) {
        //létrehozza, és tárolja az adatbázisban a megadott csapatot
    }
};