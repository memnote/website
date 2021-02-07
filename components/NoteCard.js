import React from "react";
import Link from "next/link";
import Card from "./ui/Card";

function NoteCard({ note, refChange, longSubject }) {
  return (
    <Link href={`/posts/${note.fileName}`}>
      <div>
        <Card reference={refChange}>
          <Card.Content>
            <Card.TopText>{longSubject}</Card.TopText>
            <Card.Title
              text={note.title}
              iconSrc={`static/${note.subject}.svg`}
            />
            <Card.Description>{note.description}</Card.Description>
            <Card.BottomText>
              {new Date(note.date).toLocaleDateString()}
            </Card.BottomText>
          </Card.Content>
        </Card>
      </div>
    </Link>
  );
}

export default NoteCard;
