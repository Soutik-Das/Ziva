document.addEventListener('DOMContentLoaded', () => {
    // Sidebar and menu toggle functionality
    const sidebar = document.querySelector('.sidebar');
    const menuToggle = document.querySelector('.menu-toggle');
    const mainContent = document.querySelector('.main-content');
    
    // Toggle sidebar collapse
    menuToggle.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        mainContent.classList.toggle('expanded');
        
        // Change the toggle icon
        menuToggle.textContent = sidebar.classList.contains('collapsed') ? '☰' : '✕';
    });

    // Highlight active menu item
    const links = document.querySelectorAll('.sidebar-menu a');
    links.forEach(link => {
        link.addEventListener('click', (event) => {
            links.forEach(link => link.classList.remove('active'));
            event.target.classList.add('active');
        });
    });

    // Card number animation
    const animateCount = (element, target) => {
        let current = 0;
        const increment = target / 100; // Change speed as needed
        const updateCount = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCount);
            } else {
                element.textContent = target;
            }
        };
        updateCount();
    };

    // Apply animation to card numbers on load
    const cardValues = document.querySelectorAll('.card p');
    cardValues.forEach(card => {
        const targetValue = parseInt(card.textContent, 10);
        animateCount(card, targetValue);
    });
});

