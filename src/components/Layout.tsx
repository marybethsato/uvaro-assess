import "../styles/globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(var(--vh)*100)] flex flex-col mx-auto bg-white min-w-[360px] max-w-[480px] overflow-hidden">
      {children}
    </div>
  );
};

export default Layout;
