import React from "react";
import { Button } from '@material-ui/core';
import { readSpreadsheet } from "../service/parse";
import { RecordLabel } from "../service/model";
import { v4 as generateUUID } from 'uuid';

type UploaderProps = {
  onUpload: (file: File) => void,
  text: string,
  accept: string,
}

type UploaderState = {
  uniqueInputId: string
}

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<UploaderProps>) {
    super(props);
    this.fileInput = React.createRef();

    // we need an id to match labels with input buttons, and it must be unique to each uploader instance
    this.state = {uniqueInputId: `file-input-${generateUUID()}`}
  }
  handleSubmit() {
    const currentInput = this.fileInput.current;
    if (currentInput === null) {
      alert("file not found!"); // TODO in-app modal instead of alert
      return;
    }
    const file = currentInput.files?.[0];
    if (!file) {
      alert("file not found!"); // TODO in-app modal instead of alert
      return;
    }
    currentInput.value="";
    this.props.onUpload(file);
  }

  render() {
    return (
      <>
        <input
          accept={this.props.accept}
          style={{ display: 'none' }}
          id={this.state.uniqueInputId}
          type="file"
          ref={this.fileInput}
          onInput={()=>{this.handleSubmit()}}
        />
        <label htmlFor={this.state.uniqueInputId}>
          <Button style={{width: "100%"}}
            variant="contained" component="span"
          >
            {this.props.text}
          </Button>
        </label>
      </>
      );
    }
  }
