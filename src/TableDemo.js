import React, { useState } from "react";
import {
	Box, Button, Table,
	TableBody, TableCell, TableHead, TableRow
} from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";


function TableDemo() {
	// Defining a state named rows
	// which we can update by calling on setRows function
	const [rows, setRows] = useState([
		{message: "" },
    ]);

	// Initial states
    const [state, setState] = useState('');
	const [edit, setEdit] = useState(false); //flag
	const [editRow, setEditRow] = useState(0);//stores row being edited
	const [editedMsg, setEditedMsg] = useState("");//stores new edited message
	
	// The handleInputChange handler can be set up to handle
	// many different inputs in the form, listen for changes
	// to input elements and record their values in state
	const handleInputChange = (e) => {
        //console.log(e.target.value)
        setState(e.target.value)
	};

    // Function For adding new row object
	const handleAdd = (e) => {
		//e.preventDefault();
        const text = state.trim();
		if (text.length>0)
		{
			setRows([...rows,{message: state}])
			setState('')
			setEdit(false);
		}
	};

	// Function to handle edit
	const handleEdit = (i) => {
		//console.log("onEdit")
		//Save the row number and row message in variables
		setEditedMsg(rows[i].message)
		setEditRow(i)
		//set flag to indicate edit in progress
		setEdit(true);
	};
	
	// Function to handle edit
	const handleEditChange = (e) => {
		//console.log("onEditChange")
		setEditedMsg(e.target.value)
	};

	const handleUpdate = (i) => {		
		//console.log("onUpdate", editedMsg)
		const text = editedMsg.trim();
		if (text.length>0)
		{
			const list = [...rows];
			list[i].message=editedMsg;
			setRows(list);
			//reset flag, row number and row message
			setEditRow(0)
			setEditedMsg("")
			setEdit(false)
		}		
	};

	// Handle the case of delete 
	const handleDelete = (i) => {
		//console.log("onDelete")
		const list = [...rows];
		list.splice(i, 1);
		setRows(list);		
	};

	// Handle the case of reply 
	const handleReply = (i) => {
		console.log("onReply")	
	};

return (
	<Box margin={5}>
		<TableCell>
			<input
				type="text"
				size="50"
				placeholder="Start a new message..."
				value={state}
				onChange={handleInputChange}
			/>
		</TableCell>
		<TableCell>
			<Button onClick={(e) => handleAdd(e)}>Send Message</Button>			
		</TableCell>           
		<Table>
		<TableHead>
			<TableRow>
				Messages                    
			</TableRow>
		</TableHead>
		{(rows.length>1)
        ?
        <TableBody>
			{rows.map((row, i) => {
			return (
				<TableRow>
					{(row.message.length>0)
					?
						<TableRow>
							{((edit) && (editRow===i))
							?
							<div>		
								<TableCell width ="50">
								<input
									name="edit_input"
									type="text"
									value={editedMsg}
									onChange= {handleEditChange}
								/>
								</TableCell>
								<TableCell width ="50">
									<button onClick={handleUpdate.bind(this,i)} name="button_update">Update</button>
								</TableCell>
							
							</div>
							:
							<div>
							<TableCell width ="50">
								{row.message}
							</TableCell>
							<TableCell>
								<button onClick={handleEdit.bind(this,i)} name="button_edit">Edit</button>
								<button onClick={handleDelete.bind(this,i)} name="button_delete">Delete</button>
								<button onClick={handleReply.bind(this,i)}name="button_reply">Reply</button>
							</TableCell>
							</div>
							}
						</TableRow>
					:
					<TableCell>
					</TableCell>
					}
				</TableRow>
			);
			})}
		</TableBody>
        :
        <TableBody>
			<TableRow></TableRow>
			<TableRow>
				<TableCell>
					No messages yet...
				</TableCell>
			</TableRow>
		</TableBody>
        }
		</Table>
	</Box>
	
);
}

export default TableDemo;
