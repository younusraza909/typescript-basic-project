// Code goes here!

interface validatableData {
  value?: string | number;
  required?: boolean;
  minLenght?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

function validate(data: validatableData): boolean {
  let isValid = true;

  if (data.required) {
    isValid = isValid && data.value?.toString().trim().length !== 0;
  }

  if (!data.required && data.value?.toString().trim().length === 0) {
    return isValid;
  }

  if (data.minLenght && typeof data.value === "string") {
    isValid = isValid && data.value.length >= data.minLenght;
  }

  if (data.min && typeof data.value === "number") {
    isValid = isValid && data.value >= data.min;
  }

  if (data.max && typeof data.value === "number") {
    isValid = isValid && data.value <= data.max;
  }

  if (data.maxLength && typeof data.value === "string") {
    isValid = isValid && data.value.length >= data.maxLength;
  }

  return isValid;
}

function AutoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  const adjMethod: PropertyDescriptor = {
    configurable: true,
    enumerable: true,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    },
  };

  return adjMethod;
}

class ProjectInput {
  formTemplate: HTMLTemplateElement;
  mainAppDiv: HTMLDivElement;
  formElement: HTMLFormElement;

  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    // Accessing and saving DOM element
    this.formTemplate = document.querySelector(
      "#project-input"
    )! as HTMLTemplateElement;
    this.mainAppDiv = document.querySelector("#app")! as HTMLDivElement;

    // Importing form template and displaying it
    const importedNode = document.importNode(this.formTemplate.content, true);
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    // accessing Input field

    this.titleInput = this.formElement.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInput = this.formElement.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.authorize();
    this.mountUi();
  }

  // we are using decorator which auto bind this keyword here
  @AutoBind
  private handleFormSubmission(event: Event) {
    event.preventDefault();
    this.gatherUserInformation();
  }

  private gatherUserInformation(): [string, string, number] | void {
    const titleInputValue = this.titleInput.value;
    const descriptionInputValue = this.descriptionInput.value;
    const peopleInputValue = this.peopleInput.value;

    if (
      !validate({ value: titleInputValue, required: false, minLenght: 3 }) ||
      !validate({
        value: descriptionInputValue,
        required: true,
        minLenght: 3,
      }) ||
      !validate({ value: peopleInputValue, required: true, min: 0 })
    ) {
      alert("Invalid Input Data, kindly recheck it");
    } else {
      return [titleInputValue, descriptionInputValue, +peopleInputValue];
    }
  }

  private authorize() {
    this.formElement.addEventListener("submit", this.handleFormSubmission);
  }

  private mountUi() {
    this.mainAppDiv.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
