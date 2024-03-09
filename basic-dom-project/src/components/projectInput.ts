import { AutoBind } from "../decorators/autobind.js";
import { projectState } from "../state/projectState.js";
import { validate } from "../utils/validation.js";
import { Component } from "./baseComponent.js";

export class ProjectInput extends Component<HTMLFormElement, HTMLDivElement> {


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
