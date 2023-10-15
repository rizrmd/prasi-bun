import { useEffect } from "react";
import { page } from "web-utils";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "*",
  component: ({}) => {
    useEffect(() => {
      if (localStorage.getItem("prasi-session")) {
        navigate("/editor");
      } else {
        navigate("/login");
      }
    }, []);
    return <Loading />;
  },
});
