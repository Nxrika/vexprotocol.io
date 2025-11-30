// Simple animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all tech cards and sections
    document.querySelectorAll('.tech-card, .section-header').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Simple chart animation
    const chartCanvas = document.getElementById('volatilityChart');
    if (chartCanvas) {
        const ctx = chartCanvas.getContext('2d');
        
        // Set canvas size
        chartCanvas.width = chartCanvas.offsetWidth;
        chartCanvas.height = chartCanvas.offsetHeight;
        
        // Draw a simple animated line chart
        function drawChart() {
            const width = chartCanvas.width;
            const height = chartCanvas.height;
            const padding = 40;
            
            ctx.clearRect(0, 0, width, height);
            
            // Draw grid
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
            ctx.lineWidth = 1;
            
            // Vertical lines
            for (let i = 0; i <= 5; i++) {
                const x = padding + (i * (width - 2 * padding) / 5);
                ctx.beginPath();
                ctx.moveTo(x, padding);
                ctx.lineTo(x, height - padding);
                ctx.stroke();
            }
            
            // Horizontal lines
            for (let i = 0; i <= 5; i++) {
                const y = padding + (i * (height - 2 * padding) / 5);
                ctx.beginPath();
                ctx.moveTo(padding, y);
                ctx.lineTo(width - padding, y);
                ctx.stroke();
            }
            
            // Draw data line
            ctx.strokeStyle = '#2563eb';
            ctx.lineWidth = 3;
            ctx.beginPath();
            
            const dataPoints = [30, 45, 35, 50, 40, 55, 42];
            const xStep = (width - 2 * padding) / (dataPoints.length - 1);
            
            dataPoints.forEach((point, index) => {
                const x = padding + (index * xStep);
                const y = height - padding - ((point - 20) / 40) * (height - 2 * padding);
                
                if (index === 0) {
                    ctx.moveTo(x, y);
                } else {
                    ctx.lineTo(x, y);
                }
            });
            
            ctx.stroke();
            
            // Draw points
            dataPoints.forEach((point, index) => {
                const x = padding + (index * xStep);
                const y = height - padding - ((point - 20) / 40) * (height - 2 * padding);
                
                ctx.fillStyle = '#2563eb';
                ctx.beginPath();
                ctx.arc(x, y, 4, 0, 2 * Math.PI);
                ctx.fill();
            });
        }
        
        drawChart();
        window.addEventListener('resize', drawChart);
    }

    // Update CVX value with slight animation
    function animateCVXValue() {
        const cvxValue = document.querySelector('.cvx-value .value');
        if (cvxValue) {
            const currentValue = parseFloat(cvxValue.textContent);
            const fluctuation = (Math.random() - 0.5) * 2; // -1 to +1
            const newValue = Math.max(30, Math.min(70, currentValue + fluctuation));
            
            cvxValue.style.transform = 'scale(1.1)';
            setTimeout(() => {
                cvxValue.textContent = newValue.toFixed(2);
                cvxValue.style.transform = 'scale(1)';
            }, 150);
        }
    }
    
    // Update every 5 seconds to simulate live data
    setInterval(animateCVXValue, 5000);
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
