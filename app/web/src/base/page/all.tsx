import { useEffect } from "react";
import { page, useGlobal } from "web-utils";
import { EDGlobal } from "../../render/ed/logic/ed-global";
import { edInitSync } from "../../render/ed/logic/ed-sync";
import { Loading } from "../../utils/ui/loading";

export default page({
  url: "**",
  component: ({}) => {
    const p = useGlobal(EDGlobal, "EDITOR");
    useEffect(() => {
      if (localStorage.getItem("prasi-session")) {
        if (
          location.pathname === "/ed" ||
          location.pathname.startsWith("/ed/")
        ) {
          edInitSync(p);
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
