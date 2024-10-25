document.getElementById('fetchPrice').addEventListener('click', async () => {
    const crypto = document.getElementById('crypto').value;
    const currentPriceElement = document.getElementById('currentPrice');
    const predictedPriceElement = document.getElementById('predictedPrice');

    try {
        // Fetching current price
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        const currentPrice = data[crypto].usd;
        
        // Display current price
        currentPriceElement.textContent = `$${currentPrice}`;

        // Simple prediction logic: Increase the current price by a random percentage
        const predictedPrice = (currentPrice * (1 + Math.random() * 0.1)).toFixed(2);
        
        // Display predicted price
        predictedPriceElement.textContent = `$${predictedPrice}`;
    } catch (error) {
        console.error('Error fetching data:', error);
        currentPriceElement.textContent = 'Error';
        predictedPriceElement.textContent = 'Error';
    }
});
 // Theme Toggle
 function toggleTheme() {
    document.body.classList.toggle('dark-theme');
}

// Real-Time Price Tracker
async function updateChart() {
    const crypto = document.getElementById('cryptoSelector').value;
    const response = await fetch(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=7`);
    const data = await response.json();
    
    const dates = data.prices.map(price => new Date(price[0]).toLocaleDateString());
    const prices = data.prices.map(price => price[1]);

    const ctx = document.getElementById('priceChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates,
            datasets: [{ label: `${crypto} Price`, data: prices, borderColor: 'rgba(0, 255, 204, 1)', fill: false }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}
updateChart();

// Custom Alerts
function setAlert() {
    const crypto = document.getElementById('cryptoSelector').value;
    const alertPrice = parseFloat(document.getElementById('alertPrice').value);
    
    setInterval(async () => {
        const response = await fetch(`https://api.coingecko.com/api/v3/simple/price?ids=${crypto}&vs_currencies=usd`);
        const data = await response.json();
        const currentPrice = data[crypto].usd;
        if (currentPrice >= alertPrice) {
            document.getElementById('alertMessage').textContent = `${crypto.toUpperCase()} has reached your alert price of $${alertPrice}!`;
        }
    }, 60000);
}

// News Feed
async function loadNews() {
    const response = await fetch('https://cryptopanic.com/api/v1/posts/?auth_token=YOUR_API_KEY');
    const data = await response.json();
    const newsList = document.getElementById('newsFeed');
    newsList.innerHTML = data.results.map(item => `<li>${item.title}</li>`).join('');
}
loadNews();

// Sentiment Analysis
async function loadSentiment() {
    const response = await fetch('https://api.alternative.me/fng/');
    const data = await response.json();
    document.getElementById('sentiment').textContent = `Current Sentiment: ${data.data[0].value_classification}`;
}
loadSentiment();

// Portfolio Management
const portfolio = [];
function addToPortfolio() {
    const crypto = document.getElementById('portfolioCrypto').value.toUpperCase();
    const amount = document.getElementById('portfolioAmount').value;
    portfolio.push({ crypto, amount });
    updatePortfolioDisplay();
}
function updatePortfolioDisplay() {
    const list = document.getElementById('portfolioList');
    list.innerHTML = portfolio.map(item => `<li>${item.amount} ${item.crypto}</li>`).join('');
}

// Risk Score Indicator
function calculateRisk() {
    const riskLevels = ["Low", "Medium", "High"];
    document.getElementById('riskIndicator').textContent = `Risk Level: ${riskLevels[Math.floor(Math.random() * riskLevels.length)]}`;
}
calculateRisk();