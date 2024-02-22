import { type FC, PropsWithChildren } from "react";

interface HeaderProps extends PropsWithChildren {
  image: {
    src: string;
    alt: string;
  };
}

const Header: FC<HeaderProps> = ({ image, children }) => {
  return (
    <header>
      <img src={image.src} alt={image.alt} />
      {children}
    </header>
  );
};

export default Header;
