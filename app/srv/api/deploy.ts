import { apiContext } from "service-srv";

export const _ = {
  url: "/deploy/**",
  async api() {
    const { req, res } = apiContext(this);
    return "rukausfb";
  }, 
};  
 