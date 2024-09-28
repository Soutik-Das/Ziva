// manage-products.js

// Get references to the form and the product list
const productForm = document.getElementById('product-form');
const productList = document.getElementById('product-list');

// Array to store products (in a real application, this would come from a database)
let products = [];

// Event listener for form submission
productForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get form data
    const productName = document.getElementById('product-name').value;
    const productPrice = document.getElementById('product-price').value;
    const productStock = document.getElementById('product-stock').value;

    // Add new product to the array
    const newProduct = {
        name: productName,
        price: productPrice,
        stock: productStock
    };
    products.push(newProduct);

    // Reset form
    productForm.reset();

    // Update the product list display
    renderProductList();
});

// Function to render the product list in the table
function renderProductList() {
    // Clear existing rows
    productList.innerHTML = '';

    // Loop through the products array and create table rows
    products.forEach((product, index) => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>$${product.price}</td>
            <td>${product.stock}</td>
            <td>
                <button class="edit-btn" onclick="editProduct(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteProduct(${index})">Delete</button>
            </td>
        `;
        productList.appendChild(row);
    });
}

// Function to delete a product
function deleteProduct(index) {
    products.splice(index, 1);
    renderProductList();
}

// Function to edit a product
function editProduct(index) {
    const product = products[index];

    // Populate the form with the product data
    document.getElementById('product-name').value = product.name;
    document.getElementById('product-price').value = product.price;
    document.getElementById('product-stock').value = product.stock;

    // Change the submit button text to "Update Product"
    const submitBtn = document.getElementById('submit-btn');
    submitBtn.textContent = 'Update Product';

    // Add a new event listener for updating the product
    submitBtn.onclick = function(event) {
        event.preventDefault();

        // Update the product data in the array
        products[index] = {
            name: document.getElementById('product-name').value,
            price: document.getElementById('product-price').value,
            stock: document.getElementById('product-stock').value
        };

        // Reset form
        productForm.reset();
        submitBtn.textContent = 'Add Product'; // Reset button text

        // Re-render product list
        renderProductList();

        // Remove the update event listener
        submitBtn.onclick = null;
    };
}

