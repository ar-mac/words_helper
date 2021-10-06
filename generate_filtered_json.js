import fs from "fs";

fs.readFile('./words_alpha.txt', 'utf8', function (err, data) {
  if (err) {
    console.log(err);
  } else {
    const textWithJustChars = data.replace(/[\n\r]/g, " ");
    const textToArray = textWithJustChars.split(' ').filter(el => el !== '' && el.length > 3);

    fs.appendFileSync('filtered_words_alpha.json', JSON.stringify(textToArray));
    console.log('success!');
  }
})
