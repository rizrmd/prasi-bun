export const evalPropVis = (
  props: Record<string, { value: string; visible?: string }>
) => {
  try {
    const src = `
    ${Object.entries(props)
      .map(([k, v]) => `const ${k} = ${v.value}`)
      .join("\n")}
    
    return {
      ${Object.entries(props)
        .filter(([_, v]) => v.visible)
        .map(([k, v]) => `${k}: ${v.visible},`)
        .join("\n")}
    }
    `;
    const fn = new Function(src);

    return fn() as Record<string, boolean>;
  } catch (e) {}
};
