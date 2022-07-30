
let names = ['Pizza Margherita', 'Pasta Verdura', 'Bruschetta',
    'Tomaten-Mozzarella-Spieße', 'gefüllte Paprika', 'gegrilltes Gemüse',
    'Pizza Spinaci e Gorgonzola', 'Pizza Salsiccia', 'Pizza Marinara',
    'Pasta Napoli', 'Penne alla relaxter Lachs', 'Tagliatelle in Spinat-Erdnuss-Sauce',
    'Insalata Caprese', 'Insalata di Mel', 'Grüner Salat mit Pesto Verde', 'Panzanella',];

let garnishes = ['mit Tomatensoße', 'mit Tomaten', 'mit Basilikum', 'mit Schafskäse',
    'mit Zucchini', 'mit Champignons', 'mit Thymian', 'mit extra Salsiccia',
    'mit Parmesan', 'mit Erdnusssoße', 'mit getrockneten Tomaten', 'mit Pinienkernen',
    'mit Pesto Verde dressing',];

let prices = [6, 7.50, 3, 4, 4.2, 5, 7, 8, 5.5, 6.7, 9, 8, 4.5, 5.5, 3.5, 3];

let basketContainer = document.getElementById('basket');
let totalsum = document.getElementById('totalsum');
let payButton = document.getElementById('payButton');

let popupBasketContainer = document.getElementById('popupBasket');
let popupTotalsum = document.getElementById('popupTotalsum');
let popupPayButton = document.getElementById('popupPayButton');

let basketAmounts = [];
let basketNames = [];
let basketGarnishes = [];
let garnishContainer = [];
let basketPrices = [];
let deliveryCost = 2;

loadBasket();

/**
 * 
 */
///////////////////////////////////////////////////// ADD & POPUP FUNCTIONS //////////////////////////////////////////////////////////////////


function stopProp(event) {
    event.stopPropagation();
}


function showLanguage() {
    document.getElementById('lang').classList.add('show-overlay-lang');
    document.getElementById('lang').classList.remove('close-overlay-lang');
}

function closeLanguage() {
    document.getElementById('lang').classList.add('close-overlay-lang');
    document.getElementById('lang').classList.remove('show-overlay-lang');
}

function removeEN() {
   location.reload();
}
function showDropdown() {
    document.getElementById('overlay').classList.add('show-overlay');
}

function closeDropdown() {
    document.getElementById('overlay').classList.remove('show-overlay');
}

function openPopup(i) {
    document.getElementById('selectGarnish').classList.remove('d-none');
    chooseGarnishPopup(i);
}

function closePopup() {
    document.getElementById('selectGarnish').classList.add('d-none');
}


function showBasketPopup() {
    document.getElementById('basketBody').classList.add('d-none');
    document.getElementById('basketPopup').classList.remove('d-none');
    renderPopupBasket();
}


function closeBasketPopup() {
    document.getElementById('basketPopup').classList.add('d-none');
    document.getElementById('basketBody').classList.remove('d-none');
}


function chooseGarnishPopup(i) {
    let chooseGarnish = document.getElementById('selectGarnish');
    chooseGarnish.innerHTML = '';
    chooseGarnish.innerHTML += generateGarnishHTML(i);
    generateGarnishes(); renderGarnish(); renderBasket(); renderPopupBasket(); loadBasket();
}


function addGarnish(garnish) {
    let index = garnishContainer.indexOf(garnishes[garnish]);
    if (index < 0) {
        garnishContainer.push(garnishes[garnish]);
    } renderGarnish(); saveBasket();
}



function addToBasket(i) {
    let index = basketNames.indexOf(names[i]);
    if (index == -1) {
        basketNames.push(names[i]);
        basketPrices.push(prices[i]);
        basketAmounts.push(1);
        basketGarnishes.push(garnishContainer);
        garnishContainer = [];
    } else {
        basketAmounts[index]++;
    } renderBasket(); renderPopupBasket(); renderBasketButton(); saveBasket(); closePopup();
}


////////////////////////////////////// RENDER FUNCTIONS //////////////////////////////////////////////////////////////////


function render() {
    renderBasketButton();
    renderPopupBasket();
    renderBasket();
    renderDishes();
    saveBasket();
}


function renderDishes() {
    for (let i = 0; i < names.length; i++) {
        dish_content.innerHTML += generateFoodCard(i);
        if (i == 2)
            dish_content.innerHTML += antipastiTemplate();
        if (i == 5)
            dish_content.innerHTML += pizzaTemplate();      /**Generates the header for every food category*/
        if (i == 8)
            dish_content.innerHTML += pastaTemplate();
        if (i == 11)
            dish_content.innerHTML += salateTemplate();
    }
}


function renderBasket() {
    basketContainer.innerHTML = '';
    if (basketAmounts.length <= 0) {
        basketContainer.innerHTML = templateEmptyBasket();
        payButton.innerHTML = '';
    } else {
        payButton.innerHTML += '';
        for (let i = 0; i < basketNames.length; i++) {
            basketContainer.innerHTML += generateBasketContainer(i)
            totalsum.innerHTML = '';
            totalsum.innerHTML += generateTotalSum();
            payButton.innerHTML = generatePayButton();
        }
    } saveBasket(); loadBasket();
}


function renderGarnish() {
    let container = document.getElementById('garnish');
    container.innerHTML = '';
    for (let index = 0; index < garnishContainer.length; index++) {
        container.innerHTML += /*html*/`
        <div>${garnishContainer[index]} <button onclick="removeGarnishFromContainer(${index})" class="remove-garnish-btn">X</button></div>`;
    }
}


function renderBasketButton() {
    let basketBody = document.getElementById('basketBody');
    if (basketAmounts.length <= 0) {
        basketBody.innerHTML = templateEmptyBasketButton();
    } else {
        for (let index = 0; index < basketAmounts.length; index++) {
            basketBody.innerHTML = '';
            basketBody.innerHTML +=  generateBasketButtonHTML();
        }
    } renderPopupBasket(); saveBasket(); loadBasket();
}


function renderPopupBasket() {
    popupBasketContainer.innerHTML = '';
    if (basketAmounts.length <= 0) {
        popupBasketContainer.innerHTML = templateEmptyBasket();
        popupPayButton.innerHTML = '';
        popupTotalsum.innerHTML = '';
    } else {
        popupPayButton.innerHTML += '';
        for (let i = 0; i < basketNames.length; i++) {
            popupBasketContainer.innerHTML += generateBasketContainer(i)
            popupTotalsum.innerHTML = '';
            popupTotalsum.innerHTML += generateTotalSum();
            popupPayButton.innerHTML = generatePayButton();
        }
    } renderBasket(); saveBasket(); loadBasket();
}


///////////////////////////////////////////////////// MATH ///////////////////////////////////////////////////////////////


function removeItemFromBasket(i) {
    basketNames.splice(i, 1);
    basketAmounts.splice(i, 1);
    basketPrices.splice(i, 1);
    basketGarnishes.splice(i, 1);
    renderBasket(); renderPopupBasket(); saveBasket();
}


function removeGarnishFromContainer(i) {
    garnishContainer.splice(i, 1)
    renderGarnish();
}


function increase(i) {
    let amount = basketAmounts[i];
    if (amount >= 1) {
        basketAmounts[i]++;
    } renderBasket(); renderPopupBasket(); saveBasket();
}


function decrease(i) {
    let amount = basketAmounts[i];
    if (amount > 1) {
        basketAmounts[i]--;
    } else {
        removeItemFromBasket(i);
        document.getElementById('basket').innerHTML = '';
        totalsum.innerHTML = '';
        payButton.innerHTML += '';
    } renderBasket(); renderBasketButton(); renderPopupBasket(); saveBasket(); loadBasket();
}


function calcPrice(a, b) {
    let price = a * b;
    return price.toFixed(2);
}


function subTotal() {
    let sum = 0;
    for (let i = 0; i < basketPrices.length; i++) {
        sum += basketPrices[i] * basketAmounts[i];
    }
    if (sum <= 10) {
        deliveryCost = 2;
    } else {
        deliveryCost = 0;
    } return sum;
}


function total(c, d) {
    let endSum = c += d;
    return endSum.toFixed(2);
}


////////////////////////////////// GENERATED HTML & TEMPLATES //////////////////////////////////////////////////////////////

function generateBasketButtonHTML() {
    return /*html*/`
            <div >
                <span id="goto">Zum Warenkorb</span>
                <span><b>${total(subTotal(), deliveryCost)}€</b></span>
            </div>
            <div>(${basketAmounts.reduce((currentValue, previousValue) => currentValue + previousValue)})</div>`;
}


function generateTotalSum() {
    return /*html*/`
        <div class="totalsum-card-text">
         <span>Zwischensumme</span>
         <span>Lieferkosten</span>
         <span><b>Gesamt</b></span>
        </div>
        <div class="totalsum-card">
            <span>${subTotal().toFixed(2)} €</span>
            <span>${deliveryCost.toFixed(2)} €</span>
            <span><b>${total(subTotal(), deliveryCost)}€</b></span>
        </div>`;
}


function generateBasketContainer(i) {
    const name = basketNames[i];
    const price = basketPrices[i];
    const amount = basketAmounts[i];
    const garnish = basketGarnishes;
    return /*html*/` 
    <div class="food-card">
       <div class="food-card-box">
           <div id="food" class="food-amount"> <span>${amount}&nbsp;${name}</span> <div>${calcPrice(price, amount)} €</div></div>
           <ul class="garnish-list">
                <span>${garnish[i]}</span>
           </ul>
       </div>
       <div class="garnish-wrapper">
            <div class="add-garnish">Anmerkung hinzufügen</div>
            <div class="add-garnish-btn">
                <button onclick="decrease(${i})">
                    <span>-</span></button>
                <button onclick="increase(${i})">
                    <span>+</span>
                </button>
            </div>
       </div>
   </div>                                              
  `;
}


function generateFoodCard(i) {
    return /*html*/` <div onclick="openPopup(${i})" class="menu-item-box">
                            <div class="menu-item">
                                <div class="menu-item-name">${names[i]}</div><br>
                                <div class="menu-item-price">${prices[i].toFixed(2)}&nbsp;€</div>
                            </div>
                            <div class="add-btn">
                                <button >+</button>
                            </div>
                     </div>`;
}


function generateGarnishHTML(i) {
    return /*html*/`
    <div onclick="stopProp(event)" class="choose-garnish-box">
        <div id="genGar" class="choose-garnish-wrapper">
        </div>
        <div class="food-garnish-card">
            <div class="added-food">
                <div>${names[i]}</div>
                <div> &nbsp;${prices[i].toFixed(2)}  €</div>
            </div>
            <div id="garnish" class="added-garnishes">
            </div>
            <span class="add-garnish-button">
                <button onclick="addToBasket(${i})" id="pay" class="paybutton">${prices[i].toFixed(2)} €</button>
            </span>
        </div>     
    </div>
    `;
}


function generateGarnishes() {
    let container = document.getElementById('genGar');
    for (let index = 0; index < garnishes.length; index++) {
        container.innerHTML = '';
        container.innerHTML += generateGarnishCard();
    }
}


function generateGarnishCard() {
    return /*html*/`
    <div onclick="addGarnish(${0})" class="garnish">${garnishes[0]}</div>
    <div onclick="addGarnish(${1})" class="garnish">${garnishes[1]}</div>
    <div onclick="addGarnish(${2})" class="garnish">${garnishes[2]}</div>
    <div onclick="addGarnish(${3})" class="garnish">${garnishes[3]}</div>
    <div onclick="addGarnish(${4})" class="garnish">${garnishes[4]}</div>
    <div onclick="addGarnish(${5})" class="garnish">${garnishes[5]}</div>
    <div onclick="addGarnish(${6})" class="garnish">${garnishes[6]}</div>
    <div onclick="addGarnish(${7})" class="garnish">${garnishes[7]}</div>
    <div onclick="addGarnish(${8})" class="garnish">${garnishes[8]}</div>
    <div onclick="addGarnish(${9})" class="garnish">${garnishes[9]}</div>
    <div onclick="addGarnish(${10})" class="garnish">${garnishes[10]}</div>
    <div onclick="addGarnish(${11})" class="garnish">${garnishes[11]}</div>
    <div onclick="addGarnish(${12})" class="garnish">${garnishes[12]}</div>
    `;
}


function generatePayButton() {
    return `<div onclick="alert('Übungsseite! Keine Kaufabwicklung vorhanden!')"class="pay-button-style">
                <span><b id="payB">Zum Bezahlvorgang &nbsp;</b></span>
                <span><b>${total(subTotal(), deliveryCost)} €</b></span>
            </div>`;
}


function templateEmptyBasket() {
    return /*html*/ `
    <div class="empty-basket">
        <div>
            <img class="empty-basket-logo" src="img/icons/shopping-bag.png">
        </div>
        <h3 class="empty-basket-headline" id="fillB">Fülle deinen Warenkorb</h3>
        <span class="empty-basket-txt" id="empty">Füge einige leckere Gerichte aus der Speisekarte hinzu und bestelle dein Essen.</span>
    </div>
    `;
}


function templateEmptyBasketButton() {
    return /*html*/ `
          <span id="fill">Fülle deinen Warenkorb</span>  <img class="empty-basket-logo" src="img/icons/shopping-bag.png">
    `;
}


function antipastiTemplate() {
    return /*html*/` <div id="antipasti" class="menu-category">
                       <div class="menu-category-img">
                             <img src="img/pexels-luna-lovegood-4087611.jpg">
                       </div>
                       <div class="menu-category-header">
                          <h3 id="starterT">Antipasti - Vorspeisen</h3>
                       </div>
                     </div>`;
}


function pizzaTemplate() {
    return /*html*/`<div id="pizza" class="menu-category">
                        <div class="menu-category-img">
                            <img src="img/pexels-federica-gioia-11230267.jpg">
                        </div>
                        <div class="menu-category-header">
                            <h3>Pizza</h3>
                        </div>
                    </div>`;
}


function pastaTemplate() {
    return /*html*/`<div id="pasta" class="menu-category">
                        <div class="menu-pasta-img">
                            <img class="menu-pasta-img" src="img/pexels-engin-akyurt-1435896.jpg">
                        </div>
                        <div class="menu-category-header">
                            <h3>Pasta</h3>
                        </div>
                    </div>`;
}


function salateTemplate() {
    return /*html*/`<div id="salate" class="menu-category">
                        <div class="menu-category-img">
                            <img src="img/pexels-farhad-ibrahimzade-8697517.jpg">
                        </div>
                        <div class="menu-category-header">
                            <h3 id="saladT">Salate</h3>
                        </div>
                    </div>`;
}

////////////////////////////////// SAVE & LOAD //////////////////////////////////////////////////////////////////////////////

function saveBasket() {
    let basketNamesAsText = JSON.stringify(basketNames);
    let basketGarnishesAsText = JSON.stringify(basketGarnishes);
    let basketPricesAsText = JSON.stringify(basketPrices);
    let basketAmountsAsText = JSON.stringify(basketAmounts);
    localStorage.setItem('basketNames', basketNamesAsText);
    localStorage.setItem('basketGarnishes', basketGarnishesAsText);
    localStorage.setItem('basketPrices', basketPricesAsText);
    localStorage.setItem('basketAmounts', basketAmountsAsText);
}


function loadBasket() {
    let basketNamesAsText = localStorage.getItem('basketNames');
    if (basketNamesAsText) { basketNames = JSON.parse(basketNamesAsText); }
    let basketGarnishesAsText = localStorage.getItem('basketGarnishes');
    if (basketGarnishesAsText) { basketGarnishes = JSON.parse(basketGarnishesAsText); }
    let basketPricesAsText = localStorage.getItem('basketPrices');
    if (basketPricesAsText) { basketPrices = JSON.parse(basketPricesAsText); }
    let basketAmountsAsText = localStorage.getItem('basketAmounts');
    if (basketAmountsAsText) { basketAmounts = JSON.parse(basketAmountsAsText) }
}