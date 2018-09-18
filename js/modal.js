/*
 * The html and javascript was found at
 * https://www.w3schools.com/howto/howto_css_modals.asp
 */
const modal =  document.getElementById("congratulations");
const closeModal = document.getElementById("closeModal");

function displayModal() {
    const modalMoves = document.getElementById("modalMoves");
    modalMoves.innerHTML = countMoves;
    
    const modalTime = document.getElementById("modalTime");
    modalTime.innerHTML = timerElement.innerHTML;

    const modalStar = document.getElementById("modalStar");
    modalStar.innerHTML = ratingElement.innerHTML;
    
    modal.style.display = "block";
}

closeModal.addEventListener("click", function() {
    modal.style.display = "none";
    reset();
});

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}
