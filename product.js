//Selectors

const productGrid = document.querySelector(".row.row-cols-1");
const searchInput = document.querySelector("#shop-search");
const filterButtons = document.querySelectorAll(".col-md-6 .btn");

let allProducts    = [];
let activeCategory = "All";

async function fetchProducts() {
    try {
        const categories = ["laptops", "tablets", "smartphones"];

        const responses = await Promise.all(
            categories.map(cat =>
                fetch(`https://dummyjson.com/products/category/${cat}`)
                    .then(res => res.json())
            )
        );

        allProducts = responses.flatMap(data => data.products);
        applyFilters();

    } catch (error) {
        console.error("Failed to fetch products:", error);
        productGrid.innerHTML = `<p class="text-danger text-center">Failed to load products. Please try again.</p>`;
    }
}

function applyFilters() {
    const searchTerm = searchInput.value.trim().toLowerCase();

    let filtered = allProducts;

    // Filter by category
    if (activeCategory !== "All") {
        filtered = filtered.filter(product =>
            product.category.toLowerCase() === activeCategory.toLowerCase()
        );
    }

    // Filter by search term
    if (searchTerm !== "") {
        filtered = filtered.filter(product =>
            product.title.toLowerCase().includes(searchTerm) ||
            product.description.toLowerCase().includes(searchTerm)
        );
    }

    renderProducts(filtered);
}

function renderProducts(products) {
    productGrid.innerHTML = "";

    if (products.length === 0) {
        productGrid.innerHTML = `<p class="text-secondary text-center w-100">No products found.</p>`;
        return;
    }

    products.forEach(product => {
        const card = document.createElement("div");
        card.classList.add("col");

        card.innerHTML = `
            <div class="card h-100 product-card">
                <div class="product-badge">${capitalize(product.category)}</div>
                <img src="${product.thumbnail}" class="card-img-top" alt="${product.title}">
                <div class="card-body text-center">
                    <h5 class="card-title">${product.title}</h5>
                    <p class="card-text text-secondary small">${product.description}</p>
                    <h4 class="price-tag">$${product.price.toFixed(2)}</h4>
                    <div class="mb-3">
                        <span class="text-warning small">★ ${product.rating}</span>
                        <span class="text-secondary btn-sm">(${product.stock} in stock)</span>
                    </div>
                    <button class="btn btn-primary w-100">Add to Cart</button>
                </div>
            </div>
        `;

        productGrid.appendChild(card);
    });
}

function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

// Event listeners for filter buttons
filterButtons.forEach(button => {
    button.addEventListener("click", () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove("active"));
        // Add active class to clicked button
        button.classList.add("active");

        activeCategory = button.textContent.trim();
        applyFilters();
    });
}); 

// Event listener for search input
searchInput.addEventListener("input", applyFilters);

fetchProducts();
