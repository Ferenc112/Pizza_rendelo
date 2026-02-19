const pizzaData = {
  sizes: [
    { id: 1, nev: "Kicsi", meret: "S", ar: 0 },
    { id: 2, nev: "Közepes", meret: "M", ar: 800 },
    { id: 3, nev: "Nagy", meret: "L", ar: 1500 }
  ],

  basePrice: 2000,

  sauces: [
    { id: 1, nev: "Paradicsomos", ar: 300 },
    { id: 2, nev: "Tejfölös", ar: 400 }
  ],

  toppings: [
    { id: 1, nev: "Sajt", ar: 500 },
    { id: 2, nev: "Sonka", ar: 600 },
    { id: 3, nev: "Gomba", ar: 450 }
  ]
};

let selectSize = null;

function selectSize(sizeId) {
  selectSize = pizzaData.sizes.find(size => size.id === sizeId);
  updatePrice();
}

let selectSauce = null;

function selectSauce(sauceId) {
  selectSauce = pizzaData.sauces.find(sauce => sauce.id === sauceId);
  updatePrice();
}

let selectToppings = [];

function toggleTopping(toppingId) {
    const toping = pizzaData.toppings.find(t => t.id === toppingId);
    const exists = selectToppings.find(t => t.id === toppingId);

    if (exists) {
        selectToppings = selectToppings.filter(t => t.id !== toppingId);
    } else {
        selectToppings.push(toping);
    }
    console.log("Aktuális feltétek:", selectToppings);
}

function calculateTotal(){
    let total = pizzaData.basePrice;

    if (selectSize) {
        total += selectSize.ar;
    }

    if (selectSauce) {
        total += selectSauce.ar;
    }

    selectToppings.forEach(topping => {
        total += topping.ar;
    });
    return total;
}

function createOrderSummary() {
  return {
    basePrice: pizzaData.basePrice,
    size: selectedSize,
    sauce: selectedSauce,
    toppings: selectedToppings,
    total: calculateTotal()
  };
}
