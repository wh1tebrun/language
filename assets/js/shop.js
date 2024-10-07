// shop.js

document.addEventListener('DOMContentLoaded', function () {
    // Get gem count from localStorage
    let gemCount = parseInt(localStorage.getItem('gems')) || 0;

    // Update gem count in the UI
    const gemNumber = document.querySelector('#gem-number');
    if (gemNumber) {
        gemNumber.textContent = gemCount;
    }

    // Initialize purchased items if not set
    let purchasedItems = JSON.parse(localStorage.getItem('purchasedItems')) || [];

    // Add event listeners to buy buttons
    const buyButtons = document.querySelectorAll('.buy-button');
    buyButtons.forEach(function (button) {
        const item = button.dataset.item;

        // Disable button if item is already purchased
        if (purchasedItems.includes(item)) {
            button.disabled = true;
            button.textContent = 'Purchased';
        }

        button.addEventListener('click', function () {
            const priceElement = this.parentElement.querySelector('.price-amount');
            const price = parseInt(priceElement.textContent);

            // Check if user has enough gems
            if (gemCount >= price) {
                // Subtract the price from gem count
                gemCount -= price;
                localStorage.setItem('gems', gemCount);

                // Update gem count in the UI
                if (gemNumber) {
                    gemNumber.textContent = gemCount;
                }

                // Add item to purchased items
                purchasedItems.push(item);
                localStorage.setItem('purchasedItems', JSON.stringify(purchasedItems));

                alert('Purchase successful!');
                // Disable the buy button
                this.disabled = true;
                this.textContent = 'Purchased';
            } else {
                alert('You do not have enough gems to purchase this item.');
            }
        });
    });
});
