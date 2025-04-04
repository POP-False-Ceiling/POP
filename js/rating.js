document.addEventListener('DOMContentLoaded', function() {
    const ratingStars = document.querySelectorAll('.rating-select i');
    const ratingInput = document.getElementById('rating');

    ratingStars.forEach(star => {
        star.addEventListener('mouseover', function() {
            const rating = this.dataset.rating;
            highlightStars(rating);
        });

        star.addEventListener('mouseout', function() {
            const currentRating = ratingInput.value;
            highlightStars(currentRating);
        });

        star.addEventListener('click', function() {
            const rating = this.dataset.rating;
            ratingInput.value = rating;
            highlightStars(rating);

            // Add animation effect
            star.style.transform = 'scale(1.3)';
            setTimeout(() => {
                star.style.transform = 'scale(1.2)';
            }, 200);
        });
    });

    function highlightStars(rating) {
        ratingStars.forEach(star => {
            const starRating = star.dataset.rating;
            if (starRating <= rating) {
                star.classList.remove('far');
                star.classList.add('fas');
            } else {
                star.classList.remove('fas');
                star.classList.add('far');
            }
        });
    }
});