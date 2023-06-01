import React, { Component } from "react";
import axios from "axios";
import Loading from "./components/Loading";
import Simpsons from "./components/Simpsons";
import "./App.css";
import Inputs from "./components/Inputs";

class App extends Component {
  state = {};

  async componentDidMount() {
    const { data } = await axios.get(
      `https://thesimpsonsquoteapi.glitch.me/quotes?count=50`
    );

    //fixed the api data to have unique id
    data.forEach((element, index) => {
      element.id = index + Math.random();
    });

    this.setState({ simpsons: data });
  }

  onLikeToggle = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    //invert if liked or not liked
    simpsons[indexOf].liked = !simpsons[indexOf].liked;
    this.setState({ simpsons });
  };

  onDelete = (id) => {
    const indexOf = this.state.simpsons.findIndex((char) => {
      return char.id === id;
    });
    const simpsons = [...this.state.simpsons];
    simpsons.splice(indexOf, 1);
    this.setState({ simpsons });
  };

  onSearch = (e) => {
    this.setState({ search: e.target.value });
  };

  onSort = (e) => {
    this.setState({ sort: e.target.value });
  };

  getFilteredList = () => {
    const { simpsons, search, sort } = this.state;
    // console.log(simpsons);

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
    const { simpsons } = this.state;

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

export default App;
