// Code goes here!

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

  @AutoBind
  private handleFormSubmission(event: Event) {
    event.preventDefault();
  }

  private authorize() {
    this.formElement.addEventListener("submit", this.handleFormSubmission);
  }

  private mountUi() {
    this.mainAppDiv.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
