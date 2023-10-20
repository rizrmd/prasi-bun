import { useEffect } from "react";
import { page } from "web-utils";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "**",
  component: ({}) => {
    useEffect(() => {
      if (localStorage.getItem("prasi-session")) {
        if (
          location.pathname === "/ed" ||
          location.pathname.startsWith("/ed/")
        ) {
          navigate("/ed/_/_");
        } else if (location.pathname.startsWith("/editor")) {
          const arr = location.pathname.split("/");
          if (arr.length <= 2) {
            navigate("/editor/_/_");
          } else if (arr.length === 3) {
            navigate(location.pathname + "/");
          }
        } else {
          navigate("/editor/_/_");
        }
      } else {
        navigate("/login");
      }
    });

    return <Loading />;
  },
});
