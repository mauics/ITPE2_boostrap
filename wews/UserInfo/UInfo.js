const storedUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {};
        const editModal = document.getElementById('edit-modal');
        const deleteModal = document.getElementById('delete-modal');
        const pictureInput = document.getElementById('edit-picture');
        const fullNameInput = document.getElementById('edit-fullName');
        const emailInput = document.getElementById('edit-email');
        const currentAddressInput = document.getElementById('edit-currentAddress');
        const genderInput = document.getElementById('edit-gender');
        const dobInput = document.getElementById('edit-dob');
        const currentPasswordInput = document.getElementById('edit-currentPassword');
        const newPasswordInput = document.getElementById('edit-newPassword');
        const confirmNewPasswordInput = document.getElementById('edit-confirmNewPassword');
        const deletePasswordInput = document.getElementById('delete-password');

        document.getElementById('user-picture').src = storedUserInfo.picture || 'default.jpg';
        document.getElementById('fullName').innerText = storedUserInfo.fullName || 'John Doe';
        document.getElementById('email').innerText = storedUserInfo.email || 'john.doe@example.com';
        document.getElementById('currentAddress').innerText = storedUserInfo.currentAddress || '123 Main St, Cityville';
        document.getElementById('gender').innerText = storedUserInfo.gender || 'Male';
        document.getElementById('dob').innerText = storedUserInfo.dob || 'January 1, 1990';

        function openEditModal() {
            pictureInput.value = ''; // Clear the file input
            fullNameInput.value = storedUserInfo.fullName || '';
            emailInput.value = storedUserInfo.email || '';
            currentAddressInput.value = storedUserInfo.currentAddress || '';
            genderInput.value = storedUserInfo.gender || '';
            dobInput.value = storedUserInfo.dob || '';
            currentPasswordInput.value = ''; // Clear the current password input
            newPasswordInput.value = ''; // Clear the new password input
            confirmNewPasswordInput.value = ''; // Clear the confirm new password input

            editModal.style.display = 'flex';
        }

        function closeEditModal() {
            editModal.style.display = 'none';
        }

        function openDeleteModal() {
            deletePasswordInput.value = ''; // Clear the delete password input
            deleteModal.style.display = 'flex';
        }

        function closeDeleteModal() {
            deleteModal.style.display = 'none';
        }

        function confirmDelete() {
            // Check if the delete password matches the stored password
            if (deletePasswordInput.value !== storedUserInfo.password) {
                alert('Incorrect password. Account not deleted.');
                closeDeleteModal();
                return;
            }

            // Delete the user account from local storage
            localStorage.removeItem('userInfo');

            // Close the delete modal
            closeDeleteModal();

            // Redirect to a thank you or login page
            alert('Account deleted. Redirecting to thank you page or login page.');
            // You may want to redirect to another page or perform additional actions here.
        }

        function saveUserInformation() {
            // Check if the current password matches the stored password
            if (currentPasswordInput.value !== storedUserInfo.password) {
                alert('Incorrect current password. Changes not saved.');
                return;
            }

            // Check if the new password and confirm new password match
            if (newPasswordInput.value !== confirmNewPasswordInput.value) {
                alert('New password and confirm new password do not match. Changes not saved.');
                return;
            }

            const newUserInfo = {
                picture: getImageDataUrl(pictureInput.files[0]) || storedUserInfo.picture || 'default.jpg',
                fullName: fullNameInput.value,
                email: emailInput.value,
                currentAddress: currentAddressInput.value,
                gender: genderInput.value,
                dob: dobInput.value,
                password: newPasswordInput.value || storedUserInfo.password
            };

            localStorage.setItem('userInfo', JSON.stringify(newUserInfo));

            // Update the displayed information
            document.getElementById('user-picture').src = newUserInfo.picture;
            document.getElementById('fullName').innerText = newUserInfo.fullName;
            document.getElementById('email').innerText = newUserInfo.email;
            document.getElementById('currentAddress').innerText = newUserInfo.currentAddress;
            document.getElementById('gender').innerText = newUserInfo.gender;
            document.getElementById('dob').innerText = newUserInfo.dob;

            // Close the edit modal
            closeEditModal();
        }

        function getImageDataUrl(file) {
            if (!file) return null;
            const reader = new FileReader();
            return new Promise((resolve) => {
                reader.onloadend = () => {
                    resolve(reader.result);
                };
                reader.readAsDataURL(file);
            });
        }