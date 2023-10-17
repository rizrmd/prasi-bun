import { FC } from "react";
import { ErrorBox } from "./e-error";
import { ERender } from "./e-render";
import { EText } from "./e-text";

export const EItem: FC<{
  id: string;
  fromProp?: boolean;
  _scopeIndex?: Record<string, any>;
}> = ({ id, fromProp, _scopeIndex }) => {
  return (
    <ErrorBox id={id}>
      <ERender id={id} fromProp={fromProp} _scopeIndex={_scopeIndex}>
        {(childs) => {
          return childs.map((e) => {
            if (e.type !== "text") {
              return (
                <EItem
                  id={e.id}
                  key={e.id}
                  fromProp={fromProp}
                  _scopeIndex={_scopeIndex}
                />
              );
            } else {
              return (
                <EText
                  id={e.id}
                  key={e.id}
                  fromProp={fromProp}
                  _scopeIndex={_scopeIndex}
                />
              );
            }
          });
        }}
      </ERender>
    </ErrorBox>
  );
};
