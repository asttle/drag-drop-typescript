export function autoBind(_: any, _2: string, descriptor: PropertyDescriptor) {
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
