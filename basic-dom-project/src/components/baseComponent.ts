export abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
