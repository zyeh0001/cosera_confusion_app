import React from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
} from 'reactstrap';
import { Link } from 'react-router-dom';

function RenderDish({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <Card>
        <CardImg width='100%' src={dish.image} alt={dish.name} />
        <CardBody>
          <CardTitle>{dish.name}</CardTitle>
          <CardText>{dish.description}</CardText>
        </CardBody>
      </Card>
    </div>
  );
}

function RenderComments({ comments }) {
  const commentList = comments.map((comment) => {
    return (
      <>
        <CardText>{comment.comment}</CardText>
        <CardText>
          --{comment.author},{' '}
          {new Intl.DateTimeFormat('en-US', {
            year: 'numeric',
            month: 'short',
            day: '2-digit',
          }).format(new Date(Date.parse(comment.date)))}
        </CardText>
        <br></br>
      </>
    );
  });
  if (comments != null)
    return (
      <div className='col-12 col-md-5 m-1'>
        <Card>
          <CardBody>
            <CardTitle>Comments</CardTitle>
            {commentList}
          </CardBody>
        </Card>
      </div>
    );
  else return <></>;
}

const DishdetailComponent = (props) => {
  if (props.dish != null)
    return (
      <div className='container'>
        <div className='row'>
          <Breadcrumb>
            <BreadcrumbItem>
              <Link to='/menu'>Menu</Link>
            </BreadcrumbItem>
            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
          </Breadcrumb>
          <div className='col-12'>
            <h3>{props.dish.name}</h3>
            <hr />
          </div>
          <div className='row'>
            <RenderDish dish={props.dish} />
            <RenderComments comments={props.comments} />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishdetailComponent;
