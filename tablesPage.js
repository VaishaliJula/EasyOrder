var basket = [];
function loadTables() {
  var tableOrder = document.getElementById('tableArrangement');
  $(tableArrangement).empty()
  $.getJSON('resources/tableData.json', function (results) {
    $.each(results, function (index) {

      //creating div
      var elem = document.createElement('div');
      // elem.classList.add('col-sm-3');
      if(index <= 2) {      //Bootstrap grid of 4 columns to each div
      elem.classList.add('col-sm-2');
    }
    else if(index <= 6 && index > 2){
      elem.classList.add('col-sm-3');
    }
    else if(index > 6 && index <= 9){
      elem.classList.add('col-sm-1');
    }
    else{
      elem.classList.add('col-sm-3');
    }
      console.log(index);
      //putting the content in each div of bootstrap size col-4
      elem.innerHTML = arrangeTable(results[index]);
      //append each item to the tableOrder display section
      tableArrangement.appendChild(
        elem
      );
    })
  })
  document.getElementById('back').style.display = 'none';
}

// loadTables();


function arrangeTable (item) {
  return '<div class="tableNumbers">' +
    '<div class="item-image" style="background-image:url(' +
      item.img + ')" onclick="modalExample()">' +
    '</div>' +
    '<div class="item-number">' +
      item.tableNumber +
    '</div>' +
  '</div>';
}

function modalExample(){
alert("In modal");
var myModal = document.getElementById(myModal);
// alert(document.getElementsByClassName("item-image").innerHTML = myModal);

}


window.addEventListener("load",loadTables,false);