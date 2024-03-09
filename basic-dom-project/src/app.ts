// Code goes here!

interface validatableData {
  value?: string | number;
  required?: boolean;
  minLenght?: number;
  maxLength?: number;
  min?: number;
  max?: number;
}

interface draggableItem {
  onDragStartHandler(event: DragEvent): void
  onDragEndHandler(event: DragEvent): void
}

interface draggableArea {
  onDragOverHandler(event: DragEvent): void
  onDragDrop(event: DragEvent): void
  onDragLeave(event: DragEvent): void
}


enum ProjectStatus {
  Active,
  Finished,
}

class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) { }
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

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  templateElement: HTMLTemplateElement;
  hostElement: U;
  element: T;

  constructor(templateId: string, mainDivId: string, insertAtBeginning: boolean, newElementId?: string) {

    this.templateElement = document.querySelector(
      `#${templateId}`
    )! as HTMLTemplateElement;

    this.hostElement = document.querySelector(`#${mainDivId}`)! as U;

    const importedNode = document.importNode(
      this.templateElement.content,
      true
    );

    this.element = importedNode.firstElementChild as T;
    if (newElementId) {
      this.element.id = `${newElementId}`
    };

    this.mountUi(insertAtBeginning)
  }

  private mountUi(insertAtBeginning: boolean) {
    this.hostElement.insertAdjacentElement(insertAtBeginning ? "afterbegin" : "beforeend", this.element);
  }

  abstract configure(): void

  abstract renderContent(): void
}

type ListnerType<T> = (items: T[]) => void

class State<T> {
  protected listeners: ListnerType<T>[] = []

  constructor() { }


  registerEvent(eventFn: ListnerType<T>) {
    this.listeners.push(eventFn);
  }
}

class ProjectState extends State<Project> {
  projects: Project[] = [];

  private static instance: ProjectState;

  private constructor() {
    super()
  }

  static createInstance() {
    let newInstance: ProjectState;
    if (ProjectState.instance) {
      newInstance = ProjectState.instance;
    } else {
      newInstance = new ProjectState();
    }

    return newInstance;
  }


  addProject(title: string, description: string, people: number) {
    const project = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(project);

    this.updateListeners()
  }

  moveProject(projectId: string, newStatus: ProjectStatus) {
    const project = this.projects.find(prj => prj.id === projectId);
    if (project && project.status !== newStatus) {
      project.status = newStatus;
      this.updateListeners();
    }
  }

  private updateListeners() {
    for (const listenerFn of this.listeners) {
      listenerFn(this.projects.slice());
    }
  }
}

class ProjectItem extends Component<HTMLLIElement, HTMLUListElement> implements draggableItem {
  public project: Project

  constructor(templateId: string, hostElement: string, project: Project) {
    super(templateId, hostElement, true)
    this.project = project

    this.configure()
    this.renderContent()
  }

  @AutoBind
  onDragStartHandler(event: DragEvent): void {

    event.dataTransfer!.setData('text/plain', this.project.id)
    event.dataTransfer!.effectAllowed = 'move'

  }

  @AutoBind
  onDragEndHandler(_: DragEvent): void {
  }

  get persons() {
    return this.project.people === 1 ?
      '1 person' :
      `${this.project.people} persons`
  }


  configure(): void {
    this.element.addEventListener("dragstart", this.onDragStartHandler)
    this.element.addEventListener("dragend", this.onDragEndHandler)
  }


  renderContent(): void {
    this.element.querySelector('h2')!.innerText = this.project.title
    this.element.querySelector('h3')!.innerText = this.persons + ' assigned'
    this.element.querySelector('p')!.innerText = this.project.description

    this.hostElement.appendChild(this.element)
  }
}

class ProjectList extends Component<HTMLElement, HTMLDivElement> implements draggableArea {

  assignedProjects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("project-list", "app", false, `${type}-projects`)



    this.renderContent();
    this.configure()

  }

  configure() {
    projectState.registerEvent((projects: Project[]) => {
      let relevantProjects: Project[];
      if (this.type === "active") {
        relevantProjects = projects.filter(
          (pr) => pr.status === ProjectStatus.Active
        );
      } else {
        relevantProjects = projects.filter(
          (pr) => pr.status === ProjectStatus.Finished
        );
      }

      this.assignedProjects = relevantProjects;
      this.renderProjectList();
    });

    this.element.addEventListener('dragover', this.onDragOverHandler)
    this.element.addEventListener("drop", this.onDragDrop)
    this.element.addEventListener('dragleave', this.onDragLeave)
  }

  private renderProjectList() {
    const listEl = document.querySelector(
      `#${this.type}-projects-list`
    ) as HTMLUListElement;

    listEl.innerHTML = "";
    for (const prjElem of this.assignedProjects) {
      new ProjectItem('single-project', `${this.type}-projects-list`, prjElem)
    }
  }

  renderContent() {
    const listId = `${this.type}-projects-list`;

    this.element.querySelector("ul")!.id = listId;

    this.element.querySelector(
      "h2"
    )!.innerText = `PROJECTS - ${this.type}`;
  }


  @AutoBind
  onDragOverHandler(event: DragEvent): void {
    if (event.dataTransfer?.types[0] === 'text/plain') {
      event.preventDefault()
      this.element.querySelector("ul")?.classList.add('droppable')
    }
  }

  @AutoBind
  onDragDrop(event: DragEvent): void {
    const prjId = event.dataTransfer!.getData('text/plain');
    projectState.moveProject(
      prjId,
      this.type === 'active' ? ProjectStatus.Active : ProjectStatus.Finished
    );
    this.element.querySelector("ul")?.classList.remove('droppable')
  }

  @AutoBind
  onDragLeave(_: DragEvent): void {
    this.element.querySelector("ul")?.classList.remove('droppable')
  }
}

class ProjectInput extends Component<HTMLFormElement, HTMLDivElement> {


  titleInput: HTMLInputElement;
  descriptionInput: HTMLInputElement;
  peopleInput: HTMLInputElement;

  constructor() {
    super('project-input', 'app', true, 'user-input')

    // accessing Input field
    this.titleInput = this.element.querySelector(
      "#title"
    )! as HTMLInputElement;

    this.descriptionInput = this.element.querySelector(
      "#description"
    )! as HTMLInputElement;
    this.peopleInput = this.element.querySelector(
      "#people"
    )! as HTMLInputElement;

    this.configure();
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

  configure() {
    this.element.addEventListener("submit", this.handleFormSubmission);
  }

  renderContent(): void {

  }
}

const project = new ProjectInput();

const projectState = ProjectState.createInstance();
const activeProjectsList = new ProjectList("active");
const finishedProjectsList = new ProjectList("finished");
