export const setDefault = <T,>(value: T): any => {
  if (typeof value === "string") {
    return "";
  } else if (typeof value === "number") {
    return 0;
  } else if (typeof value === "boolean") {
    return false;
  } else {
    console.log("typeof value", typeof value);

    return null;
  }
};
