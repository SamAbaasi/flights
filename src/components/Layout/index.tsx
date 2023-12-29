import { FC, ReactElement } from "react";

type Props = {
    children: ReactElement
}

const Layout: FC<Props> = ({children}) => {
  return (
    <div>
        <div>Sticky Navbar with SnappTrip Icon</div>
        <div>
          {children}
        </div>
    </div>
  )
}
export default Layout; 