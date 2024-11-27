import { ReactElement, ReactNode } from "react";
import styled from "styled-components";

interface LayoutProps {
  children: ReactNode;
}

const LayoutContainer = styled.div`
  height: calc(var(--vh) * 100);
  display: flex;
  flex-direction: column;
  padding: 16px;
  margin: 0 auto;
  background-color: #fff;
  max-width: 480px;
`;
//
//   color: ${(props) => props.theme.colors.text};

const Layout = ({ children }: LayoutProps): ReactElement => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

// const styles: { container: CSSProperties } = {
//   container: {
//     height: "calc(var(--vh) * 100)",
//     display: "flex",
//     flexDirection: "column",
//     // alignItems: 'center',
//     padding: "20px",
//     // margin: '0 auto',
//     // maxWidth: '600px',
//   },
// };

export default Layout;
