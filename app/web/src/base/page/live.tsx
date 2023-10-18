import { validate } from "uuid";
import { page } from "web-utils";
import { devLoader } from "../../render/live/dev-loader";
import { Live } from "../../render/live/live";

export default page({
  url: "/live/:domain/**",
  component: ({}) => {
    params.site_id = params.domain;
    let pathname = `/${params._ === "_" ? "" : params._}`;
    if (validate(params._)) {
      const arr = params._.split("/");
      params.page_id = arr.shift();
      pathname = `/${arr.join("/")}`;
    }
    (window as any).pathname = pathname;

    navigator.serviceWorker.controller?.postMessage({
      type: "add-cache",
      url: location.href,
    });

    return (
      <Live
        domain_or_siteid={params.domain}
        pathname={pathname}
        loader={devLoader}
      />
    );
  },
});
