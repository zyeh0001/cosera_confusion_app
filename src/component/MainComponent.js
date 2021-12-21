import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import Header from './Header';
import Footer from './Footer';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      selectedDish: null,
    };
  }

  onDishSelect(dishId) {
    this.setState({ selectedDish: dishId });
  }

  renderDish(dish) {
    if (dish != null) {
      return <DishDetail selectItem={dish} />;
    } else return <div></div>;
  }

  render() {
    return (
      <div>
        <Header />
        <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        {/* <DishDetail
          selectItem={
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          }
        /> */}
        <div>
          {this.renderDish(
            this.state.dishes.filter(
              (dish) => dish.id === this.state.selectedDish
            )[0]
          )}
        </div>
        <Footer />
      </div>
    );
  }
}

export default Main;
