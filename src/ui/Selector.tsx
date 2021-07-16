import { List, ListItem, ListItemIcon, ListItemText,Divider, Typography } from "@material-ui/core";
import React from "react";
import { RecordLabel } from "../service/model";
import AlbumIcon from '@material-ui/icons/Album';

type SelectorProps = {
    items: RecordLabel[],
    onSelect: (item: RecordLabel) => void
};

export class Selector extends React.Component<SelectorProps> {

    render(): JSX.Element {

        const rows = this.props.items.map(item => (
            <ListItem button divider dense
                onClick={()=>{this.props.onSelect(item)}}
                key={item._uuid}
            >
                <ListItemIcon><AlbumIcon/></ListItemIcon>
                <ListItemText
                    primary={item.title ?? "unknown title"}
                    secondary={item.artist}
                  />
            </ListItem>
        ));

        return (
            <div>
                <Typography variant="h5" style={{marginTop:"10px"}}>
                    Select a label to print
                </Typography>
                <List>
                    <Divider/>
                    {rows}
                </List>
            </div>
        );
    }
}
