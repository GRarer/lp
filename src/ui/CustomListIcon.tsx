import { ListIconOption } from "../service/customization";
import {Album,  Attachment, Book, Label, Note,} from '@material-ui/icons';

export function CustomListIcon(props: {icon: ListIconOption}): JSX.Element {
    switch(props.icon) {
        case "album": return <Album/>;
        case "attachment": return <Attachment/>
        case "book": return <Book/>
        case "label": return <Label/>
        case "note": return <Note/>
    }
}
