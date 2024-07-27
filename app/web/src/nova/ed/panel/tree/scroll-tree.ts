import { active } from "../../logic/ed-global";

export const scrollTreeActiveItem = () => {
  setTimeout(() => {
    // let i = 0;
    // const ival = setInterval(() => {
    const div = document.querySelector(
      `.tree-${active.item_id}`
    ) as HTMLDivElement;
    if (div) {
      if (!active.hover.tree) div.scrollIntoView();
    }
    //   if (i > 7) clearInterval(ival);
    //   i++;
    // }, 30);
  }, 100);
};
