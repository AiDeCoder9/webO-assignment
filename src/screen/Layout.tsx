import { Outlet } from 'react-router-dom';

export default function Layout() {
  return (
    <div className="app-wrapper-layout">
      <div className="app-base">
        <aside className="sidebar"></aside>
        <Outlet />
      </div>
    </div>
  );
}
