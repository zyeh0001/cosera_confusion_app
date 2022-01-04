import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardSubtitle,
  CardTitle,
  CardText,
} from 'reactstrap';
import LoadingComponent from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';

function RenderCard({ item, isLoading, errMess }) {
  if (isLoading) {
    return <LoadingComponent />;
  } else if (errMess) {
    return <h4>{errMess}</h4>;
  } else {
    return (
      <Card>
        <CardImg src={baseUrl + item.image} alt={item.name} />
        <CardBody>
          <CardTitle>{item.name}</CardTitle>
          {item.designation ? (
            <CardSubtitle>{item.designation}</CardSubtitle>
          ) : null}
          <CardText>{item.description}</CardText>
        </CardBody>
      </Card>
    );
  }
}

export default function HomeComponent(props) {
  return (
    <div className='container'>
      <div className='row align-items-start'>
        <div className='col-12 col-md m-1'>
          <RenderCard
            item={props.dish}
            isLoading={props.dishesLoading}
            ErrMess={props.dishesaErrMess}
          />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard
            item={props.promotion}
            isLoading={props.promosLoading}
            ErrMess={props.promosErrMess}
          />
        </div>
        <div className='col-12 col-md m-1'>
          <RenderCard item={props.leader} />
        </div>
      </div>
    </div>
  );
}
