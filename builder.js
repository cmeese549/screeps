const upgrader = require('upgrader');

module.exports =
{
    run : function (creeps)
    {
        for (let i = 0; i < creeps.length; i++)
        {
            creep = creeps[i];
            if(creep.memory.state == 'spawning')
            {
                creep.memory.state = 'mining';
            }
    
         if (creep.memory.state == 'mining' && creep.carry.energy == creep.carryCapacity)
         {
                
            let source = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            
            if(source != undefined)
            {
                switch (creep.build(source))
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(source);
                        creep.memory.destination = source.id;
                        creep.memory.state = 'building';
                        break;
                    default:
                        creep.memory.state = 'building';
                        break;
                }
            }
            else
            {
                upgrader.run([creep]);
            }
    
            }
            else if (creep.memory.state == 'mining' && creep.carry.energy < creep.carryCapacity)
            {
                let source = creep.pos.findClosestByPath(FIND_SOURCES);
                switch (creep.harvest(source))
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(source);
                        creep.memory.destination = source.id;
                        break;
                    default:
                        break;
                }
            }
            else if (creep.memory.state == 'building' && creep.carry.energy > 0)
            {
                
            let source = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
            
            if(source != undefined)
            {
                switch (creep.build(source))
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(source);
                        creep.memory.destination = source.id;
                        break;
                    default:
                        break;
                }
            }
            else
            {
                upgrader.run([creep]);
            }
    
            }
            else if (creep.memory.state == 'building' && creep.carry.energy == 0)
            {
                let source = Game.getObjectById(creep.memory.destination);
                switch (creep.harvest(source))
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(source);
                        creep.memory.destination = source.id;
                        creep.memory.state = 'mining';
                        break;
                    default:
                        creep.memory.state = 'mining';
                        break;
                }
            }
        }
    }
}


       