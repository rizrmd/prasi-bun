import { DType, ServerAction } from "../../../../srv/ws/sync/type";
import { SyncClient } from "./client";

export class SyncSite {
  private c: SyncClient;
  private id = "";
  public status = "loading" as "loading" | "ready";

  constructor(c: SyncClient, id: string) {
    this.c = c;
    c._internal.send({ type: DType.Site, action: ServerAction.Load, id });
  }
}
