import React, { Component } from 'react';
import { Link, Route, BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';
import App from '../App';
import HomePage from './HomePage';
import MarkdownPage from './MarkdownPage';
import StyledPage from './StyledPage';
import './PageRouter.css';

export default class PageRouter extends Component {

    constructor () {
        super();
        this.state = {
            config: {},
            configLoaded: false
        }

        axios
            .get('/docs/doc-config.json')
            .then(response => {

                // prepare data
                const config = {};
                response.data.pages.forEach(page => {
                    const ref = page.title.split(' ').join('_');
                    page.source = page.source.replace('$docsPath', response.data.docsPath);
                    config[ref] = page;
                });

                this.links = Object.keys(config).map(key => {
                    let entry = config[key];
                    let path = `/doc/${key}`;
                    return <li key={key}><Link to={path}>{entry.title}</Link></li>
                });

                this.setState({
                    config: config,
                    configLoaded: true
                });
            })
            .catch(error => {
                console.log('Axios error: ', error);
                this.setState({
                    configLoaded: true
                });
            });
    }

    render () {

        if (!this.state.configLoaded) {
            return <h3>Loading configuration...</h3>
        } else {
            return <div>  
                <Router> 
                    <div>
                        <h2>Page router</h2>
                        <div>
                            <ul>
                                <li><Link to='/default'>Default page</Link></li>
                                <li><Link to='/home'>Home page</Link></li>
                                <li><Link to='/styled'>Styled page</Link></li>
                                {this.links}
                            </ul>
                        </div>
                        <div>
                            <Route exact path="/" component={App}/>
                            <Route path="/default" component={App}/>
                            <Route path="/home" component={HomePage}/>
                            <Route path="/styled" component={StyledPage}/>
                            <Route path="/doc/:name" render={
                                (props) => <MarkdownPage {...props} config={this.state.config}/>
                            }/>
                        </div>
                    </div>
                </Router>
            </div>
        }
    }
}
