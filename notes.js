const fs = require('fs');

const getNotes = () => {
    const str = 'Your notes...';
    return str;
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const verify = notes.find(note => note.title === title);
    if (verify) {
        console.log('Note title taken!');
        return;
    }
    
    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log('New note added!');
}

const saveNotes = (notes) => {
    const notesJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', notesJSON);
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (err) {
        return [];
    }
}

module.exports = {
    getNotes,
    addNote
}