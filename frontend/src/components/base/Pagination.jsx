import React, { Component } from "react";


class Pagination extends Component {
    getNumberFromPage(evt) {
        const page = evt.target.innerHTML - 1;
        this.props.setPage(page);
    }

    render() {
        const pages = [];
        const pageButtonCount = 5;
        for (let i = +this.props.page - pageButtonCount; i < +this.props.page + pageButtonCount; i++) {
            if ((i > -1) && (i < this.props.pages)) {
                pages.push(<li key={i} className={ i === this.props.page ? "page-item active" : "page-item"}>
                    <div onClick={e => this.getNumberFromPage(e)} className="page-link" value={ i + 1 }>{ i + 1 }</div>
                </li>);
            }
        }

        return (
            <div className="row justify-content-md-center">
                <div className="container">
                    <div className="row justify-content-md-center">
                        <nav>
                            <ul className="pagination">
                                <li className={this.props.page <= 0 ? "page-item disabled" : "page-item"}>
                                    <div onClick={() => this.props.setPage(this.props.page - 1)} className="page-link">Previous</div>
                                </li>
                                {pages}
                                <li className={this.props.page >= this.props.pages - 1 ? "page-item disabled" : "page-item"}>
                                    <div className="page-link" onClick={() => this.props.setPage(this.props.page + 1)}>Next</div>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className="row justify-content-md-center">
                    <p className="text-justify">Page count {this.props.pages}</p>
                </div>
            </div>
        );
    }
}

export default Pagination;
