// Sample sales data (you can replace it with actual data from a database)
const sales = [
    { product: 'Original Flavor', amount: 130.00, date: '2023-12-20T10:30:00' },
    { product: 'Sour Cream', amount: 140.00, date: '2023-12-21T15:45:00' },
    { product: 'Cheese', amount: 150.00, date: '2023-12-21T15:45:00' },
    // Add other sales here
];

document.addEventListener('DOMContentLoaded', function () {
    const salesList = document.getElementById('salesList');
    const storedSales = JSON.parse(localStorage.getItem('sales')) || [];

    // Display existing sales on page load
    storedSales.forEach(sale => {
        displaySale(sale);
    });

    // Function to display a sale
    function displaySale(sale) {
        const listItem = document.createElement('li');
        listItem.classList.add('list-group-item');
        
        // Assuming sale.date is a string in the format 'YYYY-MM-DDTHH:mm:ss'
        const saleDate = new Date(sale.date).toLocaleString();

        listItem.textContent = `Product: ${sale.product}, Amount: ₱${sale.amount}, Date: ${saleDate}`;

        salesList.appendChild(listItem);
    }
});
