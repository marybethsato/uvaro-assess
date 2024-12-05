import "../styles/globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(var(--vh)*100)] flex flex-col bg-white min-w-[360px] max-w-[480px] overflow-x-hidden overflow-y-scroll snap-y">
      <div>{children}</div>
    </div>
  );
};

export default Layout;
