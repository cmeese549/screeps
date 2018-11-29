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
                creep.memory.state = 'dropoff';
                let status = creep.upgradeController(creep.room.controller)
                switch (status)
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(creep.room.controller);
                        break;
                  default:
                        break;
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
                        creep.memory.state = 'movingToMine';
                        break;
                    default:
                        creep.memory.state = 'mining';
                        break;
                }
            }
            else if (creep.memory.state == 'dropoff')
            {
                let status = creep.upgradeController(creep.room.controller);
                switch (status)
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(creep.room.controller);
                        break;
                    default:
                        if(creep.carry.energy == 0)
                        {
                            creep.memory.state = 'mining';
                        }
                        break;
                }
            }
            else if (creep.memory.state == "movingToMine")
            {
                let source = Game.getObjectById(creep.memory.destination);
                switch (creep.harvest(source))
                {
                    case(ERR_NOT_IN_RANGE):
                        creep.moveTo(source);
                        creep.memory.destination = source.id;
                        creep.memory.state = 'movingToMine';
                        break;
                    default:
                        creep.memory.state = 'mining';
                        break;
                }
            }
        }
    }
}


               
              