const energyCollector = require('energyCollector');
const upgrader = require('upgrader');
const spawners = require('spawners');
const builders = require('builder');

function mainLoop()
{
    spawners.spawn();
    let creeps = getCreeps();
    console.log(creeps.energyCollectors.length + ' Energy Collectors;  ' + creeps.upgraders.length + ' Upgraders;  ' + creeps.builders.length + ' Builders;  ' + 
    ( _.sum(Game.creeps, (c) => typeof(c.memory.state) == 'string')));
    energyCollector.run(creeps.energyCollectors);
    upgrader.run(creeps.upgraders);
    builders.run(creeps.builders);
}

function getCreeps()
{
    let creepsArray = { energyCollectors : [], upgraders : [], builders: [] };
    for (let name in Game.creeps)
    {
        let creep = Game.creeps[name];
        switch (creep.memory.role)
        {
            case("Energy Collector"):
                creepsArray.energyCollectors.push(creep);
                break;
            case("Upgrader"):
                creepsArray.upgraders.push(creep);
                break;
            case("Builder"):
                creepsArray.builders.push(creep);
                break;
            default: 
                break;
        }
    }
    return creepsArray;
}

module.exports.loop = function()
{
    mainLoop();
}