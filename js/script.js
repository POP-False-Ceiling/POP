/**
 * POP & False Ceiling Experts
 * Main JavaScript File
 * Author: Claude AI
 * Version: 1.1 (Fixed Errors)
 */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate on Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease',
            once: true,
            offset: 100
        });
    }

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('nav ul');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking a nav link
        document.querySelectorAll('nav ul li a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Sticky Header
    const header = document.querySelector('header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('sticky', window.scrollY > 50);
        });
    }

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentSlide = 0;
    let slideInterval;

    function showSlide(n) {
        slides.forEach(slide => slide.classList.remove('active'));
        currentSlide = (n + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
    }

    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    function startSlideShow() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    if (slides.length > 0) {
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', function () {
                clearInterval(slideInterval);
                prevSlide();
                startSlideShow();
            });

            nextBtn.addEventListener('click', function () {
                clearInterval(slideInterval);
                nextSlide();
                startSlideShow();
            });
        }

        startSlideShow();
    }

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentTestimonial = 0;
    let testimonialInterval;

    function showTestimonial(n) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        currentTestimonial = (n + testimonialSlides.length) % testimonialSlides.length;
        testimonialSlides[currentTestimonial].classList.add('active');
        dots[currentTestimonial]?.classList.add('active');
    }

    function nextTestimonial() {
        showTestimonial(currentTestimonial + 1);
    }

    function startTestimonialSlideShow() {
        testimonialInterval = setInterval(nextTestimonial, 5000);
    }

    if (testimonialSlides.length > 0) {
        dots.forEach((dot, index) => {
            dot.addEventListener('click', function () {
                clearInterval(testimonialInterval);
                showTestimonial(index);
                startTestimonialSlideShow();
            });
        });

        startTestimonialSlideShow();
    }

    // Gallery Filter
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    if (filterBtns.length > 0 && galleryItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', function () {
                filterBtns.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');

                const filterValue = this.getAttribute('data-filter');

                galleryItems.forEach(item => {
                    if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => (item.style.opacity = '1'), 100);
                    } else {
                        item.style.opacity = '0';
                        setTimeout(() => (item.style.display = 'none'), 300);
                    }
                });
            });
        });
    }

    // FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');

    if (faqItems.length > 0) {
        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');
            if (question) {
                question.addEventListener('click', function () {
                    faqItems.forEach(otherItem => {
                        if (otherItem !== item) {
                            otherItem.classList.remove('active');
                        }
                    });
                    item.classList.toggle('active');
                });
            }
        });
    }

    // Form Submission
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your message! We will get back to you soon.');
            contactForm.reset();
        });
    }

    const testimonialForm = document.getElementById('testimonial-form');
    const ratingStars = document.querySelectorAll('.rating-select i');
    const ratingInput = document.getElementById('rating');

    if (testimonialForm) {
        testimonialForm.addEventListener('submit', function (e) {
            e.preventDefault();
            alert('Thank you for your review! It will be displayed after admin approval.');
            testimonialForm.reset();

            if (ratingStars.length > 0) {
                ratingStars.forEach(star => {
                    star.classList.remove('fas');
                    star.classList.add('far');
                });
                ratingInput.value = '';
            }
        });
    }

    // Rating Select in Testimonial Form
    if (ratingStars.length > 0 && ratingInput) {
        function highlightStars(rating) {
            ratingStars.forEach(star => {
                const starRating = star.getAttribute('data-rating');
                if (starRating <= rating) {
                    star.classList.remove('far');
                    star.classList.add('fas');
                } else {
                    star.classList.remove('fas');
                    star.classList.add('far');
                }
            });
        }

        ratingStars.forEach(star => {
            star.addEventListener('mouseover', function () {
                highlightStars(this.getAttribute('data-rating'));
            });

            star.addEventListener('mouseout', function () {
                highlightStars(ratingInput.value || 0);
            });

            star.addEventListener('click', function () {
                ratingInput.value = this.getAttribute('data-rating');
                highlightStars(ratingInput.value);
            });
        });
    }
});
