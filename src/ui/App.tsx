import React from 'react';
import { LPAppBar } from './Menu';
import Uploader from './Uploader';
import { Container } from '@material-ui/core';
import { RecordLabel } from '../service/model';
import { Selector } from './Selector';

// TODO remove fake data
const fakeData: RecordLabel[] = [
  {
    artist: "Speedy Ortiz",
    title: "No Below",
    releaseDate: "2013",
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
    this.handleSelectItem = this.handleSelectItem.bind(this);

    this.state = {step: { step: "upload" }};

    // TODO remove fake data
    this.state = {step: {step: "select", items: fakeData}};
  }

  private handleUpload(items: RecordLabel[]): void {
    this.setState({
      step: { step: "select", items }
    });
  }

  private handleSelectItem(item: RecordLabel): void {
    // TODO show item's label page
    console.log(item);
  }


  render(): JSX.Element {
    const currentStep = this.state.step;
    const currentStepControl = currentStep.step === "upload"
      ? <Uploader onUpload={this.handleUpload}/>
      : <Selector items={currentStep.items} onSelect={this.handleSelectItem}/>

    return (
      <div>
        <LPAppBar/>
        <Container maxWidth="sm">
          {currentStepControl}
        </Container>
      </div>
    );
  }
}



