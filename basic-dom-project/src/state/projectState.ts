import { Project, ProjectStatus } from "../components/project";


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


export const projectState = ProjectState.createInstance();