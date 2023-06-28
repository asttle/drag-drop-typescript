namespace App {
  export type gatherUserInputReturnType = [string, string, number] | void;

  export class ProjectInput extends Component<HTMLDivElement, HTMLFormElement> {
    titleInputElement: HTMLInputElement;
    descriptionInputElement: HTMLInputElement;
    peopleInputElement: HTMLInputElement;

    constructor() {
      super("project-input", "app", true, "user-input");

      this.titleInputElement = this.element.querySelector(
        "#title"
      )! as HTMLInputElement;
      this.descriptionInputElement = this.element.querySelector(
        "#description"
      )! as HTMLInputElement;

      this.peopleInputElement = this.element.querySelector(
        "#people"
      )! as HTMLInputElement;
      this.configure();
      this.renderContent();
    }

    @autoBind
    configure() {
      this.element.addEventListener("submit", this.submitHandler.bind(this));
    }

    renderContent(): void {}

    private clearInput() {
      this.titleInputElement.value = "";
      this.descriptionInputElement.value = "";
      this.peopleInputElement.value = "";
    }

    private gatherUserInput(): gatherUserInputReturnType {
      const enteredTitle = this.titleInputElement.value;
      const enteredDescription = this.descriptionInputElement.value;
      const enteredPeople = this.peopleInputElement.value;
      const titleValidatable: Validatable = {
        value: enteredTitle,
        required: true,
        minLength: 2,
        maxLength: 50,
      };
      const descriptionValidatable: Validatable = {
        value: enteredDescription,
        required: true,
        min: 2,
        maxLength: 2000,
      };
      const peopleValidatable: Validatable = {
        value: enteredPeople,
        required: true,
        min: 2,
        max: 20,
      };
      console.log("ooo");
      if (
        !validate(titleValidatable) ||
        !validate(descriptionValidatable) ||
        !validate(peopleValidatable)
      ) {
        alert("Invalid input");
        return;
      } else {
        return [enteredTitle, enteredDescription, +enteredPeople];
      }
    }

    private submitHandler(event: Event) {
      event.preventDefault();
      console.log("submit handler called");
      const userInput = this.gatherUserInput();
      if (Array.isArray(userInput)) {
        const [title, description, people] = userInput;
        console.log(title, description, people);
        projectState.addProject(title, description, people);
        this.clearInput();
      }
    }
  }
}
