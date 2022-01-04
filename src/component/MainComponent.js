import React, { Component } from 'react';
import Contact from './ContactComponent';
import Menu from './MenuComponent';
import DishDetail from './DishdetailComponent';
import Header from './Header';
import Footer from './Footer';
import Home from './HomeComponent';
import About from './AboutUsComponent';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {
  addComment,
  fetchDishes,
  fetchComments,
  fetchPromos,
} from '../redux/ActionCreator';
import { actions } from 'react-redux-form';

const mapStateToProps = (state) => {
  return {
    dishes: state.dishes,
    comments: state.comments,
    promotions: state.promotions,
    leaders: state.leaders,
  };
};

const mapDispatchToProps = (dispatch) => ({
  addComment: (dishId, rating, author, comment) =>
    dispatch(addComment(dishId, rating, author, comment)),
  fetchDishes: () => {
    dispatch(fetchDishes());
  },
  fetchComments: () => {
    dispatch(fetchComments());
  },
  fetchPromos: () => {
    dispatch(fetchPromos());
  },
  resetFeedbackForm: () => {
    dispatch(actions.reset('feedback'));
  },
});

class Main extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   selectedDish: null,
    // };
  }

  //   onDishSelect(dishId) {
  //     this.setState({ selectedDish: dishId });
  //   }

  componentDidMount() {
    this.props.fetchDishes();
    this.props.fetchComments();
    this.props.fetchPromos();
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
          dish={this.props.dishes.dishes.filter((dish) => dish.featured)[0]}
          dishesLoading={this.props.dishes.isLoading}
          dishesErrMess={this.props.dishes.errMess}
          promotion={
            this.props.promotions.promotions.filter(
              (promo) => promo.featured
            )[0]
          }
          promosLoading={this.props.promotions.isLoading}
          promosErrMess={this.props.promotions.errMess}
          leader={this.props.leaders.filter((leader) => leader.featured)[0]}
        />
      );
    };
    const AboutUsPage = () => {
      return <About leaders={this.props.leaders} />;
    };

    const DishWithId = ({ match }) => {
      return (
        <DishDetail
          dish={
            this.props.dishes.dishes.filter(
              (dish) => dish.id === parseInt(match.params.dishId, 10)
            )[0]
          }
          isLoading={this.props.dishes.isLoading}
          ErrMess={this.props.dishes.errMess}
          comments={this.props.comments.comments.filter(
            (comment) => comment.dishId === parseInt(match.params.dishId, 10)
          )}
          commentsErrMess={this.props.comments.errMess}
          addComment={this.props.addComment}
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
            component={() => <Menu dishes={this.props.dishes} />}
          />
          <Route path='/menu/:dishId' component={DishWithId} />
          <Route path='/aboutus' component={AboutUsPage} />
          <Route
            exact
            path='/contactme'
            component={() => (
              <Contact resetFeedbackForm={this.props.resetFeedbackForm} />
            )}
          />

          <Redirect to='/' />
        </Switch>

        <Footer />
      </div>
    );
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Main));
