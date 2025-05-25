document.addEventListener('DOMContentLoaded', function () {
  const elems = document.querySelectorAll('.sidenav');
  M.Sidenav.init(elems, {edge:'right'});
});


document.addEventListener('DOMContentLoaded', function () {
  const selects = document.querySelectorAll('select');
  M.FormSelect.init(selects);
});

function applyFilters() {
  const size = document.getElementById('size-filter').value;
  const price = document.getElementById('price').value;
  const color = document.getElementById('color-filter').value;
  const category = document.getElementById('category-filter').value;

  console.log('Filters:', { size, price, color, category });
  // You can send these filters to the server via fetch/ajax or use them to filter a local product list
}

function updatePriceValue(val) {
  document.getElementById('price-value').textContent = `$${val}`;
}

