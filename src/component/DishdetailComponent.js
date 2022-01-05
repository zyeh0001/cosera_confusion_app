import React, { Component } from 'react';
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Breadcrumb,
  BreadcrumbItem,
  Button,
  Row,
  Modal,
  ModalBody,
  ModalHeader,
  Col,
  Label,
} from 'reactstrap';
import { Link } from 'react-router-dom';
import { Control, LocalForm, Errors } from 'react-redux-form';
import LoadingComponent from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !val || val.length <= len;
const minLength = (len) => (val) => val && val.length >= len;
export class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    };
    this.toggleModal = this.toggleModal.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen,
    });
  }

  handleSubmit(values) {
    console.log('current form is' + JSON.stringify(values));
    alert(
      'The comment dishes is: ' +
        this.props.dishId +
        '  current form is' +
        JSON.stringify(values)
    );
    this.props.postComment(
      this.props.dishId,
      values.rating,
      values.author,
      values.comment
    );
    this.toggleModal();
  }

  render() {
    return (
      <>
        <Button color='secondary' outline onClick={this.toggleModal}>
          <span className='fa fa-pencil fa-lg'>Submit Comment</span>
        </Button>

        <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
          <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
          <ModalBody>
            <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
              <Row className='form-group'>
                <Col md={12}>
                  <Label htmlFor='rating'>Rating</Label>
                  <Control.select
                    model='.rating'
                    id=' rating'
                    name='rating'
                    className='form-control'
                  >
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>\
                  </Control.select>
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={12}>
                  <Label md={12} htmlFor='name'>
                    Your Name
                  </Label>
                  <Control.text
                    model='.author'
                    id=' author'
                    name='author'
                    className='form-control'
                    validators={{
                      required,
                      maxLength: maxLength(15),
                      minLength: minLength(3),
                    }}
                  ></Control.text>
                </Col>
                <Errors
                  className='text-danger'
                  model='.author'
                  show='touched'
                  messages={{
                    required: 'Required',
                    minLength: 'Must be greater than 2 charactor',
                    maxLength: 'Must be 15 charactor or less',
                  }}
                />
              </Row>
              <Row className='form-group'>
                <Label htmlFor='comment' md={12}>
                  Comment
                </Label>
                <Col md={12}>
                  <Control.textarea
                    model='.comment'
                    id='comment'
                    name='comment'
                    rows='6'
                    className='form-control'
                  ></Control.textarea>
                </Col>
              </Row>
              <Row className='form-group'>
                <Col md={{ size: 10 }}>
                  <Button type='submit' color='primary'>
                    Sumbit
                  </Button>
                </Col>
              </Row>
            </LocalForm>
          </ModalBody>
        </Modal>
      </>
    );
  }
}

function RenderDish({ dish }) {
  return (
    <div className='col-12 col-md-5 m-1'>
      <FadeTransform
        in
        transformProps={{ exitTransform: 'scale(0.5) translateY(-50%)' }}
      >
        <Card>
          <CardImg width='100%' src={baseUrl + dish.image} alt={dish.name} />
          <CardBody>
            <CardTitle>{dish.name}</CardTitle>
            <CardText>{dish.description}</CardText>
          </CardBody>
        </Card>
      </FadeTransform>
    </div>
  );
}

function RenderComments({ comments, postComment, dishId }) {
  const commentList = comments.map((comment) => {
    return (
      <Fade in>
        <div key={comment.id}>
          <CardText>{comment.comment}</CardText>
          <CardText>
            --{comment.author},{' '}
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: '2-digit',
            }).format(new Date(Date.parse(comment.date)))}
          </CardText>
        </div>
      </Fade>
    );
  });
  if (comments != null)
    return (
      <div className='col-12 col-md-5 m-1'>
        <Card>
          <CardBody>
            <CardTitle>Comments</CardTitle>
            <Stagger in>{commentList}</Stagger>
            <CommentForm dishId={dishId} postComment={postComment} />
          </CardBody>
        </Card>
      </div>
    );
  else return <></>;
}

const DishdetailComponent = (props) => {
  if (props.isLoading) {
    return (
      <div className='container'>
        <div className='row'>
          <LoadingComponent />
        </div>
      </div>
    );
  } else if (props.errMess) {
    return (
      <div className='container'>
        <div className='row'>
          <h4>{props.errMess}</h4>
        </div>
      </div>
    );
  } else if (props.dish != null)
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
            <RenderComments
              comments={props.comments}
              dishId={props.dish.id}
              postComment={props.postComment}
            />
          </div>
        </div>
      </div>
    );
  else return <div></div>;
};

export default DishdetailComponent;
