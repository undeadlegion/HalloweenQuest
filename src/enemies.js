/* tie together all the data on each enemy
New enemy encounter rate 

Level 1: Troll Cauldron, Shy Nosferatu  
Level 2: Troll Cauldron, Shy Nosferatu  
Level 3:Troll Cauldron, Shy Nosferatu, Unsure Franky
Level 4:Troll Cauldron, Shy Nosferatu, Unsure Franky, Bed Sheet Ghost 
Level 5: Unsure Franky, Bed Sheet Ghost, Shy Nosferatu, Skell on Strings 
Level 6: Unsure Franky, Bed Sheet Ghost, Skell on Strings, Jak N Box  
Level 7: Bed Sheet Ghost, Skell on Strings, Jak N Box, Shadow Beast   
Level 8: Skell on Strings, Jak N Box, Shadow Beast, School Bully
Level 9: Jak N Box, Shadow Beast, School Bully
Level 10: Shadow Beast, School Bully

*/

export default {
    "skellOnStrings": {
        "name": "Skell on Strings",
        "probability": 0.12,
        "min level": 5,
        "max level": 8,
        "scale": 0.2,
        "xpos": 80,
        "ypos": 0,
        "HP": 26,
        "MP": 20,
        "Attack": 10,
        "Defense": 15,
        "Magic Attack": 20,
        "Magic Defense": 18,
        "Speed": 18,
        "EXP given": 4
    },
    "bedSheetGhost": {
        "name": "Bed Sheet Ghost",
        "probability": 0.15,
        "min level": 4,
        "max level": 7,
        "scale": 0.18,
        "xpos": 70,
        "ypos": -10,
        "HP": 24,
        "MP": 15,
        "Attack": 8,
        "Defense": 10,
        "Magic Attack": 19,
        "Magic Defense": 15,
        "Speed": 15,
        "EXP given": 4
    },
    "unsureFranky": {
        "name": "Unsure Franky",
        "probability": 0.15,
        "min level": 3,
        "max level": 6,
        "scale": 0.2,
        "xpos": 50,
        "ypos": 0,
        "HP": 22,
        "MP": 0,
        "Attack": 17,
        "Defense": 12,
        "Magic Attack": 0,
        "Magic Defense": 8,
        "Speed": 14,
        "EXP given": 4
    },
    "jak_n_box": {
        "name": "Jak N Box",
        "probability": 0.13,
        "min level": 6,
        "max level": 9,
        "scale": 0.2,
        "xpos": 0,
        "ypos": 0,
        "HP": 27,
        "MP": 15,
        "Attack": 20,
        "Defense": 15,
        "Magic Attack": 9,
        "Magic Defense": 12,
        "Speed": 17,
        "EXP given": 4
    },
    "schoolBully": {
        "name": "School Bully",
        "probability": 0.02,
        "min level": 8,
        "max level": 10,
        "scale": 0.18,
        "xpos": 0,
        "ypos": 0,
        "HP": 35,
        "MP": 15,
        "Attack": 25,
        "Defense": 22,
        "Magic Attack": 0,
        "Magic Defense": 21,
        "Speed": 24,
        "EXP given": 10
    },
    "shadowBeast": {
        "name": "Shadow Beast",
        "probability": 0.03,
        "min level": 7,
        "max level": 10,
        "scale": 0.24,
        "xpos": 0,
        "ypos": -20,
        "HP": 30,
        "MP": 25,
        "Attack": 15,
        "Defense": 12,
        "Magic Attack": 30,
        "Magic Defense": 25,
        "Speed": 22,
        "EXP given": 8
    },
    "shyNosferatu": {
        "name": "Shy Nosferatu",
        "probability": 0.2,
        "min level": 1,
        "max level": 5,
        "scale": 0.25,
        "xpos": 0,
        "ypos": -30,
        "HP": 17,
        "MP": 10,
        "Attack": 3,
        "Defense": 5,
        "Magic Attack": 13,
        "Magic Defense": 5,
        "Speed": 9,
        "EXP given": 3
    },
    "trollCauldron": {
        "name": "Troll Cauldron",
        "probability": 0.2,
        "min level": 1,
        "max level": 4,
        "scale": 0.33,
        "xpos": 0,
        "ypos": -90,
        "HP": 12,
        "MP": 0,
        "Attack": 13,
        "Defense": 7,
        "Magic Attack": 0,
        "Magic Defense": 0,
        "Speed": 8,
        "EXP given": 3
    }
}