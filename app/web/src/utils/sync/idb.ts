import { createStore } from "idb-keyval";
export const initIDB = (user_id: string) => {
  const store = createStore(`prasi-user-${user_id}`, "default");
  return store;
};
