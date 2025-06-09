import { Outlet } from 'react-router';
import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
