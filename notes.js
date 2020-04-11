const fs = require('fs');
const chalk = require('chalk');

const getNotes = () => {
    const str = 'Your notes...';
    return str;
}

const addNote = (title, body) => {
    const notes = loadNotes();

    const verify = notes.find(note => note.title === title);
    if (verify) {
        console.log(chalk.bgRed('Note title taken!'));
        return;
    }
    
    notes.push({
        title: title,
        body: body
    });

    saveNotes(notes);
    console.log(chalk.bgGreen('New note added!'));
}

const removeNote = (title) => {
    const notes = loadNotes();

    const notesFilter = notes.filter(note => note.title != title);

    if (notes.length == notesFilter.length) {
        console.log(chalk.bgRed('There isnt any note with that title!'));
        return;
    }
    saveNotes(notesFilter);4
    console.log(chalk.bgGreen('Note removed!'));

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
    addNote,
    removeNote
}