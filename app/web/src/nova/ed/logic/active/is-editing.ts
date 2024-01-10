export const isTextEditing = () => {
  const el = document.activeElement;
  if (el && el.attributes.getNamedItem("contenteditable")) {
    return true;
  }
  return false;
};
