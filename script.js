let validator = {
  handleSubmit: (event) => {
    event.preventDefault();

    let send = true;

    let inputs = form.querySelectorAll('input');

    validator.clearErrors();

    inputs.forEach((input) => {
      let check = validator.checkInput(input);

      if (check !== true) {
        send = false;
        validator.showError(input, check);
      }
    });

    if (send) {
      form.submit();
    }
  },
  checkInput: (input) => {
    let rules = input.getAttribute('data-rules');
    if (rules !== null) {
      rules = rules.split('|');

      for (let k in rules) {
        let rDetails = rules[k].split('=');

        switch (rDetails[0]) {
          case 'required':
            if (input.value === '') {
              return 'Este campo não pode estar vazio.';
            }
            break;
          case 'min':
            if (input.value.length < rDetails[1]) {
              return `Este campo tem que ter pelo menos ${rDetails[1]} caracteres`;
            }
            break;
          case 'email':
            if (input.value != '') {
              let regex =
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
              if (!regex.test(input.value.toLowerCase())) {
                return 'E-mail digitado não é válido!';
              }
            }
            break;
        }
      }
    }

    return true;
  },

  showError: (input, error) => {
    input.style.borderColor = '#FF0000';

    let errorElement = document.createElement('div');
    errorElement.classList.add('error');
    errorElement.innerHTML = error;

    input.parentElement.insertBefore(errorElement, input.ElementSibling);
  },

  clearErrors: () => {
    let inputs = form.querySelectorAll('input');
    inputs.forEach((input) => {
      input.style.borderColor = '';
    });
    let errorElements = document.querySelectorAll('.error');
    errorElements.forEach((errorElement) => {
      errorElement.remove();
    });
  },
};
const form = document.querySelector('.validator');

form.addEventListener('submit', validator.handleSubmit);
