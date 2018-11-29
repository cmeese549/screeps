module.exports = 
{
    spawn : function ()
    {
        let numCollectors = _.sum(Game.creeps, (c) => c.memory.role == 'Energy Collector');
        let numUpgraders =  _.sum(Game.creeps, (c) => c.memory.role == 'Upgrader');
        let numBuilders = _.sum(Game.creeps, (c) => c.memory.role == 'Builder');
        let body = [WORK,WORK,CARRY,MOVE]
        let memory = { state: "spawning", role: "Energy Collector"}
        if(numBuilders < 5 && numCollectors > 5)
        {
            memory.role = "Builder";
        }
        else if(numCollectors - numUpgraders > 2 && numCollectors > numUpgraders && numCollectors > 5)
        {
            memory.role = "Upgrader";
            body[1] = CARRY;
            body[2] = MOVE;
        }

        for (const i in Game.spawns)
        {
            Game.spawns[i].createCreep(body, undefined, memory);
        }
    }
}