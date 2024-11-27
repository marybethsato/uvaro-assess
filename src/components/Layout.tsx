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
  overflow: hidden;
`;

//   color: ${(props) => props.theme.colors.text};
// footer height: calc(var(--vh, 1vh) * 100 + [footer height]);

const Layout = ({ children }: LayoutProps): ReactElement => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;
