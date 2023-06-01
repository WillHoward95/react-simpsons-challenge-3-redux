import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import Inputs from "./components/Inputs";
import { connect } from "react-redux";
import {
  NEW_API_DATA,
  SET_SEARCH_INPUT,
  SET_SORT_TYPE,
  DELETE_ITEM,
  LIKE_TOGGLE,
} from "./store/types";

class App extends Component {
  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.props.dispatch({ type: NEW_API_DATA, payload: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.props.simpsons.findIndex((char) => {
      return char.id === id;
    });
    this.props.dispatch({ type: LIKE_TOGGLE, payload: indexOf });
  };

  onDelete = (id) => {
    const indexOf = this.props.simpsons.findIndex((char) => {
      return char.id === id;
    });
    this.props.dispatch({ type: DELETE_ITEM, payload: indexOf });
  };

  onSearch = (e) => {
    this.props.dispatch({ type: SET_SEARCH_INPUT, payload: e.target.value });
  };

  onSort = (e) => {
    this.props.dispatch({ type: SET_SORT_TYPE, payload: e.target.value });
  };

  getFilteredList = () => {
    const { search, simpsons, sort } = this.props;

    let filteredList = [...simpsons];

    if (search) {
      filteredList = simpsons.filter((item) => {
        if (
          item.quote.toLowerCase().includes(search.toLowerCase()) ||
          item.character.toLowerCase().includes(search.toLowerCase())
        ) {
          return true;
        }
      });
    }

    if (sort) {
      filteredList = filteredList.sort((itemOne, itemTwo) => {
        if (sort === "asc") {
          if (itemOne.character < itemTwo.character) {
            return -1;
          }
          if (itemOne.character > itemTwo.character) {
            return 1;
          }
        } else if (sort === "desc") {
          if (itemOne.character < itemTwo.character) {
            return 1;
          }
          if (itemOne.character > itemTwo.character) {
            return -1;
          }
        } else {
          return;
        }
      });
    }

    return filteredList;
  };

  render() {
    const { simpsons } = this.props;

    if (!simpsons) return <Loading />;

    if (simpsons.length === 0) return <p>You deleted everything!</p>;

    //calculate the total
    let total = 0;
    simpsons.forEach((char) => {
      if (char.liked) total++;
    });

    return (
      <>
        <h1>Total no of liked chars #{total}</h1>
        <Inputs
          simpsons={simpsons}
          onSearch={this.onSearch}
          onSort={this.onSort}
        />

        <Simpsons
          simpsons={this.getFilteredList()}
          onDelete={this.onDelete}
          onLikeToggle={this.onLikeToggle}
        />
      </>
    );
  }
}

function mapStateToProps(state) {
  return {
    simpsons: state.simpsons,
    search: state.search,
    sort: state.sort,
    liked: state.liked,
  };
}

export default connect(mapStateToProps)(App);
