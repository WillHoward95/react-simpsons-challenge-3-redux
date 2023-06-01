import React, { Component } from "react";
import Name from "./Name";
import Quote from "./Quote";
import Image from "./Image";
import Delete from "./Delete";

class Character extends Component {
  render() {
    const { character, quote, image, id, characterDirection, liked } =
      this.props.item;
    const { onLikeToggle, onDelete } = this.props;

    return (
      <div className="characterContainer">
        <Name
          character={character}
          onLikeToggle={onLikeToggle}
          id={id}
          liked={liked}
        />
        <Quote quote={quote} />
        <Image image={image} />
        <Delete onDelete={onDelete} id={id} />
      </div>
    );
  }
}

export default Character;
