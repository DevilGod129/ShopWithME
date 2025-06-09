// src/components/Footer.tsx
const Footer = () => {
  return (
    <footer className="bg-gray-100 mt-10 py-6 text-center text-gray-600 text-sm">
      <div className="max-w-6xl mx-auto px-4">
        <p>© {new Date().getFullYear()} ShoeStore. All rights reserved.</p>
        <p className="mt-1">Built with ❤️ using React + TailwindCSS</p>
      </div>
    </footer>
  );
};

export default Footer;
