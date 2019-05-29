import React, { Component } from "react";
import "../../style/newOfferPage/index.scss";

class ContentList extends Component {
    changeContentType(event) {
        const id = parseInt(event.target.id.split("_")[2], 10);
        const contentLocal = this.props.content;
        contentLocal[id] = { contentTypeValue: parseInt(event.target.value, 10), contentValue: this.props.resources[0].requirement.id, contentCount: 0 };
        this.props.updateContent(contentLocal);
    }

    changeContentElement(event) {
        const id = parseInt(event.target.id.split("_")[2], 10);
        const contentLocal = this.props.content;
        contentLocal[id] = {
            contentTypeValue: contentLocal[id].contentTypeValue,
            contentValue: parseInt(event.target.value, 10),
            contentCount: 0
        };
        this.props.updateContent(contentLocal);
    }

    addContentField() {
        const contentLocal = this.props.content;
        contentLocal.push(this.props.content[0]);
        this.props.updateContent(contentLocal);
    }

    removeContentField(event) {
        const id = parseInt(event.target.id.split("_")[4], 10);
        const contentLocal = this.props.content;
        contentLocal.splice(id, 1);
        this.props.updateContent(contentLocal);
    }


    saveCount(event) {
        const id = parseInt(event.target.id.split("_")[2], 10);

        const contentLocal = this.props.content;
        const newItem = {
            contentTypeValue: contentLocal[id].contentTypeValue,
            contentValue: contentLocal[id].contentValue,
            contentCount: event.target.value
        };

        contentLocal.splice(id, 1);
        contentLocal.splice(id, 0, newItem);
        this.props.updateContent(contentLocal);
    }

    render() {
        let contentTypeField = (id) => {
            const btn = id === 0 ? <input className="form-control" type="button"
                id={"reward_row_add_btn_" + id + "_id"} value="add content" onClick={() => this.addContentField()}/> :
                <input className="form-control" type="button" id={"reward_row_remove_btn_" + id + "_id"}
                    value="remove" onClick={this.removeContentField.bind(this)} />;

            const result = (
                <tr key={"content_id:" + id} className={id === 0 ? "border_bottom" : ""}>
                    <td>
                        <select className="custom-select" id={"reward_type_" + id + "_id"}
                            onChange={this.changeContentType.bind(this)} value={this.props.content[id].contentTypeValue}>
                            <option value={0}>Select value</option>
                            {this.props.resources.map(item => (
                                <option key={item.requirement.id} value={item.requirement.id}>{item.requirement.name.toLowerCase()}</option>
                            ))}
                        </select>
                    </td>
                    <td>
                        <select className="custom-select" id={"reward_element_" + id + "_id"}
                            onChange={this.changeContentElement.bind(this)} value={this.props.content[id].contentValue}>
                            {parseInt(this.props.content[id].contentTypeValue, 10) === 0 ? <option>none</option> :
                                this.props.resources.find(element => element.requirement.id ===
                                        parseInt(this.props.content[id].contentTypeValue, 10)).resources.map(resource => (
                                    <option key={resource.Id}
                                        value={resource.Id}>{resource.Name + " (content id: " + resource.Id + ")"}</option>
                                ))}
                        </select>
                    </td>

                    <td key={this.props.content[id].contentCount}>
                        <input className="form-control" type="number" id={"reward_count_" + id + "_id"}
                            defaultValue={this.props.content[id].contentCount}
                            onBlur={this.saveCount.bind(this)} />
                    </td>
                    <td>
                        {btn}
                    </td>
                </tr>
            );

            return result;
        };

        contentTypeField = contentTypeField.bind(this);

        return (
            <div>
                <div className="row justify-content-md-center">
                    <h5 className="mt-5">Content</h5>
                </div>

                <div className="form-row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Type</th>
                                <th scope="col">Element</th>
                                <th scope="col">Count</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.content.map((item, index) => (contentTypeField(index)))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ContentList;
