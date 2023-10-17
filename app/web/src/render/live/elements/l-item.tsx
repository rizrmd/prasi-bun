import { FC } from "react";
import { LRender } from "./l-render";
import { LText } from "./l-text";

export const LItem: FC<{
  id: string;
  _scopeIndex?: Record<string, any>;
  fromProp?: boolean;
}> = ({ id, fromProp, _scopeIndex }) => {
  return (
    <LRender id={id} _scopeIndex={_scopeIndex}>
      {(childs) => {
        return childs.map((e) => {
          if (e.type === "item") {
            return (
              <LItem
                id={e.id}
                key={e.id}
                fromProp={fromProp}
                _scopeIndex={_scopeIndex}
              />
            );
          } else {
            return (
              <LText
                id={e.id}
                key={e.id}
                fromProp={fromProp}
                _scopeIndex={_scopeIndex}
              />
            );
          }
        });
      }}
    </LRender>
  );
};
