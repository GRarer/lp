import React from 'react';
import { Container } from '@material-ui/core';
import { MenuBar } from './Menu';
import Uploader from './Uploader';
import { LabelData } from '../service/model';
import { Selector } from './Selector';
import { openItemInNewTab } from '../service/url';
import { Settings } from '../service/customization';
import { saveStoredSettings } from '../service/persistence';
import { readSpreadsheet } from '../service/parse';

type AppState = {
  items?: LabelData[];
  settings: Settings;
};

type AppProps = {
  defaultSettings: Settings;
};

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props);

    this.state = {
      settings: props.defaultSettings,
      items: undefined
      // TODO remove fake data
      // step: {step: "select", items: fakeData}
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
      // TODO better error handling
      console.error(err);
    });
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
      </div>
    );
  }
}
