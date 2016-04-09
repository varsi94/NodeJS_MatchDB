module.exports = {
    teams : [
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
    ],

    getTeam : function(id) {
        //visszaadja a megadott ID-hoz tartozó csapatot
        for (var i = 0; i < this.teams.length; i++) {
            var x = this.teams[i];
            if (x.id == id) {
                return x;
            }
        }
        return null;
    },

    getTeams: function() {
        return this.teams;
    },

    createTeam : function(team) {
        //létrehozza, és tárolja az adatbázisban a megadott csapatot
    }
};