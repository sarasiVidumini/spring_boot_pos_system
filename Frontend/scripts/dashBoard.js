lucide.createIcons();

setInterval(() => {
    const now = new Date();
    document.getElementById('clock').innerText = now.toLocaleTimeString();
}, 1000);

function updateDashboardStats() {

    // Customers count
    $.ajax({
        url: "http://localhost:8080/api/v1/customers",
        method: "GET",
        success: function (res) {
            let list = res.data || res;
            if(Array.isArray(list)) $('#totalCustomers').text(list.length);
        }
    });

    // Items count
    $.ajax({
        url: "http://localhost:8080/api/v1/items",
        method: "GET",
        success: function (res) {
            let list = res.data || res;
            if(Array.isArray(list)) $('#totalItems').text(list.length);
        }
    });

    // Orders & Income calculation
    $.ajax({
        url: "http://localhost:8080/api/v1/orders",
        method: "GET",
        success: function (res) {
            let orderList = res.data || res;

            if(Array.isArray(orderList)) {
                $('#totalOrders').text(orderList.length);

                let totalIncome = 0;
                orderList.forEach(order => {

                    if(order.total) {
                        totalIncome += parseFloat(order.total);
                    }

                    else if(order.orderDetails || order.orderDetail) {
                        let details = order.orderDetails || order.orderDetail;
                        details.forEach(d => {
                            totalIncome += (d.qty * d.unitPrice);
                        });
                    }
                });
                $('#totalIncome').text("Rs. " + totalIncome.toLocaleString(undefined, {minimumFractionDigits: 2}));
            }
        },
        error: function(err) {
            console.error("Orders load error:", err);
        }
    });
}

const ctx = document.getElementById('myChart').getContext('2d');
new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
        datasets: [
            {
                label: 'Series 1',
                data: [15, 25, 60, 75, 130],
                borderColor: 'rgba(96, 165, 250, 1)',
                backgroundColor: 'rgba(96, 165, 250, 0.4)',
                fill: true,
                tension: 0.4,
                pointRadius: 4
            },
            {
                label: 'Series 2',
                data: [10, 20, 45, 60, 90],
                borderColor: 'rgba(59, 130, 246, 1)',
                backgroundColor: 'rgba(59, 130, 246, 0.5)',
                fill: true,
                tension: 0.4,
                pointRadius: 4
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: { display: false }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: { color: 'rgba(255,255,255,0.05)' },
                ticks: { color: '#94a3b8' }
            },
            x: {
                grid: { display: false },
                ticks: { color: '#94a3b8' }
            }
        }
    }
});

$(document).ready(function() {
    updateDashboardStats();
});