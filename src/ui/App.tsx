import React from 'react';
import { LPAppBar } from './Menu';
import Uploader from './Uploader';
import { Container } from '@material-ui/core';
import { RecordLabel } from '../service/model';
import { Selector } from './Selector';
import { openItemInNewTab } from '../service/url';

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

export default class App extends React.Component<{}, {step: AppStep}> {
  constructor(props: {}) {
    super(props);

    this.handleUpload = this.handleUpload.bind(this);

    this.state = {step: { step: "upload" }};

    // TODO remove fake data
    this.state = {step: {step: "select", items: fakeData}};
  }

  private handleUpload(items: RecordLabel[]): void {
    this.setState({
      step: { step: "select", items }
    });
  }

  render(): JSX.Element {
    const currentStep = this.state.step;
    const currentStepControl = currentStep.step === "upload"
      ? <Uploader onUpload={this.handleUpload}/>
      : <Selector items={currentStep.items} onSelect={openItemInNewTab}/>

    return (
      <div>
        <LPAppBar/>
        <p>{"\u2605 \u2BEA  \u2606"}</p>
        <p>◖◐</p>
        <Container maxWidth="sm">
          {currentStepControl}
        </Container>
      </div>
    );
  }
}



