var basket = [];
var party = localStorage.getItem('party');
if (party) {
  party = JSON.parse(party);
  console.log(party);
} else {
  console.log('Party not found')
}
function loadCategories() {
  var menu = document.getElementById('menu');
  menu.innerHTML = '';
  $.getJSON('resources/categories.json', function (results) {
    for (let index = 0; index < results.length; index++) {

      //creating div
      var elem = document.createElement('div');
      //Bootstrap grid of 4 columns to each div
      elem.classList.add('col-sm-4');
      //putting the content in each div of bootstrap size col-4
      elem.innerHTML = createCard(results[index]);
      // alert(index,results,results[index]);
      //append each item to the menu display section
      menu.appendChild(
        elem
      );
      var card = elem.getElementsByClassName('card')[0];
      card.addEventListener('click', getItem.bind(null, results[index]));
    }
  })
  document.getElementById('back').style.display = 'none';
}

loadCategories();

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

function createList (item) {
  return '<div class="list">' +
    item.name +
  '</div>'
}

function getItem(item) {
  var menu = document.getElementById('menu');

  menu.innerHTML = '';

  $.getJSON(item.subCat, function (results) {
    results.forEach((result) => {
        var elem = document.createElement('div');
        elem.classList.add('col-sm-12')
        elem.innerHTML = createList({
          name: result.productName,
          img: result.imageUrl
        });
        menu.appendChild(elem);
        var card = elem.getElementsByClassName('list')[0];
        card.addEventListener('click', addToCart.bind(null, result));
    });
  });
  document.getElementById('back').style.display = 'block';
}

function updateTotal() {
  var total = basket.reduce((sum, item) => sum + (item.count * item.price), 0)
  document.getElementById('total').innerHTML = Number(total).toFixed(2);
}

function highlightRow(name) {
  var row = document.getElementById('basket-item-' + name);
  row.style.backgroundColor = 'rgba(0, 128, 0, 0.39)';
  row.scrollIntoView();
  setTimeout(function() {
    row.style.backgroundColor = 'rgba(0, 0, 0, 0)'
  }, 500);
}

function addToCart(product) {
  var basketElem = document.getElementById('basket').getElementsByClassName('list-group')[0];
  var name = product.productName;
  var index = basket.map(product => product.name).indexOf(name);
  if ( index >= 0) {
    basket[index].count++;
    document.getElementById('basket-item-' + name).getElementsByClassName('basket-item')[0].innerText = name + ' x ' + basket[index].count;
    document.getElementById('basket-item-' + name).getElementsByClassName('basket-price')[0].innerText = '$ ' + ((product.PRICE || 10) * basket[index].count);
    updateTotal();
    highlightRow(name);
    return;
  }
  basket.push({
    name,
    count: 1,
    price: product.PRICE || 10
  });
  var basketItem = document.createElement('li');
  basketItem.classList.add('list-group-item');
  basketItem.classList.add('row');
  basketItem.innerHTML = '<div class="col-xs-6 basket-item">' + name + '</div><div class="col-xs-6 basket-price">$ ' + (product.PRICE || 10) + '</div>';
  basketItem.id = 'basket-item-' + name
  basketElem.appendChild(basketItem);
  updateTotal();
}

// function testFunction(){
// 	// var chickenList = [];
// 	$.getJSON("resources/menuContent.json", function(results) {

// 			// var myJson = JSON.stringify(results);
// 	  //       document.getElementById("menuListItems").innerHTML = myJson;
// 	        $.each(results, function(index) {
// 	            chickenList = JSON.stringify(results[index].productName+ " - " +results[index].price);


//                   //document.writeln(chickenList);
// 	               //alert(chickenList);

// 	       });

// 	    document.getElementById("menuListItems").innerHTML = chickenList;


//         });
// 	}

// function diplayMuttonItems(){

// 	$.getJSON("resources/mutton.json", function(results) {
// 	        // $.each(results, function(index) {
// 	        //     // alert(results[index].productName);
// 	        //     document.getElementById("menuListItems").innerHTML = results[index].productName;
// 	        // });

//             // alert(JSON.stringify(results));
// 	        document.getElementById("menuListItems").innerHTML = JSON.stringify(results);

// 	    });

// }
// function diplayDesertItems(){

// 	$.getJSON("resources/desserts.json", function(results) {
// 	        // $.each(results, function(index) {
// 	        //     // alert(results[index].productName);
// 	        //     document.getElementById("menuListItems").innerHTML = results[index].productName;
// 	        // });

//             // alert(JSON.stringify(results));
// 	        document.getElementById("menuListItems").innerHTML = JSON.stringify(results);

// 	    });

// }

// function diplayBiryaniItems(){

// 	$.getJSON("resources/biryani.json", function(results) {
// 	        // $.each(results, function(index) {
// 	        //     // alert(results[index].productName);
// 	        //     document.getElementById("menuListItems").innerHTML = results[index].productName;
// 	        // });

//             // alert(JSON.stringify(results));
// 	        document.getElementById("menuListItems").innerHTML = JSON.stringify(results);

// 	    });

// }
