import React from "react";
import Link from "next/link";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  container: {
    maxWidth: 1200,
    position: "relative",
    left: "50%",
    transform: "translateX(-50%)",
  },
  logo: {
    flexGrow: 1,
    color: "black",
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
  },
  bar: {
    flexGrow: 1,
    background: "white",
  },
  button: {
    background: "black",
  },
}));

const Menu = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.bar}>
      <div className={classes.container}>
        <Toolbar>
          <Typography variant="h6" className={classes.logo}>
            <Link href="/">Memnote</Link>
          </Typography>

          <Button
            href="https://github.com/memnote/notes"
            target="blank"
            color="inherit"
            className={classes.button}
          >
            Hozzájárulás
          </Button>
        </Toolbar>
      </div>
    </AppBar>
  );
};

export default Menu;
