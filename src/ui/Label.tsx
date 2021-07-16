import React from "react";
import { RecordLabel } from "../service/model";

export class Label extends React.Component<{item: RecordLabel}> {
    // TODO render label
    render(): JSX.Element {
        const item = this.props.item;
        return (
            <div>
                <p>{item.title}</p>
                <p>{item.artist}</p>
            </div>
        )
    }
}
