var basket = [];
var selected = 4;
function loadTables() {
  var tableOrder = document.getElementById('tableArrangement');
  tableOrder.innerHTML = '';
  $.getJSON('resources/tableData.json', function (results) {
    // $.each(results, function (index) {
    for (let index = 0; index < results.length; index++) {
      //creating div
      var elem = document.createElement('div');
      // elem.classList.add('col-sm-3');
      if (index <= 2) {      //Bootstrap grid of 4 columns to each div
        elem.classList.add('col-sm-2');
      }
      else if (index <= 6 && index > 2) {
        elem.classList.add('col-sm-3');
      }
      else if (index > 6 && index <= 9) {
        elem.classList.add('col-sm-1');
      }
      else {
        elem.classList.add('col-sm-3');
      }
      console.log(index);
      //putting the content in each div of bootstrap size col-4
      elem.innerHTML = arrangeTable(results[index]);
      //append each item to the tableOrder display section
      tableArrangement.appendChild(
        elem
      );
    }

  })
  document.getElementById('back').style.display = 'none';
}

// loadTables();


function arrangeTable(item) {
  return '<div class="tableNumbers">' +
    '<div class="item-image" style="background-image:url(' +
    item.img + ')" data-toggle="modal" data-target="#myModal" ' +
    'data-tablenum="' + item.tableNumber +
    '" data-tableimg="' + item.img + '">' +
    '</div>' +
    '<div class="item-number">' +
    item.tableNumber +
    '</div>' +
    '</div>';
}

$('#myModal')
  .on('show.bs.modal', onModalShow)


var template = '<div class="size-cells">';
for (let i = 0; i < 24; i++) {
  template += '<span class="size-cell" data-size="' + (i + 1) + '"><span>' + (i + 1) + '</span></span>'
}
template += '</div>'
document.querySelector('#myModal #party-size').innerHTML = template;

$('#myModal .size-cell').on('click', function (evt) {
  var size = $(this).data('size');
  selected = size;
  select(size);
});

function selectMenu() {
  var partyName = document.getElementById('party-name').value;
  var selection = {
    size: selected,
    name: partyName
  }
  localStorage.setItem('party', JSON.stringify(selection))
  location.href='/menu.html';
}

function select(selection) {
  var indx = --selection;
  document.querySelectorAll('#myModal .size-cell.selected')
    .forEach(function (el) {
      el.classList.remove('selected')
    });
  document.querySelectorAll('#myModal .size-cell')[indx].classList.add('selected');
}

select(selected);

function onModalShow(evt) {
  console.log(evt.relatedTarget);

  // var tableNum = $(evt.relatedTarget).data('tablenum')
  // var tableImage = $(evt.relatedTarget).data('tableimg')
}


window.addEventListener("load", loadTables, false);