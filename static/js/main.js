// Main JavaScript functionality
document.addEventListener('DOMContentLoaded', function() {
    // Track page view in Yandex Metrica
    if (typeof ym !== 'undefined') {
        ym(103671945, 'hit', window.location.href);
    }

    // Smooth scrolling for navigation
    window.scrollToCalculator = function() {
        document.getElementById('calculator').scrollIntoView({ 
            behavior: 'smooth' 
        });
        
        // Track scroll event
        if (typeof ym !== 'undefined') {
            ym(103671945, 'reachGoal', 'scroll_to_calculator');
        }
    };

    // Floating contact button functionality
    const contactToggle = document.getElementById('contactToggle');
    const contactOptions = document.getElementById('contactOptions');
    let contactOpen = false;

    if (contactToggle && contactOptions) {
        contactToggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            contactOpen = !contactOpen;
            
            if (contactOpen) {
                contactOptions.classList.add('active');
                contactToggle.innerHTML = '<i class="fas fa-times"></i>';
                
                // Track contact button click
                if (typeof ym !== 'undefined') {
                    ym(103671945, 'reachGoal', 'contact_button_click');
                }
            } else {
                contactOptions.classList.remove('active');
                contactToggle.innerHTML = '<i class="fas fa-phone"></i>';
            }
        });

        // Close contact options when clicking outside
        document.addEventListener('click', function(event) {
            if (!contactToggle.contains(event.target) && !contactOptions.contains(event.target)) {
                contactOpen = false;
                contactOptions.classList.remove('active');
                contactToggle.innerHTML = '<i class="fas fa-phone"></i>';
            }
        });
    }

    // Add loading animation to hero section
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        heroSection.style.opacity = '0';
        setTimeout(() => {
            heroSection.style.transition = 'opacity 1s ease-in-out';
            heroSection.style.opacity = '1';
        }, 100);
    }

    // Add scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);

    // Observe car cards for animation
    const carCards = document.querySelectorAll('.car-card');
    carCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effects to buttons
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Error handling for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('error', function() {
            this.style.display = 'none';
        });
    });

    // Add keyboard navigation support
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && contactOpen) {
            contactOpen = false;
            contactOptions.classList.remove('active');
            contactToggle.innerHTML = '<i class="fas fa-phone"></i>';
        }
    });

    // Performance optimization: lazy loading for non-critical elements
    const lazyElements = document.querySelectorAll('[data-lazy]');
    const lazyObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const element = entry.target;
                element.classList.add('loaded');
                lazyObserver.unobserve(element);
            }
        });
    });

    lazyElements.forEach(element => {
        lazyObserver.observe(element);
    });

    // Booking Form Functionality
    const bookingForm = document.getElementById('bookingForm');
    const fromCityBooking = document.getElementById('fromCityBooking');
    const toCityBooking = document.getElementById('toCityBooking');
    
    // Set min date to today
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('date').min = today;
    
    // If calculator cities are set, prefill booking form
    if (window.taxiCalculator) {
        if (window.taxiCalculator.selectedFromCity) {
            fromCityBooking.value = window.taxiCalculator.selectedFromCity.display_name || '';
        }
        if (window.taxiCalculator.selectedToCity) {
            toCityBooking.value = window.taxiCalculator.selectedToCity.display_name || '';
        }
    }
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitBookingForm();
        });
    }
    
    // Simple phone input with auto +7 prefix
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('focus', function() {
            if (!this.value.startsWith('+7')) {
                this.value = '+7';
            }
        });
    }

    console.log('🚗 Междугородние Такси - приложение загружено успешно');
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} notification`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-triangle' : 'info-circle'} me-2"></i>
        ${message}
    `;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        z-index: 1060;
        min-width: 300px;
        animation: slideInRight 0.5s ease-out;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.5s ease-in';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 500);
    }, 5000);
}

// Add notification animations to CSS
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

// Booking Form Functions
function validateBookingForm() {
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const date = document.getElementById('date').value;
    let isValid = true;
    
    // Reset validation
    document.getElementById('fullName').classList.remove('is-invalid');
    document.getElementById('phone').classList.remove('is-invalid');
    document.getElementById('date').classList.remove('is-invalid');
    
    // Validate full name (at least two words)
    if (fullName.split(' ').filter(part => part.length > 1).length < 2) {
        document.getElementById('fullName').classList.add('is-invalid');
        isValid = false;
    }
    
    // Simplified phone validation (minimum 10 digits)
    const phoneDigits = phone.replace(/\D/g, '');
    if (phoneDigits.length < 11 || !phoneDigits.startsWith('7')) {
        document.getElementById('phone').classList.add('is-invalid');
        isValid = false;
    }
    
    // Validate date (must be in the future)
    if (!date) {
        document.getElementById('date').classList.add('is-invalid');
        isValid = false;
    } else {
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        if (selectedDate < today) {
            document.getElementById('date').classList.add('is-invalid');
            isValid = false;
        }
    }
    
    return isValid;
}

function submitBookingForm() {
    if (!validateBookingForm()) {
        return;
    }
    
    const fullName = document.getElementById('fullName').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const fromCity = document.getElementById('fromCityBooking').value;
    const toCity = document.getElementById('toCityBooking').value;
    const date = document.getElementById('date').value;
    const comments = document.getElementById('comments').value.trim();
    
    const formData = {
        full_name: fullName,
        phone: phone,
        from_city: fromCity,
        to_city: toCity,
        date: date,
        comments: comments
    };
    
    setBookingLoading(true);
    
    fetch('/submit-request', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            showBookingSuccess();
            
            // Track successful booking
            if (typeof ym !== 'undefined') {
                ym(103671945, 'reachGoal', 'booking_success');
            }
            
            // Reset form
            document.getElementById('bookingForm').reset();
        } else {
            showBookingError(data.message || 'Ошибка при отправке заявки');
            
            // Track booking error
            if (typeof ym !== 'undefined') {
                ym(103671945, 'reachGoal', 'booking_error');
            }
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showBookingError('Сетевая ошибка. Пожалуйста, попробуйте позже.');
        
        // Track network error
        if (typeof ym !== 'undefined') {
            ym(103671945, 'reachGoal', 'network_error');
        }
    })
    .finally(() => {
        setBookingLoading(false);
    });
}

function setBookingLoading(loading) {
    const submitButton = document.querySelector('#bookingForm button[type="submit"]');
    if (!submitButton) return;
    
    const btnText = submitButton.querySelector('.btn-text');
    const btnLoading = submitButton.querySelector('.btn-loading');
    
    if (loading) {
        submitButton.disabled = true;
        btnText.classList.add('d-none');
        btnLoading.classList.remove('d-none');
    } else {
        submitButton.disabled = false;
        btnText.classList.remove('d-none');
        btnLoading.classList.add('d-none');
    }
}

function showBookingSuccess() {
    const successElement = document.getElementById('bookingSuccess');
    const errorElement = document.getElementById('bookingError');
    
    if (errorElement) errorElement.classList.add('d-none');
    if (successElement) {
        successElement.classList.remove('d-none');
        
        // Auto hide after 5 seconds
        setTimeout(() => {
            successElement.classList.add('d-none');
        }, 5000);
    }
}

function showBookingError(message) {
    const errorElement = document.getElementById('bookingError');
    const messageElement = document.getElementById('bookingErrorMessage');
    
    if (errorElement && messageElement) {
        messageElement.textContent = message;
        errorElement.classList.remove('d-none');
        
        // Scroll to error
        setTimeout(() => {
            errorElement.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 100);
    }
}
