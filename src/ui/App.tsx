import React from 'react';
import { MenuBar } from './Menu';
import Uploader from './Uploader';
import { Container } from '@material-ui/core';
import { RecordLabel } from '../service/model';
import { Selector } from './Selector';
import { openItemInNewTab } from '../service/url';
import { defaultSettings, Settings } from '../service/customization';
import { loadStoredSettings, saveStoredSettings } from '../service/persistence';
import { readSpreadsheet } from '../service/parse';

// TODO remove fake data
const fakeData: RecordLabel[] = [
  {
    artist: "Speedy Ortiz",
    title: "No Below",
    releaseDate: "2013",
    score: "3.5",
    _uuid: "1"
  },
  {
    artist: "Watch You Sleep",
    title: "Girl in Red",
    releaseDate: "2019",
    _uuid: "9"
  },
  {
    artist: "Death with Dignity",
    title: "Sufjan Stevens",
    releaseDate: "2015",
    _uuid: "3"
  },
  {
    artist: "Before The World Was Big",
    title: "Girlpool",
    releaseDate: "2015",
    _uuid: "100"
  },
  {
    artist: "Boston",
    acquisition: "6/22/21",
    discogsLog: "Yes",
    genre: "Rock",
    notes: "Per Wikipedia … “All eight songs—most commonly the album's A-side—are in constant rotation on classic rock radio.”",
    price: "$23.69",
    releaseDate: "1976",
    score: "5",
    source: "New - Barnes & Nobel",
    thoughts: "It is my favorite album and the album I used to teach myself to play the drums. ",
    title: "Boston - 2021 Reissue",
    _uuid: "c1a97d4f-8c27-4f44-a839-5acb408c931a",
  }
]

type AppStep = {
  step: "upload"
} | {
  step: "select",
  items: RecordLabel[],
}

type AppState = {
  step: AppStep,
  settings: Settings,
  showSettingsDialog: boolean
}

type AppProps = {
  defaultSettings: Settings
}

export default class App extends React.Component<AppProps, AppState> {
  constructor(props: Readonly<AppProps>) {
    super(props);

    this.handleUpload = this.handleUpload.bind(this);
    this.updateSettings = this.updateSettings.bind(this);

    this.state = {
      settings: props.defaultSettings,
      showSettingsDialog: false,
      step: { step: "upload" }
      // TODO remove fake data
      //step: {step: "select", items: fakeData}
    };
  }

  private updateSettings(settings: Settings) {
    this.setState({settings});
    saveStoredSettings(settings);
  }

  private handleUpload(file: File): void {
    file.arrayBuffer().then((buffer) => {
      this.setState({
        step: { step: "select", items: readSpreadsheet(buffer)}
      });
    }).catch(err => {
      // TODO better error handling
      console.error(err);
    })

  }

  render(): JSX.Element {
    const currentStep = this.state.step;
    const currentStepControl = currentStep.step === "upload"
      ? <Uploader
        onUpload={this.handleUpload}
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        text="Upload Spreadsheet"
        />
      : <Selector items={currentStep.items} onSelect={openItemInNewTab} listIcon={this.state.settings.listIcon}/>

    return (
      <div>
        <MenuBar settings = {this.state.settings} onSaveSettings={this.updateSettings}/>
        <Container maxWidth="sm">
          <div style={{marginTop: "10px"}}>
            {currentStepControl}
          </div>

        </Container>
      </div>
    );
  }
}



