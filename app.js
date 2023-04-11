const productNameInput = document.getElementById('product-name');
const priceInput = document.getElementById('price');
const addItemButton = document.getElementById('add-item');
const shoppingList = document.getElementById('shopping-list');
const totalPrice = document.getElementById('total-price');

let products = [];

function render() {
  // Xóa các sản phẩm cũ
  shoppingList.innerHTML = '';

  // Tạo các sản phẩm mới
  products.forEach((product, index) => {
    const tr = document.createElement('tr');
    const td1 = document.createElement('td');
    const td2 = document.createElement('td');
    const td3 = document.createElement('td');
    const deleteButton = document.createElement('button');

    td1.textContent = product.name;
    td2.textContent = '$' + product.price.toFixed(2);
    deleteButton.textContent = 'Delete';
    deleteButton.style.backgroundColor = "#e75151";
    deleteButton.style.cursor = "pointer";
    deleteButton.addEventListener('click', () => {
      products.splice(index, 1);
      render();
      calculateTotal();
    });

    td3.appendChild(deleteButton);
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    shoppingList.appendChild(tr);
  });
}

function calculateTotal() {
  let total = 0;

  products.forEach((product) => {
    total += product.price;
  });

  totalPrice.textContent = total.toFixed(2);
}

addItemButton.addEventListener('click', (event) => {
  event.preventDefault();

  const productName = productNameInput.value.trim();
  const price = parseFloat(priceInput.value.trim());

  if (!productName || isNaN(price)) {
    alert('Please enter a valid product name and price.');
    return;
  }

  const product = {
    name: productName,
    price: price
  };

  products.push(product);
  productNameInput.value = '';
  priceInput.value = '';
  render();
  calculateTotal();
});
