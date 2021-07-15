import React from "react";
import { Button } from '@material-ui/core';

export default class Uploader extends React.Component<{}> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: {}) {
    super(props);
    this.fileInput = React.createRef();
  }
  handleSubmit() {
    const file = this.fileInput.current?.files?.[0];
    console.log(file);
  }

  render() {
    return (
    <div>
      <input
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        style={{ display: 'none' }}
        id="raised-button-file"
        type="file"
        ref={this.fileInput}
        onInput={()=>{this.handleSubmit()}}
      />
      <label htmlFor="raised-button-file">
        <Button
          variant="contained" component="span"
          style={{width: "100%", marginTop: "10px"}}
        >
          Upload Spreadsheet
        </Button>
      </label>
    </div>
    );
  }
  }
