import React, { Component } from 'react';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import { DISHES } from '../shared/dishes';
import { LEADERS } from '../shared/leaders';
import { COMMENTS } from '../shared/comments';
import { PROMOTIONS } from '../shared/promotions';

import Header from './Header';
import Footer from './Footer';
import Home from './HomeComponent';
import { Switch, Route, Redirect } from 'react-router-dom';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dishes: DISHES,
      comments: COMMENTS,
      promotions: PROMOTIONS,
      leaders: LEADERS,
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
    const HomePage = () => {
      return (
        <Home
          dish={this.state.dishes.filter((dish) => dish.featured)[0]}
          promotion={this.state.promotions.filter((promo) => promo.featured)[0]}
          leader={this.state.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.state.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          comments={this.state.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
        />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />
          <Route
            exact
            path='/menu'
            component={() => <Menu dishes={this.state.dishes} />}
          />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route exact path='/contactme' component={Contact} />

          <Redirect to='/' />
        </Switch>

        {/* <Menu
          dishes={this.state.dishes}
          onClick={(dishId) => this.onDishSelect(dishId)}
        />
        {this.renderDish(
          this.state.dishes.filter(
            (dish) => dish.id === this.state.selectedDish
          )[0]
        )} */}

        <Footer />
      </div>
    );
  }
}

export default Main;
