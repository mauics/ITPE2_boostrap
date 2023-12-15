document.addEventListener('DOMContentLoaded', function () {
    // Function to update user details in the HTML
    function updateUserInfo() {
        const fullNameElement = document.getElementById('fullName');
        const emailElement = document.getElementById('email');
        const currentAddressElement = document.getElementById('currentAddress');
        const genderElement = document.getElementById('gender');
        const dobElement = document.getElementById('dob');

        // Retrieve user information from local storage
        const loggedInUserEmail = localStorage.getItem('userEmail');
        const users = JSON.parse(localStorage.getItem('users')) || [];

        const loggedInUser = users.find(user => user.email === loggedInUserEmail);

        if (loggedInUser) {
            fullNameElement.textContent = loggedInUser.fullName;
            emailElement.textContent = loggedInUser.email;
            currentAddressElement.textContent = loggedInUser.address;
            genderElement.textContent = loggedInUser.gender;
            dobElement.textContent = loggedInUser.birthday;
        }
    }

    updateUserInfo();

    // Function to edit user information
    function editUserInformation() {
        // Retrieve updated information from the form
        const newFullName = document.getElementById('edit-fullName').value;
        const newEmail = document.getElementById('edit-email').value;
        const newCurrentAddress = document.getElementById('edit-currentAddress').value;
    
        // Retrieve user information from local storage
        const loggedInUserEmail = localStorage.getItem('userEmail');
        let users = JSON.parse(localStorage.getItem('users')) || [];
    
        // Find the user in the array
        const userIndex = users.findIndex(user => user.email === loggedInUserEmail);
    
        if (userIndex !== -1) {
            // Update user information in the array
            users[userIndex].fullName = newFullName;
            users[userIndex].email = newEmail;
            users[userIndex].address = newCurrentAddress;
    
            // Save the updated array back to local storage
            localStorage.setItem('users', JSON.stringify(users));
    
            // Update the user details in the HTML
            updateUserInfo();
    
            // Close the edit modal
            $('#edit-modal').modal('hide');
        } else {
            console.error('User not found.');
        }
    }

    // Function to delete user information
    function deleteUserInformation() {
        // Display a confirmation modal
        $('#delete-confirm-modal').modal('show');
    }

    // Function to confirm and delete user information
    function confirmDeleteUser() {
        // Clear all data in local storage
        localStorage.clear();

        // Redirect to the welcome page (replace 'welcome.html' with the actual page URL)
        window.location.href = '../Welcome/Welcome.html';
    }

    // Call the updateUserInfo function on page load
    updateUserInfo();

    // Event listener for the delete button
    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', function () {
        // Call the delete user information function
        deleteUserInformation();
    });

    // Event listener for the confirm delete button
    const confirmDeleteButton = document.getElementById('confirm-delete-button');
    confirmDeleteButton.addEventListener('click', function () {
        // Call the confirm delete user function
        confirmDeleteUser();
    });

    // Event listener for the edit button
    const editButton = document.getElementById('edit-button');
    editButton.addEventListener('click', function () {
    console.log('Edit button clicked');
    // Call the edit user information function
    editUserInformation();
});
});