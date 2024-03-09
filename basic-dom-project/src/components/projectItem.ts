import { AutoBind } from "../decorators/autobind.js"
import { Component } from "./baseComponent.js"
import { Project } from "./project.js"
import { draggableItem } from "../models/drag-drop.js"


export class ProjectItem extends Component<HTMLLIElement, HTMLUListElement> implements draggableItem {
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
