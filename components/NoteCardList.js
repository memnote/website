import React, { useContext } from "react";
import { ApplicationContext } from "../pages";
import Grid from "@material-ui/core/Grid";
import NoteCard from "./NoteCard";

function NoteCardList({ refChange }) {
  const { metaDatas, subjects } = useContext(ApplicationContext);

  return (
    <Grid container justify="flex-start" spacing={4}>
      {metaDatas.map((note, i) => {
        return (
          <Grid key={i} item>
            <NoteCard
              key={i}
              note={note}
              longSubject={subjects[note.subject]}
              refChange={metaDatas.length - 1 === i ? refChange : null}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default NoteCardList;
