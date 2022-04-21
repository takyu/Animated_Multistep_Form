// entry style point
import '../sass/style.scss';

const multiStepForm = document.querySelector(
  '[data-multi-step]'
) as HTMLFormElement;
const formSteps = [
  ...multiStepForm.querySelectorAll('[data-step]')!,
] as HTMLDivElement[];

// let currentStep = formSteps.find((step) => step.classList.contains('active'))?.dataset.step
let currentStep = formSteps.findIndex((step) =>
  step.classList.contains('active')
);

if (currentStep < 0) {
  currentStep = 0;
  showCurrentStep();
}

multiStepForm.addEventListener('click', (e) => {
  let incrementor: number | null = null;

  if ((<HTMLInputElement>e.target).matches('[data-next]')) {
    // currentStep += 1;
    incrementor = 1;
  } else if ((e.target as HTMLInputElement).matches('[data-previous]')) {
    // currentStep -= 1;
    incrementor = -1;
  }

  if (incrementor === null) return;

  const inputs = [
    ...formSteps[currentStep].querySelectorAll('input')!,
  ] as HTMLInputElement[];

  const allValid = inputs.every((input) => input.reportValidity());
  console.log(allValid);

  if (allValid) {
    currentStep += incrementor;
    showCurrentStep();
  }
});

// when is not be class of active, is added class of hide
formSteps.forEach((step) => {
  step.addEventListener('animationend', (e) => {
    formSteps[currentStep].classList.remove('hide');
    (<HTMLInputElement>e.target).classList.toggle(
      'hide',
      !(e.target as HTMLInputElement).classList.contains('active')
    );
  });
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle('active', index === currentStep);
  });
}
