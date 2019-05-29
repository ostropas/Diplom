import React, { Component } from "react";
import "../../style/newOfferPage/index.scss";

class ConditionList extends Component {
    changeKindOfferSelection(event) {
        const id = parseInt(event.target.id.split("_")[4], 10);
        const conditionsLocal = this.props.conditions;
        conditionsLocal[id] = { kindOfferSelection: parseInt(event.target.value, 10), minValue: 0, maxValue: 0 };
        this.props.updateConditions(conditionsLocal);
    }

    changeSelectionMinValue(event) {
        const id = parseInt(event.target.id.split("_")[2], 10);
        const conditionsLocal = this.props.conditions;
        conditionsLocal[id] = {
            kindOfferSelection: conditionsLocal[id].kindOfferSelection,
            minValue: event.target.value,
            maxValue: conditionsLocal[id].maxValue
        };
        this.props.updateConditions(conditionsLocal);
    }

    changeSelectionMaxValue(event) {
        const id = parseInt(event.target.id.split("_")[2], 10);
        const conditionsLocal = this.props.conditions;
        conditionsLocal[id] = {
            kindOfferSelection: conditionsLocal[id].kindOfferSelection,
            minValue: conditionsLocal[id].minValue,
            maxValue: event.target.value
        };
        this.props.updateConditions(conditionsLocal);
    }

    addSelectionField() {
        const conditionsLocal = this.props.conditions;
        conditionsLocal.push(this.props.conditions[0]);
        this.props.updateConditions(conditionsLocal);
    }

    removeSelectionField(event) {
        const id = parseInt(event.target.id.split("_")[4], 10);
        const conditionsLocal = this.props.conditions.slice();
        conditionsLocal.splice(id, 1);
        this.props.updateConditions(conditionsLocal);
    }

    render() {
        let conditionTypeField = (id) => {
            const btn = id === 0 ? <input className="form-control" type="button" id={"reward_row_add_btn_" + id + "_id"}
                value="add condition" onClick={() => this.addSelectionField()}/> :
                <input className="form-control" type="button" id={"reward_row_remove_btn_" + id + "_id"}
                    value="remove" onClick={this.removeSelectionField.bind(this)} />;

            let minValue = (minValId) => {
                if (this.props.conditions[minValId].kindOfferSelection === 6) {
                    return (
                        <td>
                            <select className="custom-select" id={"selection_min_" + minValId + "_id"}
                                onChange={this.changeSelectionMinValue.bind(this)}
                                value={this.props.conditions[minValId].minValue}>
                                <option></option>
                                {this.props.allCosts.map(item => (
                                    <option key={item.id} value={item.tier}>{item.tier}</option>
                                ))}
                            </select>
                        </td>
                    );
                }

                return (<td>
                    <div key={this.props.conditions[id].minValue}>
                        <input onBlur={this.changeSelectionMinValue.bind(this)} defaultValue={this.props.conditions[id].minValue}
                            className="form-control" type="number" id={"selection_min_" + id + "_id"}></input>
                    </div>
                </td>);
            };

            let maxValue = (maxValId) => {
                if (this.props.conditions[maxValId].kindOfferSelection === 6) {
                    return (
                        <td>
                            <select className="custom-select" id={"selection_max_" + maxValId + "_id"}
                                onChange={this.changeSelectionMaxValue.bind(this)}
                                value={this.props.conditions[maxValId].maxValue}>
                                <option></option>
                                {this.props.allCosts.map(item => (
                                    <option key={item.id} value={item.tier}>{item.tier}</option>
                                ))}
                            </select>
                        </td>
                    );
                }

                return (<td>
                    <div key={this.props.conditions[id].maxValue}>
                        <input onBlur={this.changeSelectionMaxValue.bind(this)} className="form-control" type="number"
                            defaultValue={this.props.conditions[id].maxValue} id={"selection_max_" + id + "_id"}></input>
                    </div>
                </td>);
            };
            maxValue = maxValue.bind(this);
            minValue = minValue.bind(this);

            const result = (
                <tr key={"condition_id:" + id} className={id === 0 ? "border_bottom" : ""}>
                    <td>
                        <select className="custom-select" id={"selection_offer_selection_kind_" + id + "_id"}
                            onChange={this.changeKindOfferSelection.bind(this)} value={this.props.conditions[id].kindOfferSelection}>
                            <option value={0}>Select value</option>
                            {this.props.kindsOfAllSelections.map(item => (
                                <option key={item.id} value={item.id}>{item.title.toLowerCase()}</option>
                            ))}
                        </select>
                    </td>

                    {minValue(id)}
                    {maxValue(id)}
                    <td>
                        {btn}
                    </td>
                </tr>
            );

            return result;
        };

        conditionTypeField = conditionTypeField.bind(this);

        return (
            <div>
                <div className="row justify-content-md-center">
                    <h5 className="mt-5">Conditions</h5>
                </div>

                <div className="form-row">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Kind of offer selection</th>
                                <th scope="col">Minimum value (included)</th>
                                <th scope="col">Maximim value (included)</th>
                                <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.props.conditions.map((item, index) => (conditionTypeField(index)))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default ConditionList;
