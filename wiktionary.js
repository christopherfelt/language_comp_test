import axios from "axios"
import {load} from "cheerio";
import fs from "fs"

axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page=gato').then(resp => {

    let textData = resp.data.parse.text['*']

    fs.writeFile("test1.html", textData, function(err){
        if(err) return console.log(err);
        console.log("Success!")
    });
    
    let ch = load(textData);
    
    
    // let searchLanguage = "Spanish";
    // let languageHeader;

    // var etList = ch("[id^='Etymology']");
    
    // // For each Etymology element, the nearest H2 header and check the language name.  If language name matches search language proceed. Stop if the HR or toc element are found first
    // etList.each(function(){
    //     let element = ch(this);
    //     let startingPosition = element.parent().prev();
        
    //     let counter = 0;
    //     let proceed = true;
    //     let language;
        

    //     while(proceed && counter < 10){
            
    //         let tagName = startingPosition.prop('tagName')
    //         let isTOC = startingPosition.attr('id') == 'toc'
            
    //         if(tagName == "H2"){
    //             let firstChild = ch(startingPosition.children()[0])
    //             console.log(firstChild.html());
    //             proceed = false;
    //             language = firstChild.html().trim();
    //             languageHeader = element;
    //         } else if(tagName == "HR"){
    //             proceed == false;
    //         } else if (isTOC){
    //             proceed == false;
    //         } else {
    //             startingPosition = startingPosition.prev()
    //         }

    //         counter++;
    //     }

    //     if(language == searchLanguage) return false;
    // })

    // console.log(languageHeader.parent().next().html());

    // loop through children and get the text



});

