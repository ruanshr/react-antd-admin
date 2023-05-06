import { LazyComponent } from "@/components";
import { Home, NotFount } from "@/pages";
export default [
  {
    path: "/",
    meta: { title: "首页", isLogin: true, isMenu: true },
    component: Home,
  },
  {
    path: "/account",
    meta: { title: "客户信息", isLogin: true, isMenu: true },
    component: LazyComponent({ path: "../pages/Account" }),
    children: [
      { path: "list", meta: { title: "客户列表" }, component: LazyComponent({ path: "../pages/Account/List" }) },
      { path: "form", meta: { title: "客户表单" }, component: LazyComponent({ path: "../pages/Account/Form" }) },
    ]
  },
  {
    path: "/about",
    meta: { title: "关于我们", isMenu: true },
    component: LazyComponent({ path: "../pages/About" }),
  },
  {
    path: "/login",
    meta: { title: "登录", isMenu: true },
    component: LazyComponent({ path: "../pages/Login" }),
  },
  {
    path: "*",
    meta: { title: "404", isMenu: true },
    component: NotFount,
  },
];
