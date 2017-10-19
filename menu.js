var basket = [];

// getting the stored value from the tables page
var party = localStorage.getItem('party');

/**
 * when party information is available in localStorage,
 * parse the string to JSON
 */
if (party) {
  party = JSON.parse(party);
  console.log(party);
} else {
  /**
   * party information is not found in the localStorage
   * this may happen when you visit menu page
   * without selecting party size
   */
  console.log('Party not found')
}

/**
 * loadCategories function builds the main categories menu
 * from categories.json.
 */
function loadCategories() {
  var menu = document.getElementById('menu');
  menu.innerHTML = ''; // empty the menu div
  $.getJSON('resources/categories.json', function (results) {
    for (let index = 0; index < results.length; index++) { // iterate over results

      //creating div
      var elem = document.createElement('div');
      //Bootstrap grid of 4 columns to each div
      elem.classList.add('col-sm-4');
      //putting the content in each div of bootstrap size col-4
      elem.innerHTML = createCard(results[index]);
      //append each item to the menu display section
      menu.appendChild(
        elem
      );

      // get a reference to the card element
      var card = elem.getElementsByClassName('card')[0];
      // add click handler on the card element
      // on click on the card should load the dishes inside the selected categories
      card.addEventListener('click', getItem.bind(null, results[index]));
    }
  })
  document.getElementById('back').style.display = 'none';
}

// load categories on page load
loadCategories();

/**
 * createCard function composes the html element structure
 * for the given category
 */
function createCard (item) {
  return '<div class="card">' +
    '<div class="item-image" style="background-image:url(' +
      item.img + ')" >' +
    '</div>' +
    '<div class="item-name">' +
      item.name +
    '</div>' +
  '</div>';
}

/**
 * createList function composes html element structure for
 * the given dish in the sub menu 
 */
function createList (item) {
  return '<div class="list">' +
    item.name +
  '</div>'
}

/**
 * getItem function builds the sub menu from the json of
 * the curresponding category
 */
function getItem(item) {
  var menu = document.getElementById('menu');

  menu.innerHTML = ''; // clear the content of menu div

  $.getJSON(item.subCat, function (results) {
    results.forEach((result) => {
        var elem = document.createElement('div');
        elem.classList.add('col-sm-12')
        elem.innerHTML = createList({
          name: result.productName,
          img: result.imageUrl
        });
        menu.appendChild(elem);

        // add click handler to the list item.
        // on click of the list item, the selected item should
        // be added to the cart.
        var card = elem.getElementsByClassName('list')[0];
        card.addEventListener('click', addToCart.bind(null, result));
    });
  });
  document.getElementById('back').style.display = 'block';
}

/**
 * updateTotal function calculates and updates the cart total
 */
function updateTotal() {
  var total = basket.reduce((sum, item) => sum + (item.count * item.price), 0)
  document.getElementById('total').innerHTML = Number(total).toFixed(2);
}

/**
 * highlightRow function highlights the item if the item added is
 * already there in the cart
 */
function highlightRow(name) {
  var row = document.getElementById('basket-item-' + name);
  row.style.backgroundColor = 'rgba(0, 128, 0, 0.39)';
  row.scrollIntoView();
  setTimeout(function() {
    row.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }, 500);
}

/**
 * addToCart function adds the selected item from sub menu to the cart
 */
function addToCart(product) {
  var basketElem = document.getElementById('basket').getElementsByClassName('list-group')[0];
  var name = product.productName;
  // index of the selected item in the basket array
  var index = basket.map(product => product.name).indexOf(name);
  if ( index >= 0) { // if the item already presents in the basket
    basket[index].count++; // increase the count
    // update the count in the UI
    document.getElementById('basket-item-' + name).getElementsByClassName('basket-item')[0].innerText = name + ' x ' + basket[index].count;
    // update the price in the UI
    document.getElementById('basket-item-' + name).getElementsByClassName('basket-price')[0].innerText = '$ ' + ((product.PRICE || 10) * basket[index].count);
    // update the cart total
    updateTotal();
    // highlight the updated cart item
    highlightRow(name);
    return;
  }
  // if the selected item is not there in the basket, add it tot the basket
  basket.push({
    name,
    count: 1,
    price: product.PRICE || 10
  });
  // create the cart item in the UI
  var basketItem = document.createElement('li');
  basketItem.classList.add('list-group-item');
  basketItem.classList.add('row');
  basketItem.innerHTML = '<div class="col-xs-6 basket-item">' + name + '</div><div class="col-xs-6 basket-price">$ ' + (product.PRICE || 10) + '</div>';
  basketItem.id = 'basket-item-' + name
  basketElem.appendChild(basketItem);
  // update the total
  updateTotal();
}