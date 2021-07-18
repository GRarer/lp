import {
  List, ListItem, ListItemIcon, ListItemText, Typography, InputAdornment, IconButton,
} from '@material-ui/core';
import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { LabelData } from '../service/model';
import { ListIconOption } from '../service/customization';
import { CustomListIcon } from './CustomListIcon';

type SelectorProps = {
  items: LabelData[];
  onSelect: (item: LabelData) => void;
  listIcon: ListIconOption;
};

type SelectorState = {
  search: string;
};

export class Selector extends React.Component<SelectorProps, SelectorState> {
  constructor(props: Readonly<SelectorProps>) {
    super(props);

    this.state = {
      search: '',
    };
  }

  private itemMatchesSearch(item: LabelData): boolean {
    const search = this.state.search.toLowerCase();
    if (search === '') {
      return true;
    }
    return item.attributes.some(attribute => attribute.value.toLowerCase().includes(search));
  }

  render(): JSX.Element {
    const rows = this.props.items.filter((item) => this.itemMatchesSearch(item)).map((item) => (
      <ListItem
        button
        divider
        dense
        onClick={() => { this.props.onSelect(item); }}
        key={item.uuid}
      >
        <ListItemIcon>
          <CustomListIcon icon={this.props.listIcon} />
        </ListItemIcon>
        <ListItemText
          primary={item.title}
          secondary={item.subtitle}
        />
      </ListItem>
    ));

    console.log(rows);

    return (
      <div>
        <Typography variant="h5" style={{ marginBottom: '5px' }}>
          Select a label to print
        </Typography>
        <FormControl fullWidth variant="filled">
          <InputLabel htmlFor="search-control">Search by Title or Artist</InputLabel>
          <FilledInput
            id="search-control"
            value={this.state.search}
            onChange={(event) => {
              this.setState({ search: event.target.value });
            }}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton onClick={() => { this.setState({ search: '' }); }}><ClearIcon /></IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>
        <List>
          {rows}
        </List>
      </div>
    );
  }
}
