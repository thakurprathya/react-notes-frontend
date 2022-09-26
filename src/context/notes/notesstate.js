import { useState } from "react";
import NoteContext from "./notescontext";

const NoteState= (props)=>{  //creating a arrow func
    const host="http://localhost:4000";  //defining backend host
    const [notes, setNotes]= useState([]);

    //Get all notes
    const GetNotes=  async ()=>{
        //API call
        const url=`${host}/notes/fetchallnotes`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            }
        });
        const json= await response.json();  // parses JSON response into native JavaScript objects
        // console.log(json);
        setNotes(json);
    }
    //Add a note
    const AddNote=  async (title, description, tag)=>{
        //API call
        const url=`${host}/notes/addnote`;
        const response = await fetch(url, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        const json= await response.json(); // parses JSON response into native JavaScript objects
        setNotes(notes.concat(json));  //concating data to array, as it returns an array
    }
    //Delete a note
    const DeleteNote= async (id)=>{  //will be paasing note id to this function
        //API call
        const url=`${host}/notes/deletenote/${id}`
        //below line added for disabling warning as not used value of response, this line of code means disable warning for 1 line below
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'DELETE',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            }
        });
        // const json= await response.json(); // parses JSON response into native JavaScript objects
        //Logic
        let newNotes= notes.filter((note)=>{  //passing a function to note
            return note._id!==id
        });
        setNotes(newNotes);
    }
    //Edit a note
    const EditNote= async(id, title, description, tag)=>{  //for asynchronous calls
        //API call
        const url=`${host}/notes/updatenote/${id}`
        //below line added for disabling warning as not used value of response
        // eslint-disable-next-line
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
              'auth-token': localStorage.getItem("token")
            },
            body: JSON.stringify({title, description, tag}) // body data type must match "Content-Type" header
        });
        // const json= await response.json(); // parses JSON response into native JavaScript objects
        //Logic to edit in client
        let newNotes= JSON.parse(JSON.stringify(notes));  //creating copy of notes as we cannot directly change state in react
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if(element._id === id){
                 newNotes[index].title=title;  
                 newNotes[index].description=description;  
                 newNotes[index].tag=tag;
                 break;
            } 
        }
        setNotes(newNotes);
    }

    return(
        <NoteContext.Provider value={{notes, setNotes, AddNote, DeleteNote, EditNote, GetNotes}}>  {/*value is the thing which we want to provide to diff components, contains item to be exported*/}
            {props.children}
        </NoteContext.Provider>
    );
}

export default NoteState;