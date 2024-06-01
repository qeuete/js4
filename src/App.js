import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import "./App.css";

const API_KEY = "5NEHA4G-NVHMKJF-J10G8X1-96WEJHJ";

class App extends React.Component {
  state = {
    films: [],
    topFilms: [],
    showTop: false
  };

  gettingFilms = async (e) => {
    e.preventDefault();
    const query = e.target.elements.query.value;
    try {
      const api_url = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&query=${query}`,
        {
          headers: {
            "X-API-KEY": API_KEY,
            accept: "application/json"
          }
        }
      );

      if (!api_url.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await api_url.json();
      console.log(data);

      if (data && data.docs && data.docs.length > 0) {
        this.setState({
          films: data.docs,
          showTop: false
        });
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  getTopFilms = async () => {
    const currentYear = new Date().getFullYear();
    try {
      const api_url = await fetch(
        `https://api.kinopoisk.dev/v1.4/movie/search?page=1&limit=10&sortType[]=1&sortField[]=rating.kp&year=${currentYear}`,
        {
          headers: {
            "X-API-KEY": API_KEY,
            accept: "application/json"
          }
        }
      );

      if (!api_url.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await api_url.json();
      console.log(data);

      if (data && data.docs && data.docs.length > 0) {
        this.setState({
          topFilms: data.docs,
          showTop: true
        });
      }
    } catch (error) {
      console.error("Error fetching or processing data:", error);
    }
  };

  render() {
    return (
      <div>
        <h1 className="AppMain">Поиск фильмов</h1>
        <div className="header-container">
          <Header films={this.gettingFilms} />
        </div>

        <div className="topfilmsbtn">
          <button className="btn btn-primary mb-3" onClick={this.getTopFilms}>
            Показать топ-10 текущего года
          </button>
        </div>
        <div className="films-list">
          {this.state.showTop
            ? this.state.topFilms.map((film, index) => (
                <Main
                  key={index}
                  name={film.name}
                  ageRating={film.ageRating}
                  url={film.backdrop?.url}
                  description={film.description}
                  posterUrl={film.poster?.url}
                />
              ))
            : this.state.films.length > 0
            ? this.state.films.map((film, index) => (
                <Main
                  key={index}
                  name={film.name}
                  ageRating={film.ageRating}
                  url={film.backdrop?.url}
                  description={film.description}
                  posterUrl={film.poster?.url}
                />
              ))
            : null}
        </div>
      </div>
    );
  }
}

export default App;
