import { FC, ReactElement } from "react";
import Styles from "./Layout.module.scss";
import logo from "../../assets/snaptrip.png"
type Props = {
    children: ReactElement
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={Styles.layout}>
      <div className={Styles.navbar}>
        <a href="https://flighttrip.netlify.app/" className={Styles.logo}>
          <img src={logo} alt="logo" className={Styles.img} />
        </a>
      </div>
      <div className={Styles.content}>{children}</div>
    </div>
  );
};

export default Layout;