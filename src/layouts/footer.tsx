import React from "react";
import { Layout } from "antd";

const { Footer } = Layout;

export default function BottonFooter() {

  return (<Footer className="footer">
    <p>
      <a href="" target="_blank" ref="noreferrer">react-antd-admin</a>
    </p>
    <p>
      <a href="" target="_blank" ref="noreferrer">交流</a>
    </p>
    <p>
      备案
    </p>
  </Footer>)
}
