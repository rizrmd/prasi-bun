import { useEffect } from "react";
import { page } from "web-utils";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "**",
  component: ({}) => {
    useEffect(() => {
      if (localStorage.getItem("prasi-session")) {
        if (location.pathname.startsWith("/ed/")) {
          navigate("/ed/_/_");
        } else {
          navigate("/editor/_/_");
        }
      } else {
        navigate("/login");
      }
    }, []);

    return <Loading />;
  },
});
