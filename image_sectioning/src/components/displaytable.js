import React, {Component} from 'react'

class DisplayTable extends Component {
  state = {deletedNum: 0}

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

  refactorSectionData = function(sectionData) {
    var index = 0;
    for (index; index < sectionData.length; index++) {
      if (sectionData[index].SectionID !== index) {
        sectionData[index].SectionID = index;
      }
    }
    sessionStorage.setItem('sectionInfo', JSON.stringify(sectionData));
  }
  
  deleteRow = function(row) {
    var sectionData = JSON.parse(sessionStorage.getItem('sectionInfo'));
    sectionData.splice(row.SectionID, 1);
    this.refactorSectionData(sectionData);
    
    var updateData = this.state.deletedNum + 1;
    this.setState({deletedNum: updateData})
  }

  getRowsData = function() {
    var preExistingData = JSON.parse(sessionStorage.getItem('sectionInfo'))
      if (preExistingData[0] != null) {
        var keys = Object.keys(preExistingData[0]);
        return preExistingData.map((row, index)=> {
          return <tr key = {index}><RenderRow key={index} data={row} keys={keys}/>
                  <td><button className="btn" onClick={() => {this.deleteRow(row)}}>Delete</button></td>
                </tr>
          })
      } else {
        return null;
      }
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
    return <td>{props.data[key]}</td>
  })
}



export default DisplayTable