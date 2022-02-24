// Get JSON
async function getDinos() {
    const dinoJson = await fetch("./dino.json");
    const data = await dinoJson.json();
    
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
// Create Human Constructor
class Human {
    constructor(species, height, weight, diet) {
        this.species = species;
        this.weight = weight;
        this.height = height;
        this.diet = diet;

    }
}
// Comparison Function 1 = height
function compareHeight(dinoHeight, humanHeight) {
    const heightRatio = Math.round(dinoHeight / humanHeight);
    
    if (heightRatio === 1) {
        return `You have the same height!`
    } else if (heightRatio > 1) {
        return `The dino is about ${heightRatio} times taller than you!`;
    } else {
        return `The dino is about ${heightRatio} times smaller than you!`;
    }
}

// Comparison Function 2 = weight
function compareWeight (dinoWeight, humanWeight) {
    const weightRatio = Math.round(dinoWeight / humanWeight);    
    
    if (weightRatio === 1) {
        return `Your weight is the same as the dino!`;
    } else if (weightRatio > 1) {
        return `The dino weighs about ${weightRatio} times more than you!`;
    } else {
        return `The dino weighs about ${weightRatio} times less than you!`;
    }
}


// Comparison Function 3 = diet
function compareDiet(dinoDiet, humanDiet) {
    if (dinoDiet === humanDiet) {
        return `You share the same diet!`;
    } else {
        return `The dino is a ${dinoDiet}, different from your diet!`;
    }
}

// Function for random number
function generateRandomInt(min, max) {
    return Math.floor((Math.random() * (max - min)) + min);
}
//Switch: Random Fact with given random number
function randomFact(dinoWeight, humanWeight, dinoHeight, humanHeight, dinoDiet, humanDiet, dinoWhen ) {
    switch (generateRandomInt(1, 4)) {
        case 1: return compareWeight(dinoWeight, humanWeight);
        case 2: return compareHeight(dinoHeight, humanHeight);
        case 3: return compareDiet(dinoDiet, humanDiet);
        case 4: return `The dino lived during the ${dinoWhen}`;
            
    }
}

// Use IIFE to get human data from form
const human = (function () {
    const humanName = document.getElementById('name').value;
    const humanHeight = (Number(document.getElementById('feet').value) * 12 + Number(document.getElementById('inches').value));
    const humanWeight = Number(document.getElementById('weight').value);
    const humanDiet = document.getElementById('diet').value;
    
    const humanObj = new Human(humanName, humanHeight, humanWeight, humanDiet);
    
    return humanObj;
    
})();

// Comparison Function for Click event
function startComparison() {
    // Hide form after submit
    document.getElementById('dino-compare').style.display = "none";
    
    const grid = document.getElementById('grid');

    // Let's create the grid!
    getDinos().then(res => {
        let dinos = res.map(dino => new Dino(dino.species, dino.weight, dino.height, dino.diet, dino.where, dino.when, dino.fact));
        dinos.splice(4, 0, human);

        dinos.forEach((dino, index) => {
            
            const tile = document.createElement('div');
            const name = document.createElement('h4');
            const image = document.createElement('img');
            const fact = document.createElement('p');

            if (dino.species === "Pigeon") {
                fact.innerHTML = "All birds are Dinosaurs."
            } else if (index === 4) { 
                fact.innerHTML = "That's you!";
            }
            else {
                fact.innerHTML = randomFact(dino.weight, human.weight, dino.height, human.height, dino.diet, human.diet, dino.when);
            }
            if (index === 4) {
                image.setAttribute('src', `/images/human.png`);            
            } else {
                image.setAttribute('src', `/images/${dino.species.toLowerCase()}.png`);
                
            }
            name.innerHTML = dino.species;

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
