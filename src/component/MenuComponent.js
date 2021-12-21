import React, { Component } from 'react';
// import { Media } from 'reactstrap';
import { Card, CardImg, CardImgOverlay, CardTitle } from 'reactstrap';

class Menu extends Component {
  constructor(props) {
    super(props);
  }

  // renderDish(dish) {
  //   if (dish != null) {
  //     return <DishdetailComponent selectItem={dish} />;
  //   } else return <div></div>;
  // }

  render() {
    const menu = this.props.dishes.map((dish) => {
      return (
        <div key={dish.id} className='col-12 col-md-5 m-1'>
          <Card onClick={() => this.props.onClick(dish.id)}>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardImgOverlay body className='ml-5'>
              <CardTitle>{dish.name}</CardTitle>
              {/* <CardText>{dish.description}</CardText> */}
            </CardImgOverlay>
          </Card>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='row'>{menu}</div>
        {/* <div>{this.renderDish(this.state.selectedDish)}</div> */}
      </div>
    );
  }
}

export default Menu;
