namespace App {
  export interface Validatable {
    value: string;
    required?: boolean;
    minLength?: number;
    maxLength?: number;
    max?: number;
    min?: number;
  }
  export function validate(validateableInput: Validatable) {
    console.log(
      "validate called",
      validateableInput.value.toString().trim().length !== 0
    );
    let isValid = true;
    if (validateableInput.required) {
      isValid =
        isValid && validateableInput.value.toString().trim().length !== 0;
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
}
