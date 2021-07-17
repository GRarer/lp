import {AppBar, Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, Toolbar, Typography} from '@material-ui/core'
import React, { Fragment } from 'react';
import { ListIconOption, listIconOptionValues, Settings } from '../service/customization';
import SettingsIcon from '@material-ui/icons/Settings';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { CustomListIcon } from './CustomListIcon';


type MenuProps = {
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
}

type MenuBarState = {
  showSettings: boolean;
}

export class MenuBar extends React.Component<MenuProps, MenuBarState> {
  constructor(props: Readonly<MenuProps>) {
    super(props);

    this.closeSettings = this.closeSettings.bind(this);

    this.state = {
      showSettings: false
    }
  }

  closeSettings(): void {

  }

  render(): JSX.Element {
      return (
        <Fragment>
          <AppBar position="static">
            <Toolbar>
              <Typography variant="h6" style={{flexGrow: 1}}>
                Label Manager
              </Typography>
              <IconButton edge="end" aria-label="settings" color="inherit"
                onClick={()=>{this.setState({showSettings: true});}}>
                <SettingsIcon />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Dialog open={this.state.showSettings}>
            <DialogTitle>Settings</DialogTitle>
            <DialogContent>
              <SettingsEditor
                prevSettings={this.props.settings}
                onSave={(settings)=>{
                  this.setState({showSettings: false});
                  this.props.onSaveSettings(settings);
                }}
              />
            </DialogContent>
          </Dialog>
        </Fragment>
    );
  }


}

type SettingsEditorProps = {
  prevSettings: Settings,
  onSave: (settings: Settings) => void
};

class SettingsEditor extends React.Component<SettingsEditorProps, Settings> {
  constructor(props: Readonly<SettingsEditorProps>) {
      super(props);

      this.changeListIcon = this.changeListIcon.bind(this);

      this.state = props.prevSettings;
  }

  private changeListIcon(value: ListIconOption): void {
    this.setState({listIcon: value});
  }

  render(): JSX.Element {
    return (
      <div>
        <FormControl variant="filled" style={{width:"100%"}}>
          <InputLabel id="icon-select-label">List Icon</InputLabel>
          <Select
            labelId="icon-select-label"
            value={this.state.listIcon}
            onChange={(event)=>{this.changeListIcon(event.target.value as ListIconOption)}}
          >
            {listIconOptionValues.map(option => (
              <MenuItem value={option}><CustomListIcon icon={option}/></MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{marginTop:"10px"}}>
          <Button
            variant="contained" color="primary" style={{width:"100%"}}
            onClick={()=>{this.props.onSave(this.state)}}
          >
            Save Settings
          </Button>
        </div>
      </div>
    );
  }
}

