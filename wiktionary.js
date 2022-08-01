import axios from "axios"
import {load} from "cheerio";

axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page=gato').then(resp => {

    let textData = resp.data.parse.text['*']
    
    let ch = load(textData);

    // console.log(ch("#Etymology").parent().next().next().next().html());
    // console.log(ch("[id^='Etymology']").forEach(
    //     console.log
    // ));
    var etList = ch("[id^='Etymology']");


    etList.each(function(){
        let element = ch(this);
        let startingPosition = element.parent().prev();

        let counter = 0;
        let proceed = true;

        // I am not quite sure why I went this way
        // But a better route will be to look for the language header and go through a list of eytomology

        while(proceed && counter < 10){
            
            let tagName = startingPosition.prop('tagName')
            let isTOC = startingPosition.attr('id') == 'toc'

            console.log(tagName)
            
            if(tagName == "H2"){
                let firstChild = ch(startingPosition.children()[0])
                console.log(firstChild.html());
                proceed = false;
            } else if(tagName == "HR"){
                proceed == false;
            } else if (isTOC){
                proceed == false;
            } else (
                startingPosition.prev()
            )

            counter++;

        }




        // .children().each(function(){
        //     let languageHeader = ch(this)
        //     console.log(languageHeader.html())
        // })
    })
});

// get id
// go up a parent
// go to next until p tag
// go to child and check if span and span class equals etyl
// go to child for anchor tag
// get text