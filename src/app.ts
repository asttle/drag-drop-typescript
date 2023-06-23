console.log("Drag and drop project");
class ProjectInput {
  template: HTMLTemplateElement;
  host: HTMLDivElement;
  element: HTMLFormElement;
  constructor() {
    this.template = document.getElementById(
      "project-input"
    )! as HTMLTemplateElement;
    this.host = document.getElementById("app")! as HTMLDivElement;

    const importedHTMLContent = document.importNode(
      this.template.content,
      true
    );
    this.element = importedHTMLContent.firstElementChild as HTMLFormElement;
    this.attach();
    this.element.id = "user-input";
  }

  private attach() {
    this.host.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
