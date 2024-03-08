// Code goes here!

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
    console.log("titleInput", this.titleInput);

    this.descriptionInput = this.formElement.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInput = this.formElement.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.authorize();
    this.mountUi();
  }

  private handleFormSubmission(event: Event) {
    event.preventDefault();

    console.log(this.titleInput.value);
  }

  private authorize() {
    this.formElement.addEventListener(
      "submit",
      this.handleFormSubmission.bind(this)
    );
  }

  private mountUi() {
    this.mainAppDiv.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
