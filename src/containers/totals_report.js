import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class TotalsReport extends Component {
    constructor() {
        super();

        this.state = {
            type: '',
            status: ''
        };

        this.setType = this.setType.bind(this);
        this.setStatus = this.setStatus.bind(this);
    }

    returnUniqueValues(field) { // Remove duplicates from data set
        let set = new Set();
        for (let i = 0; i < this.props.deviceData.length; i++) {
            if (field == 'timestamp') {
                set.add(this.props.deviceData[i][field].slice(0, 10));
            } else {
                set.add(this.props.deviceData[i][field]);
            }
        }
        return Array.from(set);
    }

    renderOptions(optionsArray) {
        return optionsArray.map(option => {
            if (!option) return; //don't create a dropdown entry if empty
            return (
                <option key={option} value={option}>{option}</option>
            );
        });
    }

    setType(e) {
        this.setState({type: e.target.value});
    }

    setStatus(e) {
        this.setState({status: e.target.value});
    }

    countTotalDevices(date) {
        let deviceSet = new Set(); // use set to remove duplicate device mentions

        this.props.deviceData.forEach(data => {
            if (date == data.timestamp.slice(0, 10)
                && (this.state.status == '' || this.state.status == data.status)
                && (this.state.type == '' || this.state.type == data.type)) {
                deviceSet.add(data.id);
            }
        });

        return (
            <td>{deviceSet.size}</td>
        );
    }

    renderRows(dateArray) {
        return dateArray.map(date =>{
            return (
                <tr key={date}>
                    <td>{date}</td>
                    {this.countTotalDevices(date)}
                </tr>
            );
        });
    }

    render() {
        let typeArray = this.returnUniqueValues('type');
        let statusArray = this.returnUniqueValues('status');
        let dateArray = this.returnUniqueValues('timestamp').slice(0, 30); //restrict to thirty days

        return (
            <div>
                <Link to="/">Back</Link><br />
                {'Type: '}
                <select onChange={this.setType}>
                    <option value=''></option>
                    {this.renderOptions(typeArray)}
                </select>
                {'Status: '}
                <select onChange={this.setStatus}>
                    <option value=''></option>
                    {this.renderOptions(statusArray)}
                </select>
                <h3>Totals Report</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Day</th>
                            <th>Total Devices</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.renderRows(dateArray)}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {deviceData: state.deviceData};
}

export default connect(mapStateToProps)(TotalsReport);
