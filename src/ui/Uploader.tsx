import React from "react";
import { Button } from '@material-ui/core';
import { readSpreadsheet } from "../service/parse";
import { RecordLabel } from "../service/model";

type UploaderProps = {
  onUpload: (items: RecordLabel[]) => void
}

export default class Uploader extends React.Component<UploaderProps> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<UploaderProps>) {
    super(props);
    this.fileInput = React.createRef();
  }
  handleSubmit() {
    const file = this.fileInput.current?.files?.[0];
    console.log(file);
    if (!file) {
      alert("file not found!"); // TODO in-app modal instead of alert
      return;
    }
    file.arrayBuffer().then((buffer) => {
      const records = readSpreadsheet(buffer);
      this.props.onUpload(records);
    }).catch((err) => {
      // TODO better error handing;
      console.error(err);
    })
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
