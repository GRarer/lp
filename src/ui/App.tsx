import React from 'react';
import { Container, Snackbar} from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { MenuBar } from './menu/Menu';
import Uploader from './common/Uploader';
import { LabelData } from '../service/model';
import { Selector } from './selection/Selector';
import { openItemInNewTab } from '../service/url';
import { Settings } from '../service/customization';
import { saveStoredSettings } from '../service/persistence';
import { readSpreadsheet } from '../service/parse';

type AppState = {
  items?: LabelData[];
  settings: Settings;
  errorSnackbarMessage: string | undefined;
};

type AppProps = {
  defaultSettings: Settings;
};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props);

    this.state = {
      settings: props.defaultSettings,
      items: undefined,
      errorSnackbarMessage: undefined
    };
  }

  private updateSettings(settings: Settings): void {
    this.setState({ settings });
    saveStoredSettings(settings);
  }

  private handleUpload(file: File): void {
    file.arrayBuffer().then((buffer) => {
      this.setState({ items: readSpreadsheet(buffer) });
    }).catch((err) => {
      console.error(err);
      const message = typeof err === "string" ? err : "Error: Unable to process file";
      this.setState({errorSnackbarMessage: message});
    });
  }

  private dismissError(): void {
    this.setState({errorSnackbarMessage: undefined});
  }

  render(): JSX.Element {
    const items = this.state.items;
    const currentStepControl = items
      ?
      <Selector items={items} onSelect={openItemInNewTab} listIcon={this.state.settings.listIcon} />
      :
      <Uploader
        onUpload={this.handleUpload.bind(this)}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        text="Upload Spreadsheet"
      />;

    return (
      <div>
        <MenuBar settings={this.state.settings} onSaveSettings={this.updateSettings.bind(this)} />
        <Container maxWidth="sm">
          <div style={{ marginTop: '10px' }}>
            {currentStepControl}
          </div>
        </Container>
        <Snackbar
          open={!!this.state.errorSnackbarMessage}
          autoHideDuration={6000}
          onClose={()=>{this.dismissError()}}>
          <MuiAlert elevation={6} variant="filled" onClose={() => {this.dismissError()}} severity="error">
            {this.state.errorSnackbarMessage}
          </MuiAlert>
        </Snackbar>
      </div>
    );
  }
}
