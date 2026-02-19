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
let selectSauce = null;
let selectToppings = [];
let cart = [];

function toggleTopping(toppingId) {
    const topping = pizzaData.toppings.find(t => t.id === toppingId);
    const exists = selectToppings.find(t => t.id === toppingId);

    if (exists) {
        selectToppings = selectToppings.filter(t => t.id !== toppingId);
    } else {
        selectToppings.push(topping);
    }
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
    size: selectSize,
    sauce: selectSauce,
    toppings: [...selectToppings],
    total: calculateTotal()
  };
}

function updatePrice() {
    const total = calculateTotal();
    document.getElementById('totalPrice').textContent = total;
}

function updateCartDisplay() {
    const cartDiv = document.getElementById('cart');
    cartDiv.innerHTML = '<h3>Kosár</h3>';
    if (cart.length === 0) {
        cartDiv.innerHTML += '<p>A kosár üres.</p>';
        return;
    }
    let grandTotal = 0;
    cart.forEach((order, index) => {
        grandTotal += order.total;
        cartDiv.innerHTML += `
            <div class="order" style="border: 1px solid #ccc; margin: 10px; padding: 10px;">
                <p>Méret: ${order.size ? order.size.nev : 'Nincs'}</p>
                <p>Szósz: ${order.sauce ? order.sauce.nev : 'Nincs'}</p>
                <p>Feltétek: ${order.toppings.map(t => t.nev).join(', ') || 'Nincs'}</p>
                <p>Összeg: ${order.total} Ft</p>
                <button onclick="deleteOrder(${index})">Törlés</button>
            </div>
        `;
    });
    cartDiv.innerHTML += `<p><strong>Teljes végösszeg: ${grandTotal} Ft</strong></p>`;
}

function deleteOrder(index) {
    cart.splice(index, 1);
    updateCartDisplay();
}

document.addEventListener('DOMContentLoaded', () => {
    // meret
    document.querySelectorAll('input[name="size"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectSize = pizzaData.sizes.find(s => s.id == e.target.value);
            updatePrice();
        });
    });
    // sauce 
    document.querySelectorAll('input[name="sauce"]').forEach(radio => {
        radio.addEventListener('change', (e) => {
            selectSauce = pizzaData.sauces.find(s => s.id == e.target.value);
            updatePrice();
        });
    });
    // topping feltétek
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
            toggleTopping(parseInt(e.target.value));
            updatePrice();
        });
    });
    // rendelés gomb
    document.getElementById('orderBtn').addEventListener('click', () => {
        const order = createOrderSummary();
        cart.push(order);
        updateCartDisplay();
    });
    updatePrice();
});
