import axios from "axios"
import {load} from "cheerio";

axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page=apple').then(resp => {

    let textData = resp.data.parse.text['*']

    let ch = load(textData);

    console.log(ch("#Etymology").parent().next().html());
});