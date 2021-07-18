import {
  AppBar, Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, Toolbar, Typography,
} from '@material-ui/core';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ListIconOption, listIconOptionValues, Settings } from '../../service/customization';
import { CustomListIcon } from '../common/CustomListIcon';
import Uploader from '../common/Uploader';
import { fileToDataUrl } from '../../service/persistence';

// TODO help dialog to explain spreadsheet format

type SettingsEditorProps = {
  prevSettings: Settings;
  onSave: (settings: Settings) => void;
};

class SettingsEditor extends React.Component<SettingsEditorProps, Settings> {
  constructor(props: Readonly<SettingsEditorProps>) {
    super(props);
    this.state = props.prevSettings;
  }

  private changeListIcon(value: ListIconOption): void {
    this.setState({ listIcon: value });
  }

  private handleImageUpload(file: File): void {
    fileToDataUrl(file).then((url) => {
      this.setState({ imageDataUrl: url });
      console.log(this.state);
    }).catch((err) => {
      // TODO better error handling
      console.error(err);
    });
  }

  private removeImage(): void {
    this.setState({ imageDataUrl: undefined });
  }

  render(): JSX.Element {
    return (
      <div>
        <div style={{ marginBottom: '5px' }}>
          {

            this.state.imageDataUrl
              ? (
                <>
                  <Typography variant="h6">Custom Image</Typography>
                  <img src={this.state.imageDataUrl} style={{ maxWidth: '2in', maxHeight: '2in' }} />
                  <Button
                    color="secondary"
                    onClick={this.removeImage.bind(this)}
                    style={{ display: 'block' }}
                  >
                    Remove Custom Image
                  </Button>
                </>
              )
              : (
                <Uploader
                  onUpload={this.handleImageUpload.bind(this)}
                  text="Upload Label Image"
                  accept="image/*"
                />
              )
          }
        </div>
        <FormControl variant="filled" style={{ width: '100%' }}>
          <InputLabel id="icon-select-label">List Icon</InputLabel>
          <Select
            labelId="icon-select-label"
            value={this.state.listIcon}
            onChange={(event) => { this.changeListIcon(event.target.value as ListIconOption); }}
          >
            {listIconOptionValues.map((option) => (
              <MenuItem value={option} key={option}><CustomListIcon icon={option} /></MenuItem>
            ))}
          </Select>
        </FormControl>
        <div style={{ marginTop: '10px' }}>
          <Button
            variant="contained"
            color="primary"
            style={{ width: '100%' }}
            onClick={() => { this.props.onSave(this.state); }}
          >
            Save and Close
          </Button>
        </div>
      </div>
    );
  }
}

type MenuProps = {
  settings: Settings;
  onSaveSettings: (settings: Settings) => void;
};

type MenuBarState = {
  showSettings: boolean;
};

export class MenuBar extends React.Component<MenuProps, MenuBarState> {
  constructor(props: Readonly<MenuProps>) {
    super(props);

    this.state = {
      showSettings: false,
    };
  }

  render(): JSX.Element {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              Label Manager
            </Typography>
            <IconButton
              edge="end"
              aria-label="settings"
              color="inherit"
              onClick={() => { this.setState({ showSettings: true }); }}
            >
              <SettingsIcon />
            </IconButton>
          </Toolbar>
        </AppBar>
        <Dialog open={this.state.showSettings}>
          <DialogTitle>Settings</DialogTitle>
          <DialogContent>
            <SettingsEditor
              prevSettings={this.props.settings}
              onSave={(settings) => {
                this.setState({ showSettings: false });
                this.props.onSaveSettings(settings);
              }}
            />
          </DialogContent>
        </Dialog>
      </>
    );
  }
}


