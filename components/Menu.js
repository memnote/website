import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Menu = () => {
  return (
    <AppBar
      position="fixed"
      style={{
        flexGrow: 1,
        background: "white",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            style={{
              flexGrow: 1,
              color: "black",
              fontFamily: "Poppins, sans-serif",
              fontWeight: "bold",
            }}
          >
            <Link href="/">Memnote</Link>
          </Typography>

          <Button
            href="https://github.com/memnote/notes"
            target="blank"
            color="inherit"
            style={{ background: "black" }}
          >
            Hozzájárulás
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Menu;
