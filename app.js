async function getDinos() {
    const dinoJson = await fetch("./dino.json");
    const data = await dinoJson.json();
    // console.log(data.Dinos);
    
    return data.Dinos;

}
    // Create Dino Constructor
class Dino {
    constructor(species, weight, height, diet, where, when, fact) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;
        this.where = where;
        this.when = when;
        this.fact = fact;
    }  
}

class Human {
    constructor(species, height, weight, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;

    }
}

function compareHeight(dinoHeight, humanHeight) {
    const heightRatio = Math.round(dinoHeight / humanHeight);

    if (heightRatio === 1) {
        return `You have the same height!`
    } else if (heightRatio > 1) {
        return `The dino is about ${heightRatio} times taller than you!`;
    } else {
        return `The dino is about ${heightRatio} times smaller than you!`;
    }
    // Create Dino Compare Method 2
    // NOTE: Weight in JSON file is in lbs, height in inches.
}

function compareWeight (dinoWeight, humanWeight) {
    const weightRatio = Math.round(dinoWeight / humanWeight);

    if (weightRatio === 1) {
        return `Your weight is the same as the dino!`;
    } else if (weightRatio > 1) {
        return `The dino weighs about ${weightRatio} times more than you!`;
    } else {
        return `The dino weighs about ${weightRatio} times less than you!`;
    }
    // Create Dino Compare Method 1
    // NOTE: Weight in JSON file is in lbs, height in inches. 
}


function compareDiet(dinoDiet, humanDiet) {
    if (dinoDiet === humanDiet) {
        return `You share the same diet!`;
    } else {
        return `The dino is a ${dinoDiet}, different from your diet!`;
    }
    // Create Dino Compare Method 3
    // NOTE: Weight in JSON file is in lbs, height in inches.
}

// Random Number
function generateRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
//Switch: Random Fact
function randomFact(dinoWeight, humanWeight, dinoHeight, humanHeight, dinoDiet, humanDiet, dinoWhen ) {
    switch (generateRandomInt(1, 4)) {
        case 1: compareWeight(dinoWeight, humanWeight);
            break;
        case 2: compareHeight(dinoHeight, humanHeight);
            break;
        case 3: compareDiet(dinoDiet, humanDiet);
            break;
        case 4: `The dino lived during the ${dinoWhen}`;
            
    }
}


    // Use IIFE to get human data from form
const human = (function () {
    const humanName = document.getElementById('name').value;
    // const humanSpecies = "Homo sapiens";
    const humanHeight = (Number(document.getElementById('feet').value) * 12 + Number(document.getElementById('inches').value));
    const humanWeight = Number(document.getElementById('weight').value);
    const humanDiet = document.getElementById('diet').value;
    
    const humanObj = new Human(humanName, humanHeight, humanWeight, humanDiet);
    console.log(humanObj);
    
    return humanObj;
    
})();


function startComparison() {
    // To Do: Hide form
    
    const grid = document.getElementById('grid');

    getDinos().then(res => {
        let dinos = res.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
        console.log(dinos);
        dinos.splice(4, 0, human);


        dinos.forEach((dino) => {
            // console.log(compareWeight(dino.weight, human.weight));

            const tile = document.createElement('div');
            const name = document.createElement('h4');
            const fact = document.createElement('p');

            const generateRandomFact = randomFact(dino.weight, human.weight, dino.height, human.height, dino.diet, human.diet, dino.when);

            fact.innerHTML = generateRandomFact;
            name.innerHTML = dino.species;
            const image = document.createElement('img');
            image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
            tile.classList.add('grid-item');
            tile.appendChild(name);
            tile.appendChild(fact);
            tile.appendChild(image);
            grid.appendChild(tile);

        });
    })

}


// On button click, prepare and display infographic
document.getElementById('btn').addEventListener('click', startComparison);