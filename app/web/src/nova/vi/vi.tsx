import { Suspense } from "react";
import { ViRoot } from "./root";
import { ErrorBox } from "./utils/error-box";

export const Vi: typeof ViRoot = (props) => {
  return (
    <ErrorBox>
      <Suspense>
        <ViRoot {...props} />
      </Suspense>
    </ErrorBox>
  );
};
