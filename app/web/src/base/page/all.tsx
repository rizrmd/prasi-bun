import { useEffect } from "react";
import { page } from "web-utils";

export default page({
  url: "**",
  component: ({}) => {
    useEffect(() => {
      navigate("/login");
    }, []);
    return <div>Loading...</div>;
  },
});
