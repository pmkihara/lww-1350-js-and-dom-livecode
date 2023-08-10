// TODO: Validar este formulário
// 1. Selecionar os elementos (allInputs, emailInput, tosCheckbox, submitButton)
const allInputs = document.querySelectorAll('.form-control');
const emailInput = document.querySelector('#email');
const tosCheckbox = document.getElementById('tos');
const submitButton = document.querySelector('.btn');

const enableButton = () => {
  // Criar uma array a partir de um NodeList
  const inputsArray = Array.from(allInputs)
  // Verificar se todos os inputs são válidos (se todos tiverem a classe is-valid)
  const allInputsAreValid = inputsArray.every((input) => { return input.classList.contains('is-valid') })
  // Verificar se o checkbox está checado
  const checkboxIsChecked = tosCheckbox.checked
  // Verificar se o formulário é válido (todos os inputs válidos + checkbox checado)
  if (allInputsAreValid && checkboxIsChecked) {
    // Se todos estiverem ok:
    // Habilitar o botão
    // Alterar o texto do botão para 'Submit'
    submitButton.disabled = false;
    submitButton.innerText = 'Submit'
  } else {
    // Se todos não estiverem ok:
    // Desabilitar o botão
    // Alterar o texto do botão para 'Please fill all the fields'
    submitButton.disabled = true;
    submitButton.innerText = 'Please fill all the fields'
  }
}

const validateInput = (input) => {
  // Se o input for válido:
  // Adicionar a classe "is-valid"
  // Remover a classe "is-invalid"
  input.classList.add('is-valid');
  input.classList.remove('is-invalid');
}

const invalidateInput = (input) => {
  // Se o input não for válido
  // Adicionar a classe "is-invalid"
  // Remover a classe "is-valid"
  input.classList.remove('is-valid');
  input.classList.add('is-invalid');
}

// Função que recebe um input e retorna um boolean
const inputIsValid = (input) => {
  // Se for o emailInput, é válido quando bater com uma regex de email
  if (input === emailInput) {
    return /\w+@\w+\.\w+/.test(input.value);
  }
  // Se for outro input, é válido se não estiver vazio
  return input.value !== '';
}

// 2. Escutar o evento "change" do tosCheckbox e chamar a função enableButton
tosCheckbox.addEventListener('change', enableButton)

// 3. Escutar o evento "blur" de cada input:
allInputs.forEach((input) => {
  input.addEventListener('blur', () => {
    // 3.1. Verificar se o input é válido e aplicar as respectivas classes
    inputIsValid(input) ? validateInput(input) : invalidateInput(input);
    // 3.2. Chamar a função enableButton
    enableButton();
  })
})
