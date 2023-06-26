console.log("Drag and drop project");
type gatherUserInputReturnType = [string, string, number] | void;
interface Validatable {
  value: string;
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  max?: number;
  min?: number;
}
//autobind decorator
function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjustedDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundfn = originalMethod.bind(this);
      return boundfn;
    },
  };
  return adjustedDescriptor;
}

function validate(validateableInput: Validatable) {
  console.log(
    "validate called",
    validateableInput.value.toString().trim().length !== 0
  );
  let isValid = true;
  if (validateableInput.required) {
    isValid = isValid && validateableInput.value.toString().trim().length !== 0;
  }
  if (
    validateableInput.minLength != null &&
    typeof validateableInput.value === "string"
  ) {
    isValid =
      isValid &&
      validateableInput.value.toString().trim().length >
        validateableInput.minLength;
  }
  if (
    validateableInput.maxLength != null &&
    typeof validateableInput.value === "string"
  ) {
    isValid =
      isValid &&
      validateableInput.value.toString().trim().length <
        validateableInput.maxLength;
  }
  if (
    validateableInput.min != null &&
    typeof validateableInput.value === "number"
  ) {
    isValid = isValid && validateableInput.value > validateableInput.min;
  }
  if (
    validateableInput.max != null &&
    typeof validateableInput.value === "number"
  ) {
    isValid = isValid && validateableInput.value < validateableInput.max;
  }
  return isValid;
}

// ProjectList class
class ProjectListClass {
  template: HTMLTemplateElement;
  host: HTMLDivElement;
  element: HTMLElement;

  constructor(private type: "active" | "finished") {
    this.template = document.getElementById(
      "project-list"
    )! as HTMLTemplateElement;
    this.host = document.getElementById("app")! as HTMLDivElement;

    const importedHTMLContent = document.importNode(
      this.template.content,
      true
    );
    this.element = importedHTMLContent.firstElementChild as HTMLFormElement;
    this.element.id = `${this.type}-projects`;
    this.attach();
  }

  private attach() {
    this.host.insertAdjacentElement("afterbegin", this.element);
  }
}

//ProjectInput claqss
class ProjectInput {
  template: HTMLTemplateElement;
  host: HTMLDivElement;
  element: HTMLFormElement;
  titleInputElement: HTMLInputElement;
  descriptionInputElement: HTMLInputElement;
  peopleInputElement: HTMLInputElement;

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

    this.element.id = "user-input";
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
    this.attach();
  }

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
      this.clearInput();
    }
  }

  @autoBind
  private configure() {
    this.element.addEventListener("submit", this.submitHandler.bind(this));
  }

  private attach() {
    this.host.insertAdjacentElement("afterbegin", this.element);
  }
}

const projectInput = new ProjectInput();
