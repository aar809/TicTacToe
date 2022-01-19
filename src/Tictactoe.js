import React from "react"

export default function Tictactoe(props) {
    // console.log("asdf", props.number)

    const styles = {
        backgroundColor: props.isClicked ? "grey" : "white"
    }

  return <div 
            className="box"
            onClick = {props.nextTurn}
            // style={styles}
        >
      <h2>{props.number}</h2>
  </div>;
}
