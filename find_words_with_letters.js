import fs from "fs";
import _ from "lodash";
const { countBy, entries, sortBy } = _

const wrd = process.argv[2]
if (!wrd) {
  throw Error('Provide words list fo search from')
}

const letters = wrd.split('')
const lettersCount = countBy(letters, (l) => l)

fs.readFile('./files/filtered_words_alpha.json', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    let foundWords = []

    JSON.parse(data).forEach((word) => {
      const wordArray = word.split('')

      if (wordArray.length > letters.length) {
        return null
      }

      if (wordArray.every(letter => letters.includes(letter))) {
        const wordCount = entries(countBy(wordArray, (l) => l))
        if (wordCount.every(([letter, count]) => lettersCount[letter] >= count)) {
          foundWords.push(word)
        }
      }
    })

    console.log(sortBy(foundWords, (word) => word.length));
  }
});
