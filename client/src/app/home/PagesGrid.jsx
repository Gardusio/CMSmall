import React from 'react';
import { Container, Row } from 'react-bootstrap';
import PageCard from './PageCard';

function PagesGrid(props) {

    return (
        <Container>
            <Row>
                {props.pages.map((page) => (
                    <PageCard key={page.id} page={page} />
                ))}
            </Row>
        </ Container >
    );
}

export default PagesGrid;
