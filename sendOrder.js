// getting the stored basket  value from the menu
var basketContent = localStorage.getItem('basket');
console.log(basketContent);

var orderedItems;
/**
 * when basket information is available in localStorage, display the items and price
 */
if (basketContent) {
  basketContent = JSON.parse(basketContent);
  console.log("parsed json",basketContent);
  for (var i=0;i<basketContent.length;i++) {
    console.log(basketContent[i].name);
    orderedItems = document.getElementById('displayOrder');
    orderedItems.innerHTML  += "<br><br>" + basketContent[i].name;   
 }
  document.getElementById('displayOrderTime').innerHTML = Date();  
  // localStorage.clear();  
} else {
  /**
   * basket information is not found in the localStorage
   */
  console.log('Basket is empty');
}
