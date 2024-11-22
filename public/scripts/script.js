// Get modal elements
const closeModalButton = document.getElementById("closeModal");

// Open the modal when clicking the button

function openModal() {
  const modal = document.getElementById("modal");
  modal.style.display = "flex";
  modal.style.flexDirection = "column";
  modal.style.gap = "20px";
  console.log('modal button clicked');
  // const openModalButtons = document.querySelectorAll("#openModal");
  // openModalButtons.forEach(btn=>{
  //     btn.onclick = function() {
  //     };
  
  // })
}


// Close the modal when clicking the close button
closeModalButton.onclick = function() {
  modal.style.display = "none";
};

// Close the modal when clicking outside the modal content
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};
