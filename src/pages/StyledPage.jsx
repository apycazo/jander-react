import React, { Component } from 'react';
import { Grid, Row, Col, Button } from 'react-bootstrap';
import './StyledPage.css';

export default class StyledPage extends Component {

    render () {
        return <div>
            <h2>Sample styled page with react-bootstrap</h2>
            <Grid>
                <Row className="show-grid">
                    <Col md={8}>
                        <code>Column1, row 1</code>
                    </Col>
                    <Col md={4}>
                        <code>Column2, row 1</code>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col md={4}>
                        <code>Column1, row 2</code>
                    </Col>
                    <Col md={4}>
                        <code>Column2, row 2</code>
                    </Col>
                    <Col md={4}>
                        <code>Column3, row 2</code>
                    </Col>
                </Row>

                <Row className="show-grid">
                    <Col md={4}>
                        <Button>Basic button</Button>
                    </Col>
                    <Col md={4}>
                        <Button bsStyle="primary">Primary button</Button>
                    </Col>
                    <Col md={4}>
                        <Button bsStyle="warning">Warning button</Button>
                    </Col>
                </Row>
            </Grid>
        </div>

         
    }
}