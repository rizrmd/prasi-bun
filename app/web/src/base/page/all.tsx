import { page } from "web-utils";

export default page({
  url: "*",
  component: ({}) => {
    navigate("/login");
    return <div>Loading...</div>;
  },
});
