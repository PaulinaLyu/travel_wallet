import { Layout, theme } from "antd";
import { useAuthStore } from "../store/authStore";
const { Content } = Layout;

export const MainPage = () => {
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const logout = useAuthStore((state) => state.logout);
  const user = useAuthStore((state) => state.user);
  return (
    <Layout style={{ height: "100vh" }}>
      <Content
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "0 48px",
        }}
      >
        <div
          style={{
            background: colorBgContainer,
            minHeight: 280,
            padding: 24,
            borderRadius: borderRadiusLG,
          }}
        >
          <h3>Вы зарегистрированы. E-mail: ${user?.email}</h3>
          <button onClick={() => logout()}>Выйти</button>
        </div>
      </Content>
    </Layout>
  );
};
