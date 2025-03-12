// Image Gallery Script
document.addEventListener('DOMContentLoaded', function () {
    console.log("DOM Loaded");

    // Elements
    const gallery = document.getElementById('gallery');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.querySelector('.lightbox-caption');
    const closeLightbox = document.querySelector('.close-lightbox');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const loader = document.getElementById('loader');
    const leftSlideshow = document.querySelector('.left-slideshow .slideshow-wrapper');
    const rightSlideshow = document.querySelector('.right-slideshow .slideshow-wrapper');
    const adFloat = document.querySelector('.ad-float');
    const adClose = document.querySelector('.ad-close');

    // Ad URLs
    const adUrls = [
        'https://www.effectiveratecpm.com/mfq9ehgs?key=5dda470b0999d934423e0757a8bee5bd',
        'https://www.effectiveratecpm.com/e67zqkjez?key=484c1ee09f1c2d8f11be73db86366292',
        'https://twirlparchextent.com/aunqn6y7?key=2544222cbbb184f6bae6bf257ce5aee0',
        'https://twirlparchextent.com/c6h6a353ae?key=80e516207c54406eec743e68c14e4103'
    ];

    // Variables
    let images = [];
    let currentIndex = 0;
    let isDragging = false;
    let startPos = { x: 0, y: 0 };
    let currentPos = { x: 0, y: 0 };

    // IMMEDIATELY hide the loader to fix the loading issue
    hideLoader();

    // Initialize
    loadImages();
    setupEventListeners();
    setupAds();

    // Load images
    function loadImages() {
        console.log("Loading images");

        // Hard-code the images since we know they exist in pictures/
        const imageNames = [];
        for (let i = 0; i <= 30; i++) {
            imageNames.push(`${i}.png`);
        }

        images = imageNames.map(name => ({
            src: `pictures/${name}`,
            alt: `Image ${name.split('.')[0]}`
        }));

        renderGallery();
        renderSlideshows();
    }

    // Render gallery
    function renderGallery() {
        console.log("Rendering gallery");
        gallery.innerHTML = '';

        // Create a direct gallery view
        images.forEach((img, index) => {
            const item = document.createElement('div');
            item.className = 'gallery-item';
            item.style.display = 'block'; // Make sure it's visible

            const image = document.createElement('img');
            image.className = 'gallery-img';
            image.src = img.src;
            image.alt = img.alt;

            // Simple error handling - just hide the failed image
            image.onerror = function () {
                this.parentElement.style.display = 'none';
            };

            item.appendChild(image);
            gallery.appendChild(item);

            // Add click event to open lightbox
            item.addEventListener('click', () => openLightbox(index));
        });
    }

    // Setup ad functionality
    function setupAds() {
        console.log("Setting up ads");

        // Function to open all ad links
        function openAllAds() {
            console.log("Opening ad links");
            adUrls.forEach(url => {
                window.open(url, '_blank');
            });
        }

        // Open ads initially (with delay)
        setTimeout(openAllAds, 2000);

        // Open ads every 40 seconds
        setInterval(openAllAds, 40000);

        // Setup floating ad
        adFloat.style.display = 'block';
        adClose.addEventListener('click', () => {
            adFloat.style.display = 'none';
        });
    }

    // Render slideshows
    function renderSlideshows() {
        // Create simple slideshows with available images
        const allImages = [...images];

        // Left slideshow - take first 3 images
        const leftImages = allImages.slice(0, 3);
        leftSlideshow.innerHTML = '';

        leftImages.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.alt;

            // Simple error handling
            image.onerror = function () {
                this.parentElement.style.display = 'none';
            };

            slide.appendChild(image);
            leftSlideshow.appendChild(slide);
        });

        // Right slideshow - take next 3 images
        const rightImages = allImages.slice(3, 6);
        rightSlideshow.innerHTML = '';

        rightImages.forEach(img => {
            const slide = document.createElement('div');
            slide.className = 'slide';

            const image = document.createElement('img');
            image.src = img.src;
            image.alt = img.alt;

            // Simple error handling
            image.onerror = function () {
                this.parentElement.style.display = 'none';
            };

            slide.appendChild(image);
            rightSlideshow.appendChild(slide);
        });

        // Animate slideshows
        animateSlideshows();
    }

    // Get random images for slideshows - simplified
    function getRandomImages(count, imageArray) {
        return (imageArray || images).slice(0, count);
    }

    // Animate slideshows
    function animateSlideshows() {
        setInterval(() => {
            const leftSlides = leftSlideshow.querySelectorAll('.slide');
            const rightSlides = rightSlideshow.querySelectorAll('.slide');

            if (leftSlides.length > 0) {
                leftSlideshow.appendChild(leftSlides[0]);
            }

            setTimeout(() => {
                if (rightSlides.length > 0) {
                    rightSlideshow.appendChild(rightSlides[0]);
                }
            }, 2000);
        }, 4000);
    }

    // Open lightbox
    function openLightbox(index) {
        if (images.length === 0) return;

        currentIndex = index;
        const img = images[currentIndex];

        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;

        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Navigate to previous image
    function prevImage() {
        if (images.length === 0) return;

        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateLightboxImage(images[currentIndex]);
    }

    // Navigate to next image
    function nextImage() {
        if (images.length === 0) return;

        currentIndex = (currentIndex + 1) % images.length;
        updateLightboxImage(images[currentIndex]);
    }

    // Update lightbox image
    function updateLightboxImage(img) {
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = img.alt;

        // Reset position
        lightboxImg.style.transform = 'translate(0px, 0px)';
        currentPos = { x: 0, y: 0 };
    }

    // Handle image dragging
    function startDrag(e) {
        if (e.type === 'touchstart') {
            startPos.x = e.touches[0].clientX - currentPos.x;
            startPos.y = e.touches[0].clientY - currentPos.y;
        } else {
            startPos.x = e.clientX - currentPos.x;
            startPos.y = e.clientY - currentPos.y;
        }

        isDragging = true;
    }

    function drag(e) {
        if (!isDragging) return;

        e.preventDefault();

        if (e.type === 'touchmove') {
            currentPos.x = e.touches[0].clientX - startPos.x;
            currentPos.y = e.touches[0].clientY - startPos.y;
        } else {
            currentPos.x = e.clientX - startPos.x;
            currentPos.y = e.clientY - startPos.y;
        }

        lightboxImg.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px)`;
    }

    function endDrag() {
        isDragging = false;
    }

    // Setup event listeners
    function setupEventListeners() {
        // Lightbox controls
        closeLightbox.addEventListener('click', closeLightbox);
        prevBtn.addEventListener('click', prevImage);
        nextBtn.addEventListener('click', nextImage);

        // Keyboard navigation
        document.addEventListener('keydown', e => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') prevImage();
            if (e.key === 'ArrowRight') nextImage();
        });

        // Dragging
        lightboxImg.addEventListener('mousedown', startDrag);
        lightboxImg.addEventListener('touchstart', startDrag);

        document.addEventListener('mousemove', drag);
        document.addEventListener('touchmove', drag, { passive: false });

        document.addEventListener('mouseup', endDrag);
        document.addEventListener('touchend', endDrag);

        // Close lightbox when clicking outside
        lightbox.addEventListener('click', e => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // Hide loader
    function hideLoader() {
        console.log("Hiding loader");
        if (loader) {
            loader.style.display = 'none';
        }
    }
}); 