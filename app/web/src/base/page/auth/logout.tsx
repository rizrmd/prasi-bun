import { page } from "web-utils";
import { Loading } from "../../../utils/ui/loading";

export default page({
  url: "/logout",
  component: ({}) => {
    api.logout().then(() => {
      location.href = "/login";
    });

    return <Loading />;
  },
});
