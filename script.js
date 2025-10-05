// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ========== MOBILE MENU TOGGLE ==========
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('hidden');
        mobileMenu.classList.toggle('active');
        
        // Animate hamburger icon
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close mobile menu when clicking on a link
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', function() {
            mobileMenu.classList.add('hidden');
            mobileMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
    
    
    // ========== NAVBAR SCROLL EFFECT ==========
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add shadow when scrolled down
        if (currentScroll > 50) {
            navbar.classList.add('navbar-scrolled');
        } else {
            navbar.classList.remove('navbar-scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ========== SMOOTH SCROLLING FOR NAVIGATION LINKS ==========
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    
    // ========== FADE-IN ANIMATION ON SCROLL ==========
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // Intersection Observer for fade-in animations
    const fadeInObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: '0px 0px -50px 0px' // Start animation slightly before element enters viewport
    });
    
    fadeElements.forEach(element => {
        fadeInObserver.observe(element);
    });
    
    
    // ========== EXPERIENCE CARDS ANIMATION ==========
    const experienceCards = document.querySelectorAll('.experience-card');
    
    // Intersection Observer for experience cards with staggered animation
    const experienceObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add a slight delay for each card for staggered effect
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 150); // 150ms delay between each card
                experienceObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
    });
    
    experienceCards.forEach(card => {
        experienceObserver.observe(card);
    });
    
    
    // ========== ACTIVE NAV LINK HIGHLIGHTING ==========
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavLink() {
        const scrollPosition = window.pageYOffset + 100; // Offset for navbar height
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                // Remove active class from all links
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('text-blue-500');
                });
                
                // Add active class to current section link
                const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('text-blue-500');
                }
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavLink);
    
    
    // ========== CONTACT FORM HANDLING ==========
    const contactForm = document.getElementById('contact-form');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        // Create or get message element
        let formMessage = document.querySelector('.form-message');
        if (!formMessage) {
            formMessage = document.createElement('div');
            formMessage.className = 'form-message';
            contactForm.appendChild(formMessage);
        }
        
        // Simulate form submission with loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call delay
        setTimeout(() => {
            // Show success message
            formMessage.textContent = `Thank you, ${name}! Your message has been sent successfully. I'll get back to you soon.`;
            formMessage.classList.remove('error');
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            
            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
            
            // Clear form
            contactForm.reset();
            
            // Hide message after 5 seconds
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }, 1500);
        
        // In a real application, you would do something like:
        /*
        fetch('your-api-endpoint', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, email, message })
        })
        .then(response => response.json())
        .then(data => {
            formMessage.textContent = 'Message sent successfully!';
            formMessage.classList.add('success');
            formMessage.style.display = 'block';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        })
        .catch(error => {
            formMessage.textContent = 'Failed to send message. Please try again.';
            formMessage.classList.add('error');
            formMessage.style.display = 'block';
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        });
        */
    });
    
    
    // ========== PROJECT MARQUEE HOVER CONTROL ==========
    const projectCardsSmall = document.querySelectorAll('.project-card-small');
    
    projectCardsSmall.forEach(card => {
        card.addEventListener('mouseenter', function() {
            // Pause marquee when hovering over a specific card
            const marqueeContent = document.querySelector('.marquee-content');
            if (marqueeContent) {
                marqueeContent.style.animationPlayState = 'paused';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            // Resume marquee when not hovering
            const marqueeContent = document.querySelector('.marquee-content');
            if (marqueeContent) {
                marqueeContent.style.animationPlayState = 'running';
            }
        });
    });
    
    
    // ========== SKILL CARDS ANIMATION ==========
    const skillCards = document.querySelectorAll('.skill-card');
    
    skillCards.forEach((card, index) => {
        // Add staggered hover effect
        card.style.transitionDelay = `${index * 0.05}s`;
    });
    
    
    // ========== SCROLL TO TOP BUTTON ==========
    // Create a scroll to top button
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollTopBtn.className = 'fixed bottom-8 right-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white w-12 h-12 rounded-full shadow-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 opacity-0 pointer-events-none z-40';
    scrollTopBtn.setAttribute('id', 'scroll-top-btn');
    scrollTopBtn.setAttribute('aria-label', 'Scroll to top');
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.opacity = '1';
            scrollTopBtn.style.pointerEvents = 'auto';
        } else {
            scrollTopBtn.style.opacity = '0';
            scrollTopBtn.style.pointerEvents = 'none';
        }
    });
    
    // Scroll to top on click
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ========== PARALLAX EFFECT FOR HERO IMAGE ==========
    const heroImage = document.querySelector('.hero-image');
    
    if (heroImage) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < window.innerHeight) {
                heroImage.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }
    
    
    // ========== TYPING EFFECT FOR HERO ROLE ==========
    const roleElement = document.querySelector('#home .typing-text');
    if (roleElement) {
        const roles = ['Frontend Developer', 'UI/UX Enthusiast', 'React Developer', 'Web Designer'];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        
        function typeRole() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                roleElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
            } else {
                roleElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
            }
            
            let typeSpeed = isDeleting ? 50 : 100;
            
            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before next role
            }
            
            setTimeout(typeRole, typeSpeed);
        }
        
        // Start typing effect after page loads
        setTimeout(typeRole, 1000);
    }
    
    
    // ========== PERFORMANCE OPTIMIZATION ==========
    // Debounce function for scroll events
    function debounce(func, wait = 10, immediate = true) {
        let timeout;
        return function() {
            const context = this;
            const args = arguments;
            const later = function() {
                timeout = null;
                if (!immediate) func.apply(context, args);
            };
            const callNow = immediate && !timeout;
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
            if (callNow) func.apply(context, args);
        };
    }
    
    // Apply debounce to scroll event handlers for better performance
    window.addEventListener('scroll', debounce(highlightNavLink, 15));
    
    
    // ========== CONSOLE MESSAGE ==========
    console.log('%c👋 Welcome to my portfolio!', 'color: #3b82f6; font-size: 20px; font-weight: bold;');
    console.log('%c✨ Built with Tailwind CSS and modern JavaScript', 'color: #8b5cf6; font-size: 14px;');
    console.log('%c🚀 Interested in the code? Check out my GitHub!', 'color: #10b981; font-size: 14px;');
    
    
    // ========== LAZY LOADING IMAGES ==========
    // If you add more images, this will help with performance
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
    
});

