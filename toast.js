
const toastBox = document.querySelector('.toastBox');
const success_btn = document.querySelector('.success-btn');
const error_btn = document.querySelector('.error-btn');
const invalid_btn = document.querySelector('.invalid-btn');

const successMsg = '<i class="bi bi-check2"></i> Data Delete Successfully  ';
const editMsg = '<i class="bi bi-check2"></i> Edit Data Successfully  ';
const errorMsg = '<i class="bi bi-check2"></i> Please fix the error ! ';
const invalidMsg = '<i class="bi bi-check2"></i> Invalid input, check again';

function showToast(message, type) {
    const toast = document.createElement('div');
    toast.classList.add('toast', type);
    toast.innerHTML =
        '<button class="close-btn"><i class="bi bi-x-lg"></i></button>'
        + message;
    toastBox.appendChild(toast);

    const closeButton =
        toast.querySelector('.close-btn');
    closeButton.addEventListener('click', () => {
        toast.remove();
    });

    setTimeout(() => {
        toast.remove();
    }, 3000);
}
