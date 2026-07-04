interface PianoKey{
    note: string,
    octave: number,
    isBlack: boolean,
    position: number
}

function getKeys(octaveCount: number){
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const result: PianoKey[] = [];
    let position = 0;

    for(let octave = 4; octave<4+octaveCount; octave++){
        for(const note of notes){
            result.push({note, octave, isBlack: note.includes('#'), position});
            position++;
        }
    }
    return result;
}

export default getKeys ;
