import React from "react";
import { RecordLabel } from "../../service/model";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import './Label.css';
import { formatScore } from "./specialFormat";

function labelRow(props: {name: string, value: string}): JSX.Element {

  const defaultValueCell = <TableCell>{props.value}</TableCell>;

  // special case for showing scores out of 5 as stars
  const valueCell: JSX.Element = (props.name === "Score")
    ? (formatScore(props.value, 5) ?? defaultValueCell)
    : defaultValueCell;

  return (
    <TableRow>
      <TableCell>{props.name}</TableCell>
      {valueCell}
    </TableRow>
  );
}

function hasValue(row: {name: string, value: string | undefined}): row is {name: string, value: string} {
  return !!(row.value?.trim());
}

export class Label extends React.Component<{item: RecordLabel}> {

  render(): JSX.Element {
    const item = this.props.item;
    const data: {name: string, value: string}[] = [
      {name: "Title", value: item.title},
      {name: "Artist", value: item.artist},
      {name: "Release Date", value: item.releaseDate},
      {name: "Genre", value: item.genre},
      {name: "Acquisition", value: item.acquisition},
      {name: "Source", value: item.source},
      {name: "Price", value: item.price},
      {name: "Score", value: item.score},
      {name: "Thoughts", value: item.thoughts},
      {name: "Notes", value: item.notes},
      {name: "Discogs Log", value: item.discogsLog}
    ].filter(hasValue);

    return (
       <Table className="label" size="small">
        <TableBody>
          {data.map(x => labelRow(x))}
        </TableBody>
       </Table>
    )
  }
}
