import React from "react";
import Link from "next/link";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import styles from "../styles/Note.module.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  cardTitle: {
    fontFamily: "Poppins, sans-serif",
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 5,
  },
  description: {
    fontSize: 16,
    marginTop: 10,
  },
  date: {
    fontSize: 12,
    marginTop: 10,
  },
  subject: {
    color: "#6E00FF",
    fontSize: 14,
  },
  content: {
    padding: "20px 10px",
  },
  media: {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
  },
}));

function NoteCard({ note, refChange, longSubject }) {
  const classes = useStyles();

  return (
    <Link href={`/posts/${note.fileName}`}>
      <Card ref={refChange} className={styles.card}>
        <CardActionArea>
          <CardMedia
            image={`static/${note.subject}.svg`}
            title={note.title}
            style={{ height: 190 }}
            className={classes.media}
          />

          <CardContent className={classes.content}>
            <Typography className={classes.subject} component="p">
              {longSubject}
            </Typography>
            <Typography
              className={classes.cardTitle}
              variant="h5"
              component="h2"
            >
              {note.title} &rarr;
            </Typography>
            <Typography component="p" className={classes.description}>
              {note.description}
            </Typography>
            <Typography component="p" className={classes.date}>
              {new Date(note.date).toLocaleDateString()}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
}

export default NoteCard;
