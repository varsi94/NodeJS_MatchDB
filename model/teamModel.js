module.exports = {
    maxTeamId: 3,
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
        },
        {
            id: 3,
            name: "Wolfsburg",
            nationality: "német"
        }
    ],

    getTeamById : function(id) {
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
        this.maxTeamId++;
        team.id = this.maxTeamId;
        this.teams.push(team);
    }
};