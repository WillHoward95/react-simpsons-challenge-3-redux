import React, { Component } from "react";

class Inputs extends Component {
  render() {
    const { onSort, onSearch } = this.props;
    return (
      <>
        <p>
          Search by quote or character:{" "}
          <input type="text" name="search" id="search" onInput={onSearch} />
        </p>
        <p>
          Sort characters alphabetically by name:
          <select name="sort" id="sort" onChange={onSort}>
            <option value="empty"></option>
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </p>
      </>
    );
  }
}

export default Inputs;
