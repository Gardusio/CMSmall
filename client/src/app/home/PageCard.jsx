import React from 'react';
import { Card, Col } from 'react-bootstrap';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs'

function PageCard({ page }) {
    const navigate = useNavigate();


    /* PASSING THE PAGE AS STATE TO NAVIGATE WILL LEAD TO NOT HAVING THE MOST RECENT PAGE */
    return (
        <Col md={6} className='my-4'>
            <Card className="shadow" onClick={() => navigate(`/pages/${page.id}`)} style={{ cursor: "pointer" }}>
                <Card.Body>
                    <Card.Title>{page.title}</Card.Title>
                    <Card.Text className="text-muted small">{page.author.firstName} {page.author.lastName}</Card.Text>
                </Card.Body>
                <Card.Footer className="text-muted d-flex justify-content-between">
                    <small>{dayjs(page.publishedAt).format("ddd DD/MM/YY")}</small>
                </Card.Footer>
            </Card>
        </Col>
    );
}

export default PageCard;
