import { TableCell } from '@material-ui/core';
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarOutlineIcon from '@material-ui/icons/StarOutline';
import React from "react";

export function formatScore(score: string, outOf: number): JSX.Element | undefined {
    let n = Number.parseFloat(score);
    if(
        Number.isNaN(n)
        || !Number.isInteger(n*2)
        || (n < 0)
        || (n > outOf)
    ) {
        return;
    }

    let stars: JSX.Element[] = [];
    while (n >= 1) {
        stars.push(
            <StarIcon/>
        );
        n = n - 1;
    }
    if(n === 0.5) {
        stars.push(
            <StarHalfIcon/>
        );
    }
    while (stars.length < outOf) {
        stars.push(
            <StarOutlineIcon/>
        );
    }
    return (
        <TableCell>
            {stars}
        </TableCell>
    );
}
