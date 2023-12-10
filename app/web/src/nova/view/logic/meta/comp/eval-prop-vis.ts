export const evalPropVis = (
  props: Record<string, { value: string; visible?: string }>
) => {
  try {
    const fn = new Function(`
${Object.entries(props)
  .map(([k, v]) => `const ${k} = ${v.value};`)
  .join("\n")}

return {
  ${Object.entries(props)
    .filter(([k, v]) => v.visible)
    .map(([k, v]) => `${k}: ${v},`)
    .join("\n")}
}
`);

    return fn() as Record<string, boolean>;
  } catch (e) {}
};
