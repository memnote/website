import React from "react";
import Grid from "./ui/Grid";
import NoteCard from "./NoteCard";
import useSearchContext from "../hooks/useSearchContext";

function NoteCardList({ refChange }) {
  const { metaDatas, subjects } = useSearchContext();

  return (
    <Grid>
      {metaDatas.map((note, i) => {
        return (
          <NoteCard
            key={i}
            note={note}
            longSubject={subjects[note.subject]}
            refChange={metaDatas.length - 1 === i ? refChange : null}
          />
        );
      })}
    </Grid>
  );
}

export default NoteCardList;
