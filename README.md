# LP: Label Printer
A simple tool for converting excel spreadsheet rows into printable labels. I built this for my dad's record collection,
but you can use it for anything where you've got a table of items that need nice-looking labels.

You can use it at https://grarer.github.io/lp

## How To Use

1. Record your items as an Excel spreadsheet (.XLSX file).
2. Upload your spreadsheet.
3. Select one or more items that you want to print labels for. Each label will open in a new tab.
4. Print the label from your web browser.

## How To Format Your Spreadsheet

- If your file has multiple sheets, the data you want to print should be in the first sheet.
- The first row of your sheet should be the header row. This contains the names of the attributes stored
in each column. Every other row should represent one item in your list.
-  The first two columns are what will be shown in the list when you select which items to print.
You may want these first two columns to be the title and subtitle, album name and artist name, etc.
- You can control how a column's data will be displayed by adding keywords in brackets to the header of that column.
    - `[label:skip]` - this column will not be shown on the labels.
    - `[label:5_stars]` - this column will be shown as a score out of 5 stars. The values in this column should be
    numbers from 0 to 5 in increments of 0.5 (e.g. "0", "2.5", and "5" are all valid values).
    - `[label:10_stars]` - this column will be shown as a score out of 10 stars.

    For example, if column D stores "id number" values that you do not want to show on the labels, cell D1 should be set to: <code>id number [label:skip]</code>
