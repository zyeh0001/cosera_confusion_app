import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardImgOverlay,
  CardText,
  CardBody,
  CardTitle,
} from 'reactstrap';

export class DishdetailComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const dish = this.props.selectItem;
    const commentList = this.props.selectItem.comments.map((comment) => {
      return (
        <div>
          <CardText>{comment.comment}</CardText>
          <CardText>
            --{comment.author}, {comment.date.substring(0, 10)}
          </CardText>
          <br></br>
        </div>
      );
    });
    return (
      <div className='row'>
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardImg width='100%' src={dish.image} alt={dish.name} />
            <CardBody>
              <CardTitle>{dish.name}</CardTitle>
              <CardText>{dish.description}</CardText>
            </CardBody>
          </Card>
        </div>
        <div className='col-12 col-md-5 m-1'>
          <Card>
            <CardBody>
              <CardTitle>Comments</CardTitle>
              {commentList}
            </CardBody>
          </Card>
        </div>
      </div>
    );
  }
}

export default DishdetailComponent;
