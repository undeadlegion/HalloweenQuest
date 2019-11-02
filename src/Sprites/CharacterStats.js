/*Stats
In this you will be able to view you character statistics
LVL
You start the game at level 1 and can go up to 10.  Everytime you go up a level all of your stats increase and your HP and MP are fully restored. Also depending on the level you gain a new spell. 
EXP
Experience points are received every time you defeat an enemy. You need a certain amount in order to reach the next level.  The stat itself will show         “EXP to Next LVL”.
HP
Your total hit points if they fall to zero its game over and you get booted right back to the title screen.
MP
Your magic points allows you to use magic spells if you run out you won’t be able to use your magic spells for a while. 
ATK
Attack determines how much damage your attack option will do to the enemy.
DEF
Defense determines how much of an enemy’s attack you are able to resist. 
MG. ATK
Magic Attack determines how much damage you magic attacks will do to the enemy. 
MG. DEF
 Magic Defense determines how much of an enemy’s magic attack you are able to resist .
SPEED 
Speed determines who goes first in the battle, if you have higher speed stat than the enemy then you will go first but if the enemy has a higher speed stat than you then they will go first.

HP: 10
MP: 10
Attack: 8
Defense: 7
Magic Attack: 8
Magic Defense: 7
Speed: 10

*/

export default {
    "LVL": 1,
    "EXP": 0,
    "HP": 10,
    "MP": 10,
    "ATK": 8,
    "DEF": 7,
    "MG ATK": 8,
    "MG DEF": 7,
    "SPEED": 10,
    "WEAPON": 0,
    "MAGIC": {
        "HEAL": {
            "Level": 1,
            "MP used": 2
        },
        "FIREBALL": {
            "Level": 2,
            "MP used": 2
        },
        "BULK": {
            "Level": 4,
            "MP used": 4
        },
        "BUFF": {
            "Level": 6,
            "MP used": 4
        },
        "CHARGE": {
            "Level": 8,
            "MP used": 6
        },
        "TRICKORTREAT": {
            "Level": 10,
            "MP used": 10
        }
    }
}