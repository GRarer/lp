import { List, ListItem, ListItemIcon, ListItemText, Typography, InputAdornment, IconButton } from "@material-ui/core";
import React from "react";
import { RecordLabel } from "../service/model";
import AlbumIcon from '@material-ui/icons/Album';
import ClearIcon from '@material-ui/icons/Clear';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { ListIconOption } from "../service/customization";
import { CustomListIcon } from "./CustomListIcon";

type SelectorProps = {
    items: RecordLabel[],
    onSelect: (item: RecordLabel) => void,
    listIcon: ListIconOption,
};

type SelectorState = {
    search: string;
}

export class Selector extends React.Component<SelectorProps, SelectorState> {
    constructor(props: Readonly<SelectorProps>) {
        super(props);

        this.state = {
            search: ""
        };
    }

    private itemMatchesSearch(item: RecordLabel): boolean {
        const search = this.state.search.toLowerCase();
        console.log(search);
        if (search === "") {
            console.log("no search");
            return true;
        }
        return (
            item.title?.toLowerCase().includes(search)
            || item.artist?.toLowerCase().includes(search)
            || false
        );
    }

    render(): JSX.Element {

        const rows = this.props.items.filter(item => this.itemMatchesSearch(item)).map(item => (
            <ListItem button divider dense
                onClick={()=>{this.props.onSelect(item)}}
                key={item._uuid}
            >
                <ListItemIcon>
                    <CustomListIcon icon={this.props.listIcon}/>
                </ListItemIcon>
                <ListItemText
                    primary={item.title ?? "unknown title"}
                    secondary={item.artist}
                  />
            </ListItem>
        ));

        console.log(rows);

        return (
            <div>
                <Typography variant="h5" style={{marginTop:"10px", marginBottom:"5px"}}>
                    Select a label to print
                </Typography>
                <FormControl fullWidth variant="filled">
                    <InputLabel htmlFor="search-control">Search by Title or Artist</InputLabel>
                    <FilledInput
                        id="search-control"
                        value={this.state.search}
                        onChange={(event)=>{
                            this.setState({search: event.target.value});
                        }}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton onClick={()=>{this.setState({search: ""})}}><ClearIcon/></IconButton>
                            </InputAdornment>
                        }
                    />
                </FormControl>
                <List>
                    {rows}
                </List>
            </div>
        );
    }
}
