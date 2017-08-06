import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class PopularityReport extends Component {
    constructor(props) {
        super(props);

        this.state = {date: ''};

        this.setDate = this.setDate.bind(this);
        this.filterDevices = this.filterDevices.bind(this);
        this.countDeviceMentions = this.countDeviceMentions.bind(this);
        this.sortDevices = this.sortDevices.bind(this);
    }

    renderDates(dateSet) {
        const dateArray = Array.from(dateSet); //convert set to array
        return dateArray.map(date => {
            return (
                <option key={date} value={date}>{date}</option>
            );
        });
    }

    setDate(e) {
        this.setState({date: e.target.value});
    }

    filterDevices() {
        //create filteredArray for current week
        const filteredArray = this.props.deviceData.filter(data => {
            return data.timestamp.slice(0, 10) == this.state.date;
        });
        //create filteredArray for week before
        const dateArray = this.state.date.split('-');
        let lastWeek = new Date(parseInt(dateArray[0]), parseInt(dateArray[1]) - 1, parseInt(dateArray[2]) - 6).toISOString().slice(0, 10);
        const filteredArrayLastWeek = this.props.deviceData.filter(data => {
            return data.timestamp.slice(0, 10) == lastWeek;
        });

        const deviceMentions = this.countDeviceMentions(filteredArray);
        const deviceMentionsLastWeek = this.countDeviceMentions(filteredArrayLastWeek);

        return this.sortDevices(deviceMentions, deviceMentionsLastWeek);
    }

    countDeviceMentions(filteredArray) {
        const deviceMentions = {};
        for (let i = 0; i < filteredArray.length; i++) {
            let num = filteredArray[i]['id'];
            deviceMentions[num] = deviceMentions[num] ? deviceMentions[num] + 1 : 1;
        }
        return deviceMentions;
    }

    sortDevices(deviceMentions, deviceMentionsLastWeek) {
        const sortedDeviceMentions = [];
        for (let device in deviceMentions) {
            sortedDeviceMentions.push([device, deviceMentions[device]]);
        }
        sortedDeviceMentions.sort(function(a,b) {
            return b[1] - a[1];
        });

        return sortedDeviceMentions.slice(0, 10).map(device => {
            return (
                <tr key={device[0]}>
                    <td>{device[0]}</td>
                    <td>{device[1]}</td>
                    <td>{deviceMentionsLastWeek[device[0]] ? Math.round((device[1] / deviceMentionsLastWeek[device[0]] - 1) * 100) + '%' : 'No occurrences seven days ago'}</td>
                </tr>
            );
        });
    }

    render() {
        let dateSet = new Set();
        for (let i = 0; i < this.props.deviceData.length; i++) {
            dateSet.add(this.props.deviceData[i].timestamp.slice(0, 10));
        }
        return (
            <div>
                <Link to="/">Back</Link><br />
                {'Date: '}
                <select onChange={this.setDate}>
                    <option value=''></option>
                    {this.renderDates(dateSet)}
                </select>
                <h3>Most Popular Devices{this.state.date ? ` for ${this.state.date}` : ''}</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Device</th>
                            <th>Occurrences</th>
                            <th>Week on week change</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.date ? this.filterDevices() : ''}
                    </tbody>
                </table>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {deviceData: state.deviceData};
}

export default connect(mapStateToProps)(PopularityReport);
