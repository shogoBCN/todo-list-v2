timeout = 0;

let itemTotalPrices = function (ele) {
  let quants = parseFloat($(ele).find('.quantity input').val()) || 0; 
  if (quants == 0) {
    $(ele).find('.quantity input').val(quants);
  }
  
  let prices = parseFloat($(ele).find('.single-price div').text()); 
  let total = parseFloat((prices * quants).toFixed(2)); 
  $(ele).children('.total-price').html(total.toFixed(2) + "€");
  return total;
};

$(document).on('input', 'tr input', function () {
  clearTimeout(timeout);
  timeout = setTimeout(function () {
    fireAll();
  }, 500);
});

let fireAll = function () {
  let pricesArr = [];
  finalPrice = 0;
  $('.items').each(function (i, ele) {  
    pricesArr.push(itemTotalPrices(ele));
   });

  if (pricesArr.length == 0) {
    $('.final-price').html("-");
  }
  else {
    finalPrice = pricesArr.reduce((a, b) => a + b).toFixed(2);
    $('.final-price').html(finalPrice + "€");
  }
}

$(document).ready(function () {
  fireAll();
  $(document).on('click', '.btn.remove', function () {
    $(this).closest('tr').remove();
    fireAll()
  });

  $('#add-item').on('submit', function (event) {
    event.preventDefault();
    let quant = 1;
    let name = $(this).children('#item-name').val();
    let price = parseFloat($(this).children('#item-price').val()).toFixed(2);

    $('tbody:last').prepend(
    '<tr class="items">' +
      '<td class="name col-7">' + name + '</td>' +
      '<td class="single-price"><div>' + price + '€' + '</div></td>' +
      '<td class="quantity"><input class="small-input" type="number" value="' + quant + '" /></td>' +
      '<td><button class="btn btn-light btn-sm remove">remove</button></td>' +
      '<td class="total-price col-2"></td>' +
    '</tr>');

    fireAll()
    
    $(this).children('#item-name').val('');
    $(this).children('#item-price').val('');
  });
});