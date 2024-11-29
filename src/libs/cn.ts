export function cn(...classes: (string | Record<string, boolean>)[]) {
  let classNames = "";
  for (let i = 0; i < classes.length; i++) {
    const className = classes[i];

    if (typeof className === "string") {
      classNames += ` ${className}`;
    }

    if (typeof className === "object") {
      for (const key in className) {
        if (className[key]) {
          classNames += ` ${key}`;
        }
      }
    }
  }
  return classNames;
}
