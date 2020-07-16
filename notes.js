const fs = require('fs');
const chalk = require('chalk');
const { green } = require('chalk');

const readNote = function (title) {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)
    if(note) {
        console.log(chalk.green.inverse(note.title));
        console.log(chalk.blue.inverse(note.body));
    } else { 
        console.log(chalk.red.inverse("There is no note"))
    }
}

const listNotes = function () {
    console.log(chalk.green.inverse('Your notes'));
    const notes = loadNotes();
    notes.forEach((notes) => {
        console.log(notes.title);
    })
}

const removeNote = function (title) {
    const notes = loadNotes();
    const notesToKeep = notes.filter((note) => note.title !== title)
    if(notes.length > notesToKeep.length) {
        console.log(chalk.green('Note has been deleted!'));
        saveNotes(notesToKeep);
    } else { 
        console.log(chalk.red('title does not excist'));
    }
}

const addNote = function (title, body) {
    const notes = loadNotes();
    const duplicateNote = notes.find((notes) => notes.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes);
        console.log(chalk.green('note has been added'));
    } else {
        console.log(chalk.red('title is taken'));
    }
}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes);
    fs.writeFileSync('notes.json', dataJSON);
}


const loadNotes = function () {
    try {
        const dataBuffer = fs.readFileSync('notes.json');
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);
    } catch (e) {
        return [];
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote,
}