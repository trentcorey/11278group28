import React, {Component} from 'react'
import { JsonToTable } from "react-json-to-table";

class DisplayTable extends Component {

  render() {
    var preExistingData = JSON.parse(sessionStorage.getItem('sectionInfo'))
    return (
      <div>
        <JsonToTable json = {preExistingData} />
      </div>
    )
  }
}
    
export default DisplayTable