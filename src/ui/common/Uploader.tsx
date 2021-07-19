import React from 'react';
import { Button, Snackbar } from '@material-ui/core';
import { v4 as generateUUID } from 'uuid';
import MuiAlert from '@material-ui/lab/Alert';

type UploaderProps = {
  onUpload: (file: File) => void;
  text: string;
  accept: string;
};

type UploaderState = {
  uniqueInputId: string;
  errorSnackbarMessage: string | undefined;
};

export default class Uploader extends React.Component<UploaderProps, UploaderState> {
  fileInput: React.RefObject<HTMLInputElement>;

  constructor(props: Readonly<UploaderProps>) {
    super(props);
    this.fileInput = React.createRef();

    // we need an id to match labels with input buttons, and it must be unique to each uploader instance
    this.state = { uniqueInputId: `file-input-${generateUUID()}`, errorSnackbarMessage: undefined };
  }

  private handleSubmit(): void {
    const currentInput = this.fileInput.current;
    if (currentInput === null) {
      return;
    }
    const file = currentInput.files?.[0];
    if (!file) {
      this.setState({ errorSnackbarMessage: 'File not found!' });
      return;
    }
    currentInput.value = '';
    this.props.onUpload(file);
  }

  private dismissError(): void {
    this.setState({ errorSnackbarMessage: undefined });
  }

  render(): JSX.Element {
    return (
      <>
        <input
          accept={this.props.accept}
          style={{ display: 'none' }}
          id={this.state.uniqueInputId}
          type="file"
          ref={this.fileInput}
          onInput={() => { this.handleSubmit(); }}
        />
        <label htmlFor={this.state.uniqueInputId}>
          <Button
            style={{ width: '100%' }}
            variant="contained"
            component="span"
          >
            {this.props.text}
          </Button>
        </label>
        <Snackbar
          open={!!this.state.errorSnackbarMessage}
          autoHideDuration={6000}
          onClose={()=>{ this.dismissError(); }}>
          <MuiAlert elevation={6} variant="filled" onClose={() => { this.dismissError(); }} severity="error">
            {this.state.errorSnackbarMessage}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
}
