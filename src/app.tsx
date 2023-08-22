import React, { useEffect } from "react";
import { useDidShow, useDidHide } from "@tarojs/taro";
// 全局样式
import "./app.scss";
import { Toast } from "@nutui/nutui-react-taro";

function App(props) {
  // 可以使用所有的 React Hooks
  useEffect(() => {
  });

  // 对应 onShow
  useDidShow(() => {});

  // 对应 onHide
  useDidHide(() => {});

  return (
    <>
      <Toast id="text" />
      <Toast id="load" />
      {props.children}
    </>
  );
}

export default App;
