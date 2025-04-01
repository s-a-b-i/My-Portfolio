(function () {
    [...document.querySelectorAll(".control")].forEach(button => {
        button.addEventListener("click", function() {
            document.querySelector(".active-btn").classList.remove("active-btn");
            this.classList.add("active-btn");
            document.querySelector(".active").classList.remove("active");
            document.getElementById(button.dataset.id).classList.add("active");
        })
    });
    document.querySelector(".theme-btn").addEventListener("click", () => {
        document.body.classList.toggle("light-mode");
    })
})();

// Assuming you already have some JavaScript in app.js for section navigation, theme toggle, etc.
// Add this code to handle the form submission

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('.contact-form');
    const loader = document.getElementById('form-loader');
    const popup = document.getElementById('form-popup');
    const popupMessage = document.getElementById('popup-message');
    const popupContent = popup.querySelector('.popup-content');
    const closePopup = document.getElementById('close-popup');
  
    // Handle form submission
    form.addEventListener('submit', async (e) => {
      e.preventDefault(); // Prevent default form submission
  
      // Show loader
      loader.style.display = 'flex';
  
      // Collect form data
      const formData = new FormData(form);
  
      try {
        // Send form data to Web3Forms
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData,
        });
  
        const result = await response.json();
  
        // Hide loader
        loader.style.display = 'none';
  
        // Show popup based on response
        if (result.success) {
          popupMessage.textContent = 'Message sent successfully!';
          popupContent.classList.remove('error');
          popupContent.classList.add('success');
          form.reset(); // Reset the form on success
        } else {
          popupMessage.textContent = 'Failed to send message. Please try again.';
          popupContent.classList.remove('success');
          popupContent.classList.add('error');
        }
  
        // Show popup
        popup.style.display = 'flex';
      } catch (error) {
        // Hide loader
        loader.style.display = 'none';
  
        // Show error popup
        popupMessage.textContent = 'An error occurred. Please try again later.';
        popupContent.classList.remove('success');
        popupContent.classList.add('error');
        popup.style.display = 'flex';
      }
    });
  
    // Close popup when clicking the close button
    closePopup.addEventListener('click', () => {
      popup.style.display = 'none';
    });
  
    // Close popup when clicking outside the popup content
    popup.addEventListener('click', (e) => {
      if (e.target === popup) {
        popup.style.display = 'none';
      }
    });
  });