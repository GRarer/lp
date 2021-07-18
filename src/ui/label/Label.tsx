import React from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { LabelAttribute, LabelData } from '../../service/model';
import './Label.css';
import { formatScore } from './specialFormat';

const valueFormats = {
  'text': (value: string) => value,
  'scoreOutOf5': (value: string) => formatScore(value, 5),
  'scoreOutOf10': (value: string) => formatScore(value, 10),
};

function labelRow(props: LabelAttribute): JSX.Element {
  return (
    <TableRow key={props.uuid}>
      <TableCell>{props.name}</TableCell>
      <TableCell>{valueFormats[props.format](props.value)}</TableCell>
    </TableRow>
  );
}

export class Label extends React.Component<{data: LabelData; imageUrl?: string;}> {
  render(): JSX.Element {
    const image: JSX.Element | undefined = this.props.imageUrl
      ? <img src={this.props.imageUrl} style={{ maxWidth: '2.5in' }} />
      : undefined;

    return (
      <div className="label">
        {image}
        <Table size="small">
          <TableBody>
            {this.props.data.attributes.map(labelRow)}
          </TableBody>
        </Table>
      </div>
    );
  }
}
