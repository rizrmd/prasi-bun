import { useEffect } from "react";
import { page, useGlobal } from "web-utils";
import { EDGlobal } from "../../nova/ed/logic/ed-global";
import { edInitSync } from "../../nova/ed/logic/ed-sync";
import { Loading } from "../../utils/ui/loading";
import { isLocalhost } from "../../utils/ui/is-localhost";

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
            navigate("/ed/_/_");
          } else if (arr.length === 3) {
            navigate(location.pathname + "/");
          }
        } else {
          if (isLocalhost()) {
            navigate("/ed");
          } else {
            navigate("/ed/_/_");
          }
        }
      } else {
        navigate("/login");
      }
    });

    return <Loading />;
  },
});
