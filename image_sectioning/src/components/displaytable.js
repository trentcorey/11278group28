import React, {Component} from 'react'
import { JsonToTable } from "react-json-to-table";

class DisplayTable extends Component {


  constructor(props) {
    super(props);
    this.getHeader = this.getHeader.bind(this)
  }

  getHeader = function() {
    var preExistingData = JSON.parse(sessionStorage.getItem('sectionInfo'))
    if (preExistingData[0] != null) {
      var keys = Object.keys(preExistingData[0])
      return keys.map((key, index)=>{
        return <th key={key}>{key}</th>
      })
    } else {
      return null
    }
    
  }
  
  getRowsData = function() {
    var preExistingData = JSON.parse(sessionStorage.getItem('sectionInfo'))
    var keys = Object.keys(preExistingData[0]);
    return preExistingData.map((row, index)=> {
      return <tr key = {index}><RenderRow key={index} data={row} keys={keys}/></tr>
    })
  }

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>{this.getHeader()}</tr>
          </thead>
          <tbody>
            {this.getRowsData()}
          </tbody>
        </table>
      </div>
    )
  }
}

const RenderRow = (props) => {
  return props.keys.map((key, index)=>{
    return <td key = {props.data[key]}>{props.data[key]}</td>
  })
}
export default DisplayTable