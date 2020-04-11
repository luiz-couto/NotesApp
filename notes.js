const fs = require('fs');
const chalk = require('chalk');

const addNote = (title, body) => {
    const notes = loadNotes();

    const verify = notes.find(note => note.title === title);
    if (verify) {
        console.log(chalk.bgRed.black('Note title taken!'));
        return;
    }
    
    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log(chalk.bgGreen.black('New note added!'));
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesFilter = notes.filter(note => note.title != title);

    if (notes.length == notesFilter.length) {
        console.log(chalk.bgRed.black('There isnt any note with that title!'));
        return;
    }
    saveNotes(notesFilter);4
    console.log(chalk.bgGreen.black('Note removed!'));

}

const listNotes = () => {
    const notes = loadNotes();
    console.log(chalk.bgYellow.black('Your Notes:\n'));
    notes.forEach(note => console.log(note.title));
}

const readNote = (title) => {
    const notes = loadNotes();
    const selectedNote = notes.find(note => note.title === title);
    if(selectedNote) {
        console.log(chalk.bgYellow.black(selectedNote.title));
        console.log(selectedNote.body);
        return;
    }
    console.log(chalk.bgRed.black('We cant find a note with that title!'));
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
    addNote,
    removeNote,
    listNotes,
    readNote
}