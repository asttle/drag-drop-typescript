namespace App {
  type listener = (projects: Project[]) => void;
  // Class to manage state of the projects
  export class ProjectState {
    private listeners: listener[] = [];
    private projects: Project[] = [];
    private static instance: ProjectState;
    private constructor() {}

    static getInstance() {
      if (this.instance) {
        return this.instance;
      }
      this.instance = new ProjectState();
      return this.instance;
    }

    addListener(listener: listener) {
      this.listeners.push(listener);
    }

    addProject(title: string, description: string, numOfPeople: number) {
      const newProject = new Project(
        Math.random().toString(),
        title,
        description,
        numOfPeople,
        ProjectStatus.Active
      );
      this.projects.push(newProject);
      this.updateListeners();
    }

    moveProject(projectId: string, newStatus: ProjectStatus) {
      const project = this.projects.find((prj) => prj.id === projectId);
      if (project && project.projectStatus != newStatus) {
        project.projectStatus = newStatus;
      }
      this.updateListeners();
    }

    private updateListeners() {
      for (const listenerFn of this.listeners) {
        listenerFn(this.projects.slice());
      }
    }
  }
  // instantiate new project state
  export const projectState = ProjectState.getInstance();
}
