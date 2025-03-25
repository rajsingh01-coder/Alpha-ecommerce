const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
});

 function decreaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            if (quantityInput.value > 1) {
                quantityInput.value--;
            }
        }
        function updatePrice() {
            const basePrice = parseFloat(document.getElementById('price').dataset.price);
            const quantity = parseInt(document.getElementById('quantity').value);
            const totalPrice = basePrice * quantity;
            document.getElementById('price').textContent = `$${totalPrice.toFixed(2)}`;
        }
        
        function decreaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            if (quantityInput.value > 1) {
                quantityInput.value--;
                updatePrice();
            }
        }
        
        function addToWishlist(){
            alert("Do you want to add wishlist")
        };
        function increaseQuantity() {
            const quantityInput = document.getElementById('quantity');
            quantityInput.value++;
            updatePrice();
        }
        const thumbnails = document.querySelectorAll('.thumbnails img');
        const mainImage = document.getElementById('main-image');

        thumbnails.forEach(thumbnail => {
            thumbnail.addEventListener('click', () => {
                mainImage.src = thumbnail.src;
            });
        });

// Cookie Consent Functionality
document.addEventListener('DOMContentLoaded', function() {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');
    const cookiePolicyLink = document.getElementById('cookiePolicyLink');
    
    // Check if cookie consent was already given
    if (!getCookie('cookie_consent')) {
        // Show the banner after the page loads
        setTimeout(() => {
            cookieConsent.style.display = 'flex';
        }, 1000);
    }
    
    // Accept cookies
    acceptCookies.addEventListener('click', function() {
        setCookie('cookie_consent', 'accepted', 365);
        cookieConsent.style.display = 'none';
    });
    
    // Decline cookies (only essential cookies)
    declineCookies.addEventListener('click', function() {
        setCookie('cookie_consent', 'declined', 365);
        cookieConsent.style.display = 'none';
    });
    
    // Cookie policy link
    cookiePolicyLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert("Our cookie policy: We use cookies to improve your experience on our website. Essential cookies are required for the site to function properly. You can manage your cookie preferences at any time.");
    });
    
    // Helper functions for cookies
    function setCookie(name, value, days) {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = "expires=" + date.toUTCString();
        document.cookie = name + "=" + value + ";" + expires + ";path=/";
    }
    
    function getCookie(name) {
        const cookieName = name + "=";
        const decodedCookie = decodeURIComponent(document.cookie);
        const cookieArray = decodedCookie.split(';');
        for(let i = 0; i < cookieArray.length; i++) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
                cookie = cookie.substring(1);
            }
            if (cookie.indexOf(cookieName) === 0) {
                return cookie.substring(cookieName.length, cookie.length);
            }
        }
        return "";
    }
});

        // Sample product data
const products = [
    { id: 1, name: "Classic Black Heels", price: 129.99, color: "black", size: [6, 7, 8], image: "10.avif" },
    { id: 2, name: "White Sneakers", price: 89.99, color: "white", size: [5, 6, 7, 8], image: "9.avif" },
    { id: 3, name: "Red Ballet Flats", price: 59.99, color: "red", size: [6, 7, 9], image: "8.avif" },
    { id: 4, name: "Blue Running Shoes", price: 109.99, color: "blue", size: [7, 8, 9, 10], image: "7.avif" },
    { id: 5, name: "Green Sandals", price: 49.99, color: "green", size: [5, 6, 7], image: "6.avif" },
    { id: 6, name: "Black Boots", price: 149.99, color: "black", size: [7, 8, 9], image: "5.webp" },
    { id: 7, name: "White Loafers", price: 79.99, color: "white", size: [6, 7, 8, 9], image: "4.avif" },
    { id: 8, name: "Blue High Heels", price: 119.99, color: "blue", size: [5, 6, 7], image: "3.avif" },
    { id: 9, name: "Red Pumps", price: 99.99, color: "red", size: [6, 7, 8], image: "2.avif" },
    { id: 10, name: "Green Espadrilles", price: 69.99, color: "green", size: [7, 8, 9], image: "10.avif" },
    { id: 11, name: "Black Flats", price: 54.99, color: "black", size: [5, 6, 7, 8], image: "9.avif" },
    { id: 12, name: "White Wedges", price: 89.99, color: "white", size: [6, 7, 8], image: "5.avif" }
];

// DOM elements
const productsGrid = document.getElementById('productsGrid');
const pagination = document.getElementById('pagination');
const sortOptions = document.getElementById('sortOptions');
const priceRange = document.getElementById('priceRange');
const priceValue = document.getElementById('priceValue');
const applyFiltersBtn = document.getElementById('applyFilters');
const resetFiltersBtn = document.getElementById('resetFilters');
const filterToggle = document.getElementById('filterToggle');
const filters = document.getElementById('filters');
const popupOverlay = document.getElementById('popupOverlay');
const closePopup = document.getElementById('closePopup');
const purchaseForm = document.getElementById('purchaseForm');
const productNameInput = document.getElementById('productName');
const productPriceInput = document.getElementById('productPrice');

// State
let currentPage = 1;
const productsPerPage = 8;
let filteredProducts = [...products];
let currentProduct = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    renderProducts();
    renderPagination();
    
    // Update price display when slider changes
    priceRange.addEventListener('input', () => {
        priceValue.textContent = priceRange.value;
    });
    
    // Apply filters
    applyFiltersBtn.addEventListener('click', applyFilters);
    
    // Reset filters
    resetFiltersBtn.addEventListener('click', resetFilters);
    
    // Sort products
    sortOptions.addEventListener('change', sortProducts);
    
    // Mobile filter toggle
    filterToggle.addEventListener('click', () => {
        filters.classList.toggle('active');
    });
    
    // Close popup
    closePopup.addEventListener('click', closePurchasePopup);
    
    // Handle purchase form submission
    purchaseForm.addEventListener('submit', handlePurchase);
});

// Render products
function renderProducts() {
    productsGrid.innerHTML = '';
    
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    const productsToDisplay = filteredProducts.slice(startIndex, endIndex);
    
    if (productsToDisplay.length === 0) {
        productsGrid.innerHTML = '<p class="no-results">No products match your filters.</p>';
        return;
    }
    
    productsToDisplay.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <p class="product-color">Color: ${product.color.charAt(0).toUpperCase() + product.color.slice(1)}</p>
                <button class="buy-button" data-id="${product.id}">Add to Cart</button>
            </div>
        `;
        
        productsGrid.appendChild(productCard);
    });
    
    // Add event listeners to buy buttons
    document.querySelectorAll('.buy-button').forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = parseInt(e.target.getAttribute('data-id'));
            openPurchasePopup(productId);
        });
    });
}

// Open purchase popup
function openPurchasePopup(productId) {
    currentProduct = products.find(p => p.id === productId);
    if (!currentProduct) return;
    
    productNameInput.value = currentProduct.name;
    productPriceInput.value = `$${currentProduct.price.toFixed(2)}`;
    
    popupOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Close purchase popup
function closePurchasePopup() {
    popupOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
    purchaseForm.reset();
}

// Handle purchase form submission
function handlePurchase(e) {
    e.preventDefault();
    
    const quantity = parseInt(document.getElementById('quantity').value);
    const customerName = document.getElementById('customerName').value;
    const customerEmail = document.getElementById('customerEmail').value;
    
    // In a real app, you would send this data to your server
    console.log('Purchase Details:', {
        product: currentProduct.name,
        price: currentProduct.price,
        quantity,
        total: (currentProduct.price * quantity).toFixed(2),
        customerName,
        customerEmail
    });
    
    // Show success message (in a real app, you might redirect to a confirmation page)
    alert(`Thank you, ${customerName}! Your order for ${quantity} ${currentProduct.name} has been placed. Total: $${(currentProduct.price * quantity).toFixed(2)}`);
    
    closePurchasePopup();
}

// Render pagination
function renderPagination() {
    pagination.innerHTML = '';
    const pageCount = Math.ceil(filteredProducts.length / productsPerPage);
    
    if (pageCount <= 1) return;
    
    // Previous button
    const prevButton = document.createElement('button');
    prevButton.innerHTML = '&laquo;';
    prevButton.disabled = currentPage === 1;
    prevButton.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(prevButton);
    
    // Page buttons
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(pageCount, startPage + maxVisiblePages - 1);
    
    if (endPage - startPage + 1 < maxVisiblePages) {
        startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }
    
    if (startPage > 1) {
        const firstPageButton = document.createElement('button');
        firstPageButton.textContent = '1';
        firstPageButton.addEventListener('click', () => {
            currentPage = 1;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(firstPageButton);
        
        if (startPage > 2) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            pagination.appendChild(ellipsis);
        }
    }
    
    for (let i = startPage; i <= endPage; i++) {
        const pageButton = document.createElement('button');
        pageButton.textContent = i;
        if (i === currentPage) {
            pageButton.classList.add('active');
        }
        pageButton.addEventListener('click', () => {
            currentPage = i;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(pageButton);
    }
    
    if (endPage < pageCount) {
        if (endPage < pageCount - 1) {
            const ellipsis = document.createElement('span');
            ellipsis.textContent = '...';
            ellipsis.style.padding = '10px';
            pagination.appendChild(ellipsis);
        }
        
        const lastPageButton = document.createElement('button');
        lastPageButton.textContent = pageCount;
        lastPageButton.addEventListener('click', () => {
            currentPage = pageCount;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pagination.appendChild(lastPageButton);
    }
    
    // Next button
    const nextButton = document.createElement('button');
    nextButton.innerHTML = '&raquo;';
    nextButton.disabled = currentPage === pageCount;
    nextButton.addEventListener('click', () => {
        if (currentPage < pageCount) {
            currentPage++;
            renderProducts();
            renderPagination();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    pagination.appendChild(nextButton);
}

// Apply filters
function applyFilters() {
    const maxPrice = parseInt(priceRange.value);
    const selectedSizes = Array.from(document.querySelectorAll('input[name="size"]:checked')).map(el => parseInt(el.value));
    const selectedColors = Array.from(document.querySelectorAll('input[name="color"]:checked')).map(el => el.value);
    
    filteredProducts = products.filter(product => {
        // Price filter
        if (product.price > maxPrice) return false;
        
        // Size filter
        if (selectedSizes.length > 0 && !selectedSizes.some(size => product.size.includes(size))) {
            return false;
        }
        
        // Color filter
        if (selectedColors.length > 0 && !selectedColors.includes(product.color)) {
            return false;
        }
        
        return true;
    });
    
    currentPage = 1;
    renderProducts();
    renderPagination();
    
    // Close mobile filters if open
    filters.classList.remove('active');
}

// Reset filters
function resetFilters() {
    // Reset form elements
    priceRange.value = 500;
    priceValue.textContent = '500';
    document.querySelectorAll('input[name="size"]').forEach(el => el.checked = false);
    document.querySelectorAll('input[name="color"]').forEach(el => el.checked = false);
    
    // Reset products
    filteredProducts = [...products];
    currentPage = 1;
    renderProducts();
    renderPagination();
    
    // Reset sort
    sortOptions.value = 'featured';
    
    // Close mobile filters if open
    filters.classList.remove('active');
}

// Sort products
function sortProducts() {
    const sortValue = sortOptions.value;
    
    filteredProducts.sort((a, b) => {
        switch (sortValue) {
            case 'price-low':
                return a.price - b.price;
            case 'price-high':
                return b.price - a.price;
            case 'name-asc':
                return a.name.localeCompare(b.name);
            case 'name-desc':
                return b.name.localeCompare(a.name);
            default:
                return a.id - b.id; // Default/featured sort
        }
    });
    
    currentPage = 1;
    renderProducts();
    renderPagination();
}

// Close popup when clicking outside
popupOverlay.addEventListener('click', (e) => {
    if (e.target === popupOverlay) {
        closePurchasePopup();
    }
});



document.addEventListener('DOMContentLoaded', function() {
    // Initialize the checkout process
    initCheckout();
    
    // Set up event listeners
    setupEventListeners();
    
    // Update shipping cost when method changes
    updateShippingCost();
});

function initCheckout() {
    // Show the first form
    document.querySelector('.checkout-form').classList.add('active');
    
    // Set up payment method selection
    const paymentMethods = document.querySelectorAll('.payment-method');
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            // Show the corresponding payment form
            const methodType = this.getAttribute('data-method');
            document.querySelectorAll('.payment-form').forEach(form => {
                form.style.display = 'none';
            });
            document.getElementById(`${methodType}Form`).style.display = 'block';
        });
    });
    
    // Set up "same as shipping" checkbox
    document.getElementById('sameAsShipping').addEventListener('change', function() {
        if (this.checked) {
            copyBillingToShipping();
        }
    });
    
    // Format credit card inputs
    document.getElementById('cardNumber').addEventListener('input', formatCardNumber);
    document.getElementById('cardExpiry').addEventListener('input', formatCardExpiry);
    document.getElementById('cardCvv').addEventListener('input', formatCardCvv);
}

function setupEventListeners() {
    // Shipping method change
    document.querySelectorAll('input[name="shippingMethod"]').forEach(radio => {
        radio.addEventListener('change', updateShippingCost);
    });
}

function nextStep(currentFormId, nextFormId) {
    // Validate current form before proceeding
    if (validateForm(currentFormId)) {
        document.getElementById(currentFormId).classList.remove('active');
        document.getElementById(nextFormId).classList.add('active');
        
        // Update checkout steps
        updateSteps(currentFormId, nextFormId);
        
        // If moving to review form, populate review sections
        if (nextFormId === 'reviewForm') {
            populateReviewSections();
        }
    }
}

function prevStep(currentFormId, prevFormId) {
    document.getElementById(currentFormId).classList.remove('active');
    document.getElementById(prevFormId).classList.add('active');
    
    // Update checkout steps
    updateSteps(currentFormId, prevFormId, true);
}

function updateSteps(currentFormId, nextFormId, isBack = false) {
    const steps = document.querySelectorAll('.step');
    const formOrder = ['billingForm', 'shippingForm', 'paymentForm', 'reviewForm'];
    
    const currentIndex = formOrder.indexOf(currentFormId);
    const nextIndex = formOrder.indexOf(nextFormId);
    
    if (!isBack) {
        steps[currentIndex].classList.remove('active');
        steps[nextIndex].classList.add('active');
    } else {
        steps[currentIndex].classList.remove('active');
        steps[nextIndex].classList.add('active');
    }
}

function validateForm(formId) {
    const form = document.getElementById(formId);
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            input.style.borderColor = '#e74c3c';
            isValid = false;
            
            // Add error message if not already present
            if (!input.nextElementSibling || !input.nextElementSibling.classList.contains('error-message')) {
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#e74c3c';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '0.25rem';
                errorMsg.textContent = 'This field is required';
                input.insertAdjacentElement('afterend', errorMsg);
            }
        } else {
            input.style.borderColor = '#ddd';
            
            // Remove error message if present
            if (input.nextElementSibling && input.nextElementSibling.classList.contains('error-message')) {
                input.nextElementSibling.remove();
            }
            
            // Additional validation for specific fields
            if (input.id === 'billingEmail' && !validateEmail(input.value)) {
                input.style.borderColor = '#e74c3c';
                isValid = false;
                
                const errorMsg = document.createElement('p');
                errorMsg.className = 'error-message';
                errorMsg.style.color = '#e74c3c';
                errorMsg.style.fontSize = '0.8rem';
                errorMsg.style.marginTop = '0.25rem';
                errorMsg.textContent = 'Please enter a valid email address';
                input.insertAdjacentElement('afterend', errorMsg);
            }
            
            if (formId === 'paymentForm' && document.querySelector('.payment-method.active').getAttribute('data-method') === 'credit') {
                if (input.id === 'cardNumber' && !validateCardNumber(input.value)) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.textContent = 'Please enter a valid card number';
                    input.insertAdjacentElement('afterend', errorMsg);
                }
                
                if (input.id === 'cardExpiry' && !validateCardExpiry(input.value)) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.textContent = 'Please enter a valid expiry date (MM/YY)';
                    input.insertAdjacentElement('afterend', errorMsg);
                }
                
                if (input.id === 'cardCvv' && !validateCardCvv(input.value)) {
                    input.style.borderColor = '#e74c3c';
                    isValid = false;
                    
                    const errorMsg = document.createElement('p');
                    errorMsg.className = 'error-message';
                    errorMsg.style.color = '#e74c3c';
                    errorMsg.style.fontSize = '0.8rem';
                    errorMsg.style.marginTop = '0.25rem';
                    errorMsg.textContent = 'Please enter a valid CVV (3-4 digits)';
                    input.insertAdjacentElement('afterend', errorMsg);
                }
            }
        }
    });
    
    return isValid;
}

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

function validateCardNumber(number) {
    // Simple validation - in a real app you'd use a more robust solution
    const cleaned = number.replace(/\s+/g, '');
    return /^\d{13,16}$/.test(cleaned);
}

function validateCardExpiry(expiry) {
    // Simple validation - in a real app you'd check dates
    return /^\d{2}\/\d{2}$/.test(expiry);
}

function validateCardCvv(cvv) {
    return /^\d{3,4}$/.test(cvv);
}

function copyBillingToShipping() {
    document.getElementById('shippingFirstName').value = document.getElementById('billingFirstName').value;
    document.getElementById('shippingLastName').value = document.getElementById('billingLastName').value;
    document.getElementById('shippingAddress').value = document.getElementById('billingAddress').value;
    document.getElementById('shippingCity').value = document.getElementById('billingCity').value;
    document.getElementById('shippingZip').value = document.getElementById('billingZip').value;
    document.getElementById('shippingCountry').value = document.getElementById('billingCountry').value;
}

function formatCardNumber(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;
}

function formatCardExpiry(e) {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
        value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    e.target.value = value;
}

function formatCardCvv(e) {
    e.target.value = e.target.value.replace(/\D/g, '');
}

function updateShippingCost() {
    const selectedMethod = document.querySelector('input[name="shippingMethod"]:checked').value;
    let shippingCost = 0;
    
    switch (selectedMethod) {
        case 'standard':
            shippingCost = 5.99;
            break;
        case 'express':
            shippingCost = 12.99;
            break;
        case 'free':
            shippingCost = 0;
            break;
    }
    
    document.getElementById('shippingCost').textContent = `$${shippingCost.toFixed(2)}`;
    updateOrderTotal();
}

function updateOrderTotal() {
    const subtotal = 109.97; // This would normally come from cart data
    const shippingCost = parseFloat(document.getElementById('shippingCost').textContent.replace('$', ''));
    const tax = subtotal * 0.08; // 8% tax rate
    
    document.getElementById('tax').textContent = `$${tax.toFixed(2)}`;
    document.getElementById('total').textContent = `$${(subtotal + shippingCost + tax).toFixed(2)}`;
}

function applyCoupon() {
    const couponCode = document.getElementById('couponCode').value;
    if (couponCode.toUpperCase() === 'SAVE10') {
        alert('Coupon applied! You saved 10% on your order.');
        // In a real app, you would update the order total here
    } else if (couponCode) {
        alert('Invalid coupon code. Please try again.');
    }
}

function populateReviewSections() {
    // Billing Information
    const billingFields = [
        { label: 'Name', value: `${document.getElementById('billingFirstName').value} ${document.getElementById('billingLastName').value}` },
        { label: 'Email', value: document.getElementById('billingEmail').value },
        { label: 'Phone', value: document.getElementById('billingPhone').value },
        { label: 'Address', value: document.getElementById('billingAddress').value },
        { label: 'City, Zip', value: `${document.getElementById('billingCity').value}, ${document.getElementById('billingZip').value}` },
        { label: 'Country', value: document.getElementById('billingCountry').options[document.getElementById('billingCountry').selectedIndex].text }
    ];
    
    let billingHtml = '';
    billingFields.forEach(field => {
        billingHtml += `<p><strong>${field.label}:</strong> ${field.value}</p>`;
    });
    document.getElementById('reviewBilling').innerHTML = billingHtml;
    
    // Shipping Information
    const shippingFields = [
        { label: 'Name', value: `${document.getElementById('shippingFirstName').value} ${document.getElementById('shippingLastName').value}` },
        { label: 'Address', value: document.getElementById('shippingAddress').value },
        { label: 'City, Zip', value: `${document.getElementById('shippingCity').value}, ${document.getElementById('shippingZip').value}` },
        { label: 'Country', value: document.getElementById('shippingCountry').options[document.getElementById('shippingCountry').selectedIndex].text },
        { label: 'Shipping Method', value: document.querySelector('input[name="shippingMethod"]:checked').parentElement.textContent.trim() }
    ];
    
    let shippingHtml = '';
    shippingFields.forEach(field => {
        shippingHtml += `<p><strong>${field.label}:</strong> ${field.value}</p>`;
    });
    document.getElementById('reviewShipping').innerHTML = shippingHtml;
    
    // Payment Information
    const paymentMethod = document.querySelector('.payment-method.active').textContent.trim();
    let paymentHtml = `<p><strong>Payment Method:</strong> ${paymentMethod}</p>`;
    
    if (paymentMethod.includes('Credit Card')) {
        paymentHtml += `
            <p><strong>Card Number:</strong> **** **** **** ${document.getElementById('cardNumber').value.slice(-4)}</p>
            <p><strong>Name on Card:</strong> ${document.getElementById('cardName').value}</p>
            <p><strong>Expires:</strong> ${document.getElementById('cardExpiry').value}</p>
        `;
    }
    
    document.getElementById('reviewPayment').innerHTML = paymentHtml;
}

function placeOrder() {
    if (validateForm('reviewForm')) {
        // In a real application, you would send the order data to your server here
        alert('Thank you for your order! Your purchase has been completed successfully.');
        
        // Reset the form (in a real app you'd redirect to a confirmation page)
        document.querySelectorAll('.checkout-form').forEach(form => form.classList.remove('active'));
        document.getElementById('billingForm').classList.add('active');
        document.querySelectorAll('.step').forEach((step, index) => {
            step.classList.remove('active');
            if (index === 0) step.classList.add('active');
        });
        
        // Scroll to top
        window.scrollTo(0, 0);
    }
}

// Company data
const companyData = {
    name: "TechSolutions Inc.",
    founded: "2010",
    location: "San Francisco, CA",
    employees: "150+",
    description: "TechSolutions is a leading provider of innovative software solutions for businesses of all sizes. We specialize in creating custom applications that streamline operations and enhance productivity.",
    email: "info@techsolutions.com",
    phone: "(555) 123-4567"
};

// Mission statement
const missionStatement = {
    title: "Empowering Businesses Through Technology",
    statement: "Our mission is to deliver cutting-edge technological solutions that help businesses thrive in the digital age. We believe in creating software that is not only functional but also intuitive and user-friendly. By combining innovation with reliability, we aim to be the trusted partner for all our clients' technological needs."
};

// Team members
const teamMembers = [
    {
        name: "Sarah Johnson",
        position: "CEO & Founder",
        bio: "Sarah founded TechSolutions with a vision to bridge the gap between business needs and technology solutions.",
        image: "https://randomuser.me/api/portraits/women/65.jpg"
    },
    {
        name: "Michael Chen",
        position: "CTO",
        bio: "Michael leads our technical team with over 15 years of experience in software architecture.",
        image: "https://randomuser.me/api/portraits/men/32.jpg"
    },
    {
        name: "Emily Rodriguez",
        position: "Lead Developer",
        bio: "Emily specializes in front-end development and user experience design.",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
        name: "David Kim",
        position: "Marketing Director",
        bio: "David develops strategies to communicate our value proposition to clients worldwide.",
        image: "https://randomuser.me/api/portraits/men/75.jpg"
    }
];

// DOM elements
const companyContent = document.getElementById('company-content');
const missionContent = document.getElementById('mission-content');
const teamContent = document.getElementById('team-content');
const currentYear = document.getElementById('current-year');

// Display company information
function displayCompanyInfo() {
    companyContent.innerHTML = `
        <h3>${companyData.name}</h3>
        <p><strong>Founded:</strong> ${companyData.founded}</p>
        <p><strong>Location:</strong> ${companyData.location}</p>
        <p><strong>Employees:</strong> ${companyData.employees}</p>
        <p>${companyData.description}</p>
        <p><strong>Contact:</strong> ${companyData.email} | ${companyData.phone}</p>
    `;
}

// Display mission statement
function displayMission() {
    missionContent.innerHTML = `
        <h3>${missionStatement.title}</h3>
        <p>${missionStatement.statement}</p>
    `;
}

// Display team members
function displayTeam() {
    let teamHTML = '';
    teamMembers.forEach(member => {
        teamHTML += `
            <div class="team-member">
                <img src="${member.image}" alt="${member.name}">
                <h3>${member.name}</h3>
                <p class="position">${member.position}</p>
                <p class="bio">${member.bio}</p>
            </div>
        `;
    });
    teamContent.innerHTML = teamHTML;
}

// Set current year in footer
function setCurrentYear() {
    const year = new Date().getFullYear();
    currentYear.textContent = year;
}

// Initialize the page
function init() {
    displayCompanyInfo();
    displayMission();
    displayTeam();
    setCurrentYear();
}
document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    alert("Thanks For Contact Us!!");
    
    // Here you would typically:
    // 1. Validate form data
    // 2. Send data to server (AJAX)
    // 3. Show success message
    // 4. Reset form or redirect
  });

// Run when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Initialize the map when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    const currentYear = document.getElementById('current-year');
    currentYear.textContent = new Date().getFullYear();
    
    // Initialize the map (using Leaflet.js)
    initMap();
    
    // Setup form submission
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Simple validation
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showFormMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Here you would typically send the data to a server
        // For this example, we'll just simulate a successful submission
        simulateFormSubmission(formData);
    });
    
    function simulateFormSubmission(formData) {
        // Simulate API call with timeout
        setTimeout(() => {
            console.log('Form submitted:', formData);
            showFormMessage('Thank you for your message! We will get back to you soon.', 'success');
            contactForm.reset();
        }, 1000);
    }
    
    function showFormMessage(message, type) {
        formMessage.textContent = message;
        formMessage.className = 'form-message ' + type;
        
        // Hide message after 5 seconds
        setTimeout(() => {
            formMessage.style.display = 'none';
        }, 5000);
    }
});

function initMap() {
    // Coordinates for San Francisco (example)
    const companyLocation = [37.7749, -122.4194];
    
    // Create the map
    const map = L.map('map').setView(companyLocation, 13);
    
    // Add OpenStreetMap tiles
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    
    // Add a marker
    L.marker(companyLocation).addTo(map)
        .bindPopup('<b>Our Office</b><br>123 Business Street, San Francisco')
        .openPopup();
    
    // Add a circle to highlight the area
    L.circle(companyLocation, {
        color: '#e74c3c',
        fillColor: '#e74c3c',
        fillOpacity: 0.2,
        radius: 500
    }).addTo(map);
}

// Sample blog data
const blogData = [
    // ... (keep your existing blog data array)
];

// DOM elements
const articlesContainer = document.getElementById('articlesContainer');
const categoryItems = document.querySelectorAll('.categories li');
const tabButtons = document.querySelectorAll('.tab-btn');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const pageNumbers = document.getElementById('pageNumbers');
const searchInput = document.querySelector('.search-box input');
const searchButton = document.querySelector('.search-box button');
const newsletterForm = document.getElementById('newsletterForm');

// Blog state
const blogState = {
    currentPage: 1,
    articlesPerPage: 6,
    filteredArticles: [...blogData],
    currentCategory: 'all',
    currentSearchTerm: ''
};

// Initialize the blog
function initBlog() {
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize pagination
    resetPagination();
    
    // Display articles
    displayArticles();
    
    // Setup event listeners
    setupEventListeners();
}

// Reset pagination to first page
function resetPagination() {
    blogState.currentPage = 1;
}

// Display articles based on current filters and pagination
function displayArticles() {
    // Clear existing articles
    articlesContainer.innerHTML = '';
    
    // Calculate pagination
    const startIndex = (blogState.currentPage - 1) * blogState.articlesPerPage;
    const endIndex = startIndex + blogState.articlesPerPage;
    const articlesToDisplay = blogState.filteredArticles.slice(startIndex, endIndex);
    
    // Display articles
    if (articlesToDisplay.length === 0) {
        articlesContainer.innerHTML = '<p class="no-articles">No articles found matching your criteria.</p>';
    } else {
        articlesToDisplay.forEach(article => {
            const articleCard = createArticleCard(article);
            articlesContainer.appendChild(articleCard);
        });
    }
    
    // Update pagination controls
    updatePaginationControls();
}

// ... (keep your existing createArticleCard function)

// Update pagination controls
function updatePaginationControls() {
    const totalPages = Math.ceil(blogState.filteredArticles.length / blogState.articlesPerPage);
    
    // Clear existing page numbers
    pageNumbers.innerHTML = '';
    
    // Add page numbers
    for (let i = 1; i <= totalPages; i++) {
        const pageNumber = document.createElement('span');
        pageNumber.className = `page-number ${i === blogState.currentPage ? 'active' : ''}`;
        pageNumber.textContent = i;
        pageNumber.addEventListener('click', () => {
            blogState.currentPage = i;
            displayArticles();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
        pageNumbers.appendChild(pageNumber);
    }
    
    // Update prev/next buttons
    prevBtn.disabled = blogState.currentPage === 1;
    nextBtn.disabled = blogState.currentPage === totalPages || totalPages === 0;
}

// Filter articles by category
function filterByCategory(category) {
    blogState.currentCategory = category;
    resetPagination();
    
    if (category === 'all') {
        blogState.filteredArticles = [...blogData];
    } else {
        blogState.filteredArticles = blogData.filter(article => article.category === category);
    }
    
    // Apply search filter if there's a search term
    if (blogState.currentSearchTerm) {
        blogState.filteredArticles = blogState.filteredArticles.filter(article => 
            article.title.toLowerCase().includes(blogState.currentSearchTerm) || 
            article.excerpt.toLowerCase().includes(blogState.currentSearchTerm)
        );
    }
    
    displayArticles();
}

// Search articles
function searchArticles(term) {
    blogState.currentSearchTerm = term.toLowerCase();
    resetPagination();
    
    if (blogState.currentCategory === 'all') {
        blogState.filteredArticles = blogData.filter(article => 
            article.title.toLowerCase().includes(blogState.currentSearchTerm) || 
            article.excerpt.toLowerCase().includes(blogState.currentSearchTerm)
        );
    } else {
        blogState.filteredArticles = blogData.filter(article => 
            article.category === blogState.currentCategory && 
            (article.title.toLowerCase().includes(blogState.currentSearchTerm) || 
             article.excerpt.toLowerCase().includes(blogState.currentSearchTerm))
        );
    }
    
    displayArticles();
}

// Setup event listeners
function setupEventListeners() {
    // Category filter (sidebar)
    categoryItems.forEach(item => {
        item.addEventListener('click', () => {
            categoryItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            filterByCategory(item.dataset.category);
        });
    });
    
    // Tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            filterByCategory(button.dataset.category);
        });
    });
    
    // Pagination buttons
    prevBtn.addEventListener('click', () => {
        if (blogState.currentPage > 1) {
            blogState.currentPage--;
            displayArticles();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(blogState.filteredArticles.length / blogState.articlesPerPage);
        if (blogState.currentPage < totalPages) {
            blogState.currentPage++;
            displayArticles();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
    });
    
    // Search functionality
    searchButton.addEventListener('click', (e) => {
        e.preventDefault();
        searchArticles(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchArticles(searchInput.value);
        }
    });
    
    // Newsletter form
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}!`);
        newsletterForm.reset();
    });
}

// Initialize the blog when the page loads
document.addEventListener('DOMContentLoaded', initBlog);