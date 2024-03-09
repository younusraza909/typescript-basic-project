import { AutoBind } from "../decorators/autobind.js";
import { Component } from "./baseComponent.js";
import { Project, ProjectStatus } from "./project.js";
import { ProjectItem } from "./projectItem.js";
import { projectState } from "../state/projectState.js";
import { draggableArea } from "../models/drag-drop.js";

export class ProjectList extends Component<HTMLElement, HTMLDivElement> implements draggableArea {

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