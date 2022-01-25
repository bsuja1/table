import React, { useState } from "react";
import {
	Box, Button, Table,
	TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// Creating styles
const useStyles = makeStyles({
	root: {
		"& > *": {
			borderBottom: "unset",
		},
	},
	table: {
		minWidth: 650,
	},
	snackbar: {
		bottom: "104px",
	},
});

function TableDemo() {
	// Creating style object
	const classes = useStyles();

	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState([
		{message: "" },
    ]);

	// Initial states
    const [state, setState] = useState('');
	const [isEdit, setEdit] = React.useState(false);


	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e) => {
		e.preventDefault();
        //console.log(e.target.value)
        setState(e.target.value)
	};

    // Function For adding new row object
	const handleAdd = (e) => {
		e.preventDefault();
        const text = state.trim();
		if (text.length>0)
		{
			setRows([...rows,{message: state}])
			setState('')
		}
	};

	// Function to handle edit
	const handleEdit = (i) => {
		console.log("onEdit")
		// If edit mode is true setEdit will
		// set it to false and vice versa
	};

	// Handle the case of delete confirmation where
	// user click yes delete a specific row of id:i
	const handleDelete = (i) => {
		console.log("onDelete")
		/*const list = [...rows];
		list.splice(i, 1);
		setRows(list);
		*/
		
	};

return (
	<TableBody>
	<Box margin={1}>
		<div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>
                <TableCell padding="none">
                    <input
                        type="text"
                        placeholder="Start a new message..."
                        value={state}
                        onChange={handleInputChange}
                    />
                </TableCell>
                <TableCell padding="none">
                    <Button onClick={(e) => handleAdd(e)}>
                        Send Message
                    </Button>			
                </TableCell>           
            </div>
		</div>
		<TableRow align="center"></TableRow>

		<Table
		className={classes.table}
		size="medium"
		aria-label="a dense table"
		>
		<TableHead>
			<TableRow>
			<TableCell>Messages</TableCell>
			</TableRow>
		</TableHead>
		{(rows.length>0)
        ?
        <div>
        <TableBody>
            <div>
			{rows.map((row, i) => {
			return (
				<div>
				<TableRow>
					{(row.message.length>0)
					?
					<div>
						<TableCell padding="none">
					{		row.message}
						</TableCell>
						<TableCell>
							<button onClick={handleEdit(i)} name="button_edit">Edit</button>
							<button onClick={handleDelete(i)} name="button_delete">Delete</button>
							<button name="button_reply">Reply</button>
						</TableCell>
					</div>
					:
					<div>

					</div>
					}
				</TableRow>
				</div>
			);
			})}
            </div>
		</TableBody>
        </div>
        :
        <div>
            No messages yet...
        </div>
        }
		</Table>
	</Box>
	</TableBody>
);
}

export default TableDemo;
