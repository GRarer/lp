import {
  AppBar, Button, Dialog, DialogContent, DialogTitle, FormControl, IconButton, Snackbar, Toolbar, Typography,
} from '@material-ui/core';
import React from 'react';
import SettingsIcon from '@material-ui/icons/Settings';
import HelpIcon from '@material-ui/icons/Help';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { ListIconOption, listIconOptionValues, Settings } from '../../service/customization';
import { CustomListIcon } from '../common/CustomListIcon';
import Uploader from '../common/Uploader';
import { fileToDataUrl } from '../../service/persistence';
import MuiAlert from '@material-ui/lab/Alert';

type SettingsEditorProps = {
  prevSettings: Settings;
  onSave: (settings: Settings) => void;
  changeMenuError: (message: string) => void;
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
    }).catch((err) => {
      console.error(err);
      this.props.changeMenuError('Error: could not read file');
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
  showHelp: boolean;
  errorSnackbarMessage: string | undefined;
};

export class MenuBar extends React.Component<MenuProps, MenuBarState> {
  constructor(props: Readonly<MenuProps>) {
    super(props);

    this.state = {
      showSettings: false,
      showHelp: false,
      errorSnackbarMessage: undefined,
    };
  }

  render(): JSX.Element {
    return (
      <>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" style={{ flexGrow: 1 }}>
              LP Label Printer
            </Typography>
            <IconButton
              edge="end"
              aria-label="help"
              color="inherit"
              onClick={() => { this.setState({ showHelp: true }); }}
            >
              <HelpIcon/>
            </IconButton>
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
              changeMenuError={(message)=>{ this.setState({ errorSnackbarMessage: message }); }}
            />
          </DialogContent>
        </Dialog>
        <Dialog open={this.state.showHelp} maxWidth="lg">
          <DialogTitle>About</DialogTitle>
          <DialogContent style={{ width:'6in' }}>
            <Typography variant="h6">
                How To Use
            </Typography>
            <ol>
              <li>
                  Record your items as an Excel spreadsheet (.XLSX file).
              </li>
              <li>Upload your spreadsheet.</li>
              <li>Select one or more items that you want to print labels for. Each label will open in a new tab.</li>
              <li>Print the label from your web browser.</li>
            </ol>
            <Typography variant="h6">
                How To Format Your Spreadsheet
            </Typography>
            <ul>
              <li>
                  If your file has multiple sheets, the data you want to print should be in the first sheet.
              </li>
              <li>
                  The first row of your sheet should be the header row. This contains the names of the attributes stored
                  in each column. Every other row should represent one item in your list.
              </li>
              <li>
                  The first two columns are what will be shown in the list when you select which items to print.
                  You may want these first two columns to be the title and subtitle, album name and artist name, etc.
              </li>
              <li>
                  You can control how a column&aposs data will be displayed by adding keywords in brackets to the header
                  of that column.
                <ul>
                  <li>
                    <code>[label:skip]</code> - this column will not be shown on the labels.
                  </li>
                  <li>
                    <code>[label:5_stars]</code> - this column will be shown as a score out of 5 stars.
                      The values in this column should be numbers from 0 to 5 in increments of 0.5
                      (e.g. &quot;0&quot;, &quot;2.5&quot;, and &quot;5&quot; are all valid values).
                  </li>
                  <li>
                    <code>[label:10_stars]</code> - this column will be shown as a score out of 10 stars.
                  </li>
                </ul>
                  For example, if column D stores &quot;id number&quot; values that you do not want to show on the
                  labels, cell D1 should be set to: <code>id number [label:skip]</code>
              </li>
            </ul>
            <Typography variant="h6">
                About
            </Typography>
            <p>Copyright 2021 Grace Rarer</p>
            <p>
              The source code is available under the MIT License
              at <a href="https://github.com/grarer/lp">https://github.com/grarer/lp</a>
            </p>
            <Button variant="contained" onClick={()=>{ this.setState({ showHelp: false }); }}>
                Close
            </Button>
          </DialogContent>
        </Dialog>
        <Snackbar
          open={!!this.state.errorSnackbarMessage}
          autoHideDuration={6000}
          onClose={()=>{ this.setState({ errorSnackbarMessage: undefined }); }}>
          <MuiAlert
            elevation={6} variant="filled"
            onClose={()=>{ this.setState({ errorSnackbarMessage: undefined }); }} severity="error"
          >
            {this.state.errorSnackbarMessage}
          </MuiAlert>
        </Snackbar>
      </>
    );
  }
}


