import server from "@/server/index";

// 获取签名
export const getAuthorizeApi = () => {
  return server.request({
    url: "/v1/token/",
    method: "post",
  });
};
