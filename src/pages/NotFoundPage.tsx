import { NavLink } from "react-router-dom";

export const NotFoundPage = () => {
  return (
    <div>
      <div>
        <p>404</p>
        <p>Извините, страница, которую вы ищете, не найдена.</p>
        <NavLink to="/">Вернуться на Главную</NavLink>
      </div>
    </div>
  );
};
