const Footer = () => {
  return (
    <footer className="border-t border-black mt-auto relative z-10 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 text-xs sm:text-sm">
          <p className="opacity-60 text-center sm:text-left">© {new Date().getFullYear()} All rights reserved.</p>
          <p className="opacity-60 text-center sm:text-right">Designed with minimalism in mind.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
