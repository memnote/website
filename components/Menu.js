import React from "react";
import Link from "next/link";
import AppBar from "../components/ui/AppBar";
import Button from "../components/ui/Button";

const Menu = () => {
  return (
    <AppBar maxWidth="1180px">
      <AppBar.Logo>
        <Link href="/">Memnote</Link>
      </AppBar.Logo>

      <AppBar.Navigation>
        <Button
          href="https://github.com/memnote/notes"
          target="blank"
          color="white"
          background="black"
          text="Hozzájárulás"
        />
      </AppBar.Navigation>
    </AppBar>
  );
};

export default Menu;
