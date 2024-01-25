import { useEffect } from "react";
import { useAuthStore } from "./store/authStore";
import { LoginPage } from "./pages/LoginPage";
import { MainPage } from "./pages/MainPage";

function App() {
  // const checkAuth = useAuthStore((state) => state.checkAuth);
  const isLoading = useAuthStore((state) => state.isLoading);
  const user = useAuthStore((state) => state.user);

  // useEffect(() => {
  //   if (localStorage.getItem("token")) {
  //     checkAuth();
  //   }
  // }, []);

  if (isLoading) {
    return <div>Загрузка...</div>;
  }

  if (!user) {
    return <LoginPage />;
  }

  return (
    <>
      <MainPage />
    </>
  );
}

export default App;
