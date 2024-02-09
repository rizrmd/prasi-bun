import { createStore } from "idb-keyval";

export const prodCache = createStore(`prasi-prod`, `prasi-cache-prod`);
