// Loading screen fade out
function initLoadingScreen() {
    const loadingScreen = document.getElementById('loadingScreen');
    if (!loadingScreen) return;

    setTimeout(() => {
        // Step 1: text & bar fly up and fade
        loadingScreen.classList.add('exit-text');

        // Step 2: after text is gone, sweep the whole panel up
        setTimeout(() => {
            loadingScreen.classList.add('exit-sweep');

            // Step 3: remove from DOM after sweep finishes
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 700);
        }, 400);
    }, 2000);
}

// Initialize loading screen
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLoadingScreen);
} else {
    initLoadingScreen();
}

// ASCII Art Scramble Animation
function initAsciiArtAnimation() {
    const asciiArtPre = document.querySelector('.hero-ascii-art pre');
    if (!asciiArtPre) return;

    const originalText = asciiArtPre.textContent;
    const lines = originalText.split('\n');
    
    // Create spans for each character
    asciiArtPre.innerHTML = '';
    const chars = [];
    
    lines.forEach((line, lineIdx) => {
        const lineDiv = document.createElement('div');
        line.split('').forEach((char, charIdx) => {
            const span = document.createElement('span');
            span.className = 'ascii-char';
            span.dataset.originalChar = char || ' ';
            span.textContent = char || ' ';
            span.dataset.index = chars.length;
            lineDiv.appendChild(span);
            chars.push({ span, char: char || ' ', index: chars.length });
        });
        asciiArtPre.appendChild(lineDiv);
    });
    
    // Scramble and settle animation
    const asciiChars = '!@#$%^&*()[]{}+-=/<>~`|\\;:?,."\'';
    let isAnimating = true;
    
    // Animate each character with randomized delay
    function animateCharacters() {
        if (!isAnimating) return;
        
        chars.forEach((charObj) => {
            const delay = Math.random() * 800;
            
            setTimeout(() => {
                if (!isAnimating) return;
                
                // Start scrambling
                let scrambleCount = 0;
                const maxScrambles = Math.floor(Math.random() * 15) + 20;
                const scrambleInterval = setInterval(() => {
                    charObj.span.textContent = asciiChars[Math.floor(Math.random() * asciiChars.length)];
                    scrambleCount++;
                    
                    if (scrambleCount >= maxScrambles) {
                        clearInterval(scrambleInterval);
                        // Settle to correct character
                        charObj.span.textContent = charObj.char;
                        charObj.span.classList.add('settling');
                    }
                }, 50);
            }, delay);
        });
        
        // All characters should be settled after ~3 seconds
        setTimeout(() => {
            isAnimating = false;
        }, 3000);
    }
    
    // Start animation when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', animateCharacters);
    } else {
        animateCharacters();
    }
}

// Initialize ASCII art animation
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAsciiArtAnimation);
} else {
    initAsciiArtAnimation();
}


// Lightbox Image Gallery
const lightboxModal = document.getElementById('lightboxModal');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');
const lightboxCounter = document.getElementById('lightboxCounter');

let allImages = [];
let currentImageIndex = 0;

function initLightbox() {
    // Collect all clickable images
    allImages = Array.from(document.querySelectorAll('.feature-image, .full-width-image'));
    
    // Add click listeners to all images
    allImages.forEach((img, index) => {
        img.addEventListener('click', (e) => {
            e.stopPropagation();
            currentImageIndex = index;
            openLightbox();
        });
    });
}

function openLightbox() {
    lightboxModal.classList.add('active');
    displayImage();
}

function closeLightbox() {
    lightboxModal.classList.remove('active');
}

function displayImage() {
    if (allImages.length > 0) {
        const img = allImages[currentImageIndex];
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        
        // Update counter
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${allImages.length}`;
        
        // Update button states
        lightboxPrev.disabled = currentImageIndex === 0;
        lightboxNext.disabled = currentImageIndex === allImages.length - 1;
    }
}

function prevImage() {
    if (currentImageIndex > 0) {
        currentImageIndex--;
        displayImage();
    }
}

function nextImage() {
    if (currentImageIndex < allImages.length - 1) {
        currentImageIndex++;
        displayImage();
    }
}

// Event listeners
lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);

// Close on background click
lightboxModal.addEventListener('click', (e) => {
    if (e.target === lightboxModal) {
        closeLightbox();
    }
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (!lightboxModal.classList.contains('active')) return;
    
    if (e.key === 'ArrowLeft') {
        prevImage();
    } else if (e.key === 'ArrowRight') {
        nextImage();
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Initialize lightbox when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLightbox);
} else {
    initLightbox();
}

// Menu Modal
const menuTrigger = document.getElementById('menuTrigger');
const menuOverlay = document.getElementById('menuOverlay');
const menuClose = document.getElementById('menuClose');
const menuItems = document.querySelectorAll('.menu-item');

menuTrigger.addEventListener('click', () => {
    if (menuOverlay.classList.contains('active')) {
        menuOverlay.classList.remove('active');
        menuTrigger.textContent = '[ menu ]';
    } else {
        menuOverlay.classList.add('active');
        menuTrigger.textContent = '[ close ]';
    }
});

menuClose.addEventListener('click', () => {
    menuOverlay.classList.remove('active');
    menuTrigger.textContent = '[ menu ]';
});

menuItems.forEach(item => {
    item.addEventListener('click', () => {
        menuOverlay.classList.remove('active');
        menuTrigger.textContent = '[ menu ]';
    });
});

// Close menu on escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        menuOverlay.classList.remove('active');
        menuTrigger.textContent = '[ menu ]';
    }
});

// Hero Overlay - Custom Cursor & Click to Navigate
const heroSection = document.getElementById('home');
const heroOverlay = document.querySelector('.hero-overlay');
let mouseX = 0;
let mouseY = 0;

// Track mouse movement over entire hero section
heroSection.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    heroOverlay.style.setProperty('--mouse-x', mouseX + 'px');
    heroOverlay.style.setProperty('--mouse-y', mouseY + 'px');
});

heroSection.addEventListener('mouseleave', () => {
    heroOverlay.style.setProperty('--mouse-x', '-9999px');
    heroOverlay.style.setProperty('--mouse-y', '-9999px');
});

// Click handler for hero section
heroSection.addEventListener('click', (e) => {
    // Don't navigate if clicking on a button
    if (e.target.closest('.btn') || e.target.closest('.hero-cta')) {
        return;
    }
    const workSection = document.getElementById('work');
    if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
    }
});

// Dark Mode Toggle
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;

// Check for saved theme preference or default to light mode
if (themeToggle) {
    const currentTheme = localStorage.getItem('theme') || 'light';
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
    }

    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        localStorage.setItem('theme', theme);
    });
}
// Swipe Navigation
let touchStartX = 0;
let touchEndX = 0;

const sections = ['home', 'work', 'about', 'resume', 'contact'];
let currentSectionIndex = 0;

document.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
}, false);

document.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
}, false);

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swiped left - go to next section
            currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        } else {
            // Swiped right - go to previous section
            currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        }
        
        const targetSection = sections[currentSectionIndex];
        const element = document.getElementById(targetSection);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
}

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            // Close menu if open
            menuOverlay.classList.remove('active');
            // Scroll to target
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar hide/show on scroll
// let lastScrollTop = 0;
// const navbar = document.querySelector('.navbar');

// window.addEventListener('scroll', () => {
//     let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
//     if (scrollTop > lastScrollTop) {
//         // Scrolling down
//         navbar.style.transform = 'translateY(-100%)';
//     } else {
//         // Scrolling up
//         navbar.style.transform = 'translateY(0)';
//     }
    
//     lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
// }, false);

// navbar.style.transition = 'transform 0.3s ease-out';

// Intersection Observer for scroll animations
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

// Observe work cards for staggered animations
document.querySelectorAll('.work-card').forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease-out ${index * 0.1}s, transform 0.6s ease-out ${index * 0.1}s`;
    observer.observe(card);
});

// Active navigation link highlighting
const navLinks = document.querySelectorAll('.nav-menu a');
const sections_elements = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections_elements.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.borderBottomWidth = '2px';
        } else {
            link.style.borderBottomWidth = '0px';
        }
    });
});

// Glitch Text Effect
const glitchChars = "!<>-_\\/[]{}—=+*^?#@$%&=/|";

function glitchText(element) {
    // Store original text once, never overwrite it
    if (!element._originalText) {
        element._originalText = element.innerText;
    }
    const original = element._originalText;

    // Clear any existing interval
    if (element._glitchInterval) {
        clearInterval(element._glitchInterval);
        element.innerText = original;
    }

    let iteration = 0;

    element._glitchInterval = setInterval(() => {
        element.innerText = original
            .split("")
            .map((letter, index) => {
                if (index < iteration) {
                    return original[index];
                }
                return glitchChars[Math.floor(Math.random() * glitchChars.length)];
            })
            .join("");

        iteration += 0.5;

        if (iteration >= original.length) {
            clearInterval(element._glitchInterval);
            element._glitchInterval = null;
            element.innerText = original;
        }
    }, 30);
}

// Apply glitch effect to all glitch elements
const glitchElements = document.querySelectorAll('.glitch');

glitchElements.forEach(element => {
    element.addEventListener('mouseenter', () => {
        glitchText(element);
    });
});

// Keyboard Navigation (Arrow keys)
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        currentSectionIndex = (currentSectionIndex - 1 + sections.length) % sections.length;
        const targetSection = sections[currentSectionIndex];
        const element = document.getElementById(targetSection);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    } else if (e.key === 'ArrowRight') {
        currentSectionIndex = (currentSectionIndex + 1) % sections.length;
        const targetSection = sections[currentSectionIndex];
        const element = document.getElementById(targetSection);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    }
});
