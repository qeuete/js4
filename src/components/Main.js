import React from "react";
import "../styles/Main.css";
import 'bootstrap/dist/css/bootstrap.min.css';

class Main extends React.Component {
  render() {
    const { url, name, description, ageRating, posterUrl } = this.props;
    return (
      <div className="card me-2" style={{ minWidth: '540px', maxWidth: '540px' }}>
        <div className="row g-0">
          <div className="col-mb-2">
            <img src={posterUrl || url} className="card-img-top"/>
          </div>
          <div className="col-mb-2">
            <div className="card-body">
              <h5 className="card-title">{name}</h5>
              {ageRating && <p className="card-text">Возрастное ограничение: {ageRating}+</p>}
              <p className="card-text">{description.substring(0, 550)}...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
