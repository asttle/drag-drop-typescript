/// <reference path='models/drag-drop-interfaces.ts' />
/// <reference path ='models/project-model.ts' />
/// <reference path ='state/project-state.ts' />
/// <reference path ='util/validate.ts' />
/// <reference path ='decorators/autobind.ts' />
/// <reference path ='components/base-component.ts' />
/// <reference path ='components/project-input.ts' />
/// <reference path ='components/project-item.ts' />
/// <reference path ='components/project-list.ts' />

console.log("Drag and drop project");
namespace App {
  new ProjectInput();
  new ProjectListClass("active");
  new ProjectListClass("finished");
}
