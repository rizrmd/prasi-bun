import { validate } from "uuid";
import { page } from "web-utils";
import { Live } from "../../render/live/live";
import { defaultLoader } from "../../render/live/logic/default-loader";

export default page({
  url: "/live/:domain/**",
  component: ({}) => {
    params.site_id = params.domain;
    if (validate(params._)) {
      params.page_id = params._;
    }

    navigator.serviceWorker.controller?.postMessage({
      type: "add-cache",
      url: location.href,
    });

    return (
      <Live
        mode={"dev"}
        domain={params.domain}
        pathname={`/${params._ === "_" ? "" : params._}`}
        loader={defaultLoader}
      />
    );
  },
});
