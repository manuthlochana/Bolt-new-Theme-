const Footer = () => {
  return (
    <footer className="py-12 border-t border-border bg-card">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <div className="text-xl font-bold text-foreground mb-2">Manuth Lochana</div>
            <p className="text-sm text-muted-foreground">Developer • Innovator • Creator</p>
          </div>

          <div className="text-center md:text-right">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Manuth Lochana. All rights reserved.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Built with passion and cutting-edge technology
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;