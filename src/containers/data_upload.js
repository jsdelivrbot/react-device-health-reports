import React, { Component } from 'react';
import ReactFileReader from 'react-file-reader';
import { uploadData } from '../actions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class DataUpload extends Component {
    constructor(props) {
        super(props);

        this.handleFiles = this.handleFiles.bind(this);
    }

    handleFiles(files) {
        let reader = new FileReader();
        let headers, rawData;
        const processedData = [];

        reader.onload = () => {
            // Use reader.result
            headers = reader.result.split('\n')[0].split(',');
            rawData = reader.result.split('\n').slice(1);

            for (let i = 0; i < rawData.length; i++) {
                if (rawData[i] != '') {
                    let entry = rawData[i].split(',');
                    let obj = {};

                    for (let j = 0 ; j < headers.length ; j++) {
                        obj[headers[j]] = entry[j];
                    }

                    processedData.push(obj);
                }
            }

            this.props.uploadData(processedData);
        };

        reader.readAsText(files[0]);
    }

    render() {
        return (
            <div>
                <ReactFileReader handleFiles={this.handleFiles} fileTypes={'.csv'}>
                    <button className='btn upload'>Upload</button>
                </ReactFileReader>
                <Link to="/report1">Most Popular Devices Report</Link><br />
                <Link to="/report2">Device Totals Report</Link>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({uploadData: uploadData}, dispatch);
}

export default connect(null, mapDispatchToProps)(DataUpload);
