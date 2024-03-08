// Code goes here!

interface validatableData {
  value?: string | number;
  required?: boolean;
  minLenght?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface ProjectType {
  id: string;
  title: string;
  description: string;
  people: number;
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

class ProjectState {
  projects: ProjectType[] = [];
  events: any[] = [];

  private static instance: ProjectState;

  private constructor() {}

  static createInstance() {
    let newInstance: ProjectState;
    if (ProjectState.instance) {
      newInstance = ProjectState.instance;
    } else {
      newInstance = new ProjectState();
    }

    return newInstance;
  }

  registerEvent(eventFn: any) {
    this.events.push(eventFn);
  }

  addProject(title: string, description: string, people: number) {
    const project = {
      id: Math.random().toString(),
      title,
      description,
      people,
    };

    this.projects.push(project);

    for (const eventFn of this.events) {
      eventFn(this.projects.slice());
    }
  }
}

class ProjectList {
  projectLisTTemplate: HTMLTemplateElement;
  mainAppDiv: HTMLDivElement;
  projectListElement: HTMLElement;

  assignedProjects: ProjectType[] = [];

  constructor(private type: "active" | "finished") {
    // Accessing and saving DOM element
    this.projectLisTTemplate = document.querySelector(
      "#project-list"
    )! as HTMLTemplateElement;
    this.mainAppDiv = document.querySelector("#app")! as HTMLDivElement;

    // Importing form template and displaying it
    const importedNode = document.importNode(
      this.projectLisTTemplate.content,
      true
    );
    this.projectListElement = importedNode.firstElementChild as HTMLElement;
    this.projectListElement.id = `${this.type}-projects`;

    projectState.registerEvent((projects: ProjectType[]) => {
      this.assignedProjects.push(...projects);
      this.renderProjectList();
    });

    this.renderContent();
    this.mountUi();
  }

  private renderProjectList() {
    const listEl = document.querySelector(
      `#${this.type}-projects-list`
    ) as HTMLUListElement;

    for (const prjElem of this.assignedProjects) {
      const listItem = document.createElement("li");
      listItem.textContent = prjElem.title;
      listEl.appendChild(listItem);
    }
  }

  private renderContent() {
    const listId = `${this.type}-projects-list`;

    this.projectListElement.querySelector("ul")!.id = listId;

    this.projectListElement.querySelector(
      "h2"
    )!.innerText = `PROJECTS - ${this.type}`;
  }

  private mountUi() {
    this.mainAppDiv.insertAdjacentElement("beforeend", this.projectListElement);
  }
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
    const userInputData = this.gatherUserInformation();

    if (Array.isArray(userInputData)) {
      const [title, description, people] = userInputData;

      projectState.addProject(title, description, people);

      this.clearState();
    }
  }

  private clearState() {
    this.titleInput.value = "";
    this.descriptionInput.value = "";
    this.peopleInput.value = "";
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

const projectState = ProjectState.createInstance();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
