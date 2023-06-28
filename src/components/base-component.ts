namespace App {
  export abstract class Component<
    THost extends HTMLElement,
    TElement extends HTMLElement
  > {
    template: HTMLTemplateElement;
    host: THost;
    element: TElement;

    constructor(
      templateId: string,
      hostElementId: string,
      insertAtStart: boolean,
      newElementId?: string
    ) {
      this.template = document.getElementById(
        templateId
      )! as HTMLTemplateElement;
      this.host = document.getElementById(hostElementId)! as THost;
      const importedHTMLContent = document.importNode(
        this.template.content,
        true
      );
      this.element = importedHTMLContent.firstElementChild as TElement;
      if (newElementId) this.element.id = newElementId;
      this.attach(insertAtStart);
    }

    private attach(insertAtBegiining: boolean) {
      this.host.insertAdjacentElement(
        insertAtBegiining ? "afterbegin" : "beforeend",
        this.element
      );
    }
    abstract configure(): void; // force inherited class to define this method
    abstract renderContent(): void;
  }
}
