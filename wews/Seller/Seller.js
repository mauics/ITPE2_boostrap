const user = JSON.parse(localStorage.getItem('user'));

   if (user) {
       const userButton = document.getElementById('userDropdown');
       userButton.innerHTML = `<i class="fas fa-user"></i> ${user.name}`;
   }
   

    // Event listener for logging out
    var logoutButton = document.getElementById('logoutButton');
    logoutButton.addEventListener('click', function () {
        // In a real-world scenario, you'd implement the logout logic here
        if (user) {
            alert(`Goodbye, ${user.name}!`);
        }
        // Clear user data from local storage
        localStorage.removeItem('userFullName');
        // Redirect to the welcome page (replace 'welcome.html' with the actual page URL)
        window.location.href = '../Welcome/Welcome.html';
    });
