import { ServerWebSocket } from "bun";
import { component } from "dbgen";
import { TypedArray, TypedDoc, TypedMap } from "yjs-types";
import type { WSData } from "../../../../pkgs/core/server/create";

import { IItem } from "../../../web/src/utils/types/item";
import { IRoot } from "../../../web/src/utils/types/root";
import { Site } from "./tools/load-site";
import { MPage } from "../../../web/src/utils/types/general";
import type { RadixRouter } from "radix3";

type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

export type SingleComp = {
  id: string;
  doc: TypedDoc<{
    map: TypedMap<component & { content_tree: TypedMap<IItem> }>;
  }>;
  undoManager: Y.UndoManager;
  saveTimeout?: ReturnType<typeof setTimeout>;
  ws: Set<ServerWebSocket<WSData>>;
};

export const eg = global as unknown as {
  cache: Record<
    string,
    Record<
      string,
      {
        id: string;
        js: string | null;
        url: string;
        js_compiled: string | null;
        content_tree: IRoot;
        lastRefresh: number;
      }
    >
  >;
  router: Record<string, RadixRouter<{ id: string; url: string }>>;
  edit: {
    site: Record<
      string,
      {
        id: string;
        doc: TypedDoc<{
          site: TypedMap<
            Site & { page: TypedArray<ArrayElement<Site["page"]>> }
          >;
        }>;
        undoManager: Y.UndoManager;
        saveTimeout?: ReturnType<typeof setTimeout>;
        ws: Set<ServerWebSocket<WSData>>;
      }
    >;
    comp: Record<string, SingleComp>;
    page: Record<
      string,
      {
        id: string;
        doc: MPage;
        undoManager: Y.UndoManager;
        saveTimeout?: ReturnType<typeof setTimeout>;
        ws: Set<ServerWebSocket<WSData>>;
      }
    >;
    ws: WeakMap<ServerWebSocket<WSData>, { clientID: string }>;
  };
};
