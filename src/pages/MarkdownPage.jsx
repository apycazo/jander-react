import React, { Component } from 'react';
import axios from 'axios';
import marked from 'marked';
import renderHTML from 'react-render-html';
import hljs from 'highlight.js';
import 'highlight.js/styles/darcula.css';
// import MarkdownRenderer from '../components/MarkdownRenderer';

marked.setOptions({
    highlight: (code, language) => language
      ? hljs.highlight(language, code).value
      : hljs.highlightAuto(code).value
  });

export default class MarkdownPage extends Component {

    constructor () {
        super();
        this.state = {
            content: 'Pending to render',
            rendered: ''
        }
    }

    updateContent (src) {
        if (this.state.rendered !== src) {
            axios
                .get(src)
                .then(response => {
                    this.setState({
                        // content: response.data,
                        content: renderHTML(marked(response.data)),
                        rendered: src
                    });
                })
                .catch(error => {
                    this.setState({
                        content: 'Failed to load page',
                        rendered: src
                    });
                });
        }
    }

    render () {

        const name = this.props.match.params.name;

        if (Object.keys(this.props.config).length === 0) {
            return <h2>Config not found</h2>
        } else {
            const page = this.props.config[name];
            if (page === undefined) {
                return <h2>Page name '{name}' found to be undefined</h2>
            } else {
                this.updateContent(page.source);
                return <div>
                    <h2>{page.title}</h2>
                    <p>Source: {page.source}</p>
                    {this.state.content}
                    {/* <MarkdownRenderer text={this.state.content}/> */}
                </div>
            }
        }
    }

} 