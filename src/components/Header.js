import React from "react";
import "../styles/Header.css";
import 'bootstrap/dist/css/bootstrap.min.css'

class Header extends React.Component {
    handleSubmit = (e) => {
      e.preventDefault();
      this.props.films(e);
    };
    render() {
      return (
        <div className="header">
         <form
          className="col-12 col-lg-auto mb-2 mb-lg-1 me-lg-2"
          role="search" onSubmit={this.handleSubmit}>
            <div className="col-auto">
            <input name="query" type="text" 
            className="form-control form-control-dark text-bg-dark"
            aria-label="Search"/>
            </div>
            <div className="col-auto">
              <button type="submit" className="btn btn-primary mb-3">Найти</button>
            </div>
          </form>
        </div>
      );
    }
  }
  
  export default Header;
