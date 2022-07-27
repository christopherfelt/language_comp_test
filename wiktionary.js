import axios from "axios"
import {load} from "cheerio";

axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page=cintura').then(resp => {

    let textData = resp.data.parse.text['*']

    let ch = load(textData);

    console.log(ch("#Etymology").parent().next().next().next().html());
});

// get id
// go up a parent
// go to next until p tag
// go to child and check if span and span class equals etyl
// go to child for anchor tag
// get text