// Code goes here!

class ProjectInput {
  formTemplate: HTMLTemplateElement;
  mainAppDiv: HTMLDivElement;
  formElement: HTMLFormElement;

  constructor() {
    this.formTemplate = document.querySelector(
      "#project-input"
    )! as HTMLTemplateElement;

    this.mainAppDiv = document.querySelector("#app")! as HTMLDivElement;

    const importedNode = document.importNode(this.formTemplate.content, true);
    this.formElement = importedNode.firstElementChild as HTMLFormElement;
    this.formElement.id = "user-input";

    this.mountUi();
  }

  private mountUi() {
    this.mainAppDiv.insertAdjacentElement("afterbegin", this.formElement);
  }
}

const project = new ProjectInput();
