import "../styles/globals.css";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      className="h-[calc(var(--vh)*100)] flex flex-col bg-white overflow-x-hidden overflow-y-scroll snap-y relative
    
      md:min-w-full md:max-w-screen-md md:mx-auto md:h-full

      lg:max-w-screen-lg lg:overflow-visible
        "
    >
      <div>{children}</div>
    </div>
  );
};

export default Layout;
