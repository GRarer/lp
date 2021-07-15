import {AppBar, Toolbar, Typography} from '@material-ui/core'

export function LPAppBar(): JSX.Element {
    return (
        <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">
            Label Manager
          </Typography>
        </Toolbar>
      </AppBar>
    );
}
