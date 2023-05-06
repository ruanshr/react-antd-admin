
import React, { Component } from "react";
import { Route } from "react-router-dom";
import { BackTop, Layout, message } from "antd";
import { menu } from "./Menu";

export class DefaultLayout extends Component<any, any> {

  isLogin = () => {
    const user = localStorage.getItem("user");
    if (!user) {
      this.props.history.push("/login")
    } else {
      this.setState({
        menu: this.getMenu(menu)
      })
    }
  }

  loginOut = () => {
    localStorage.clear();
    this.props.history.push("/login");
    message.success("登出成功！");
  }

  getUserInfo () {
    try {
      return JSON.parse(localStorage.getItem("userInfo"))
    } catch(e) {
      console.error(e);
    }
  }
  getMenu = (menu: any) => {
    const user = this.getUserInfo();
    let auth = user?.auth || false;
    if (!auth) {
      return menu;
    } else {
      return menu.filter((res: any) => res.auth && res.auth.indexOf(auth) > -1);
    }
  }

  componentDidMount() {
    this.isLogin();
  }

  componentDidUpdate() {
    
  }

  componentWillUnmount() {
    
  }

  render() {
    const { menuClick, menuToggle } = this.props;
    const user = this.getUserInfo();
    const auth = user?.auth;

    return (<Layout className="app">
      <BackTop />
    </Layout>)
  }
}