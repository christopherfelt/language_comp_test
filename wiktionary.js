import axios from "axios"
import {load} from "cheerio";
import fs from "fs"

let testWord = "bota"
let selectedLanguage = "Spanish"


axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page='+testWord).then(resp => {

    let textData = resp.data.parse.text['*']
    
    let ch = load(textData);
    
    let refObj = {
        meta: {
            count: 0
        },
        languages: [
            
        ]
    }
    
    let toc = ch("#toc")
    let languagesList = ch(toc.children()[2])
    languagesList.children().each(function(){

        let langRef = {
            nameRef:"",
            etyRef: [],
            proRef: ""
        }

        let langRefEl = ch(this);

        langRef.nameRef = langRefEl.children().attr('href');

        let langRefList = ch(langRefEl.children()[1])
        langRefList.children().each(function(){
            let langRefItem = ch(this);
            let href = langRefItem.find("a").attr('href')
            if(href.includes("Etymology")){
                langRef.etyRef.push(href);
            }else if(href.includes("Pronunciation")){
                langRef.proRef = href
            }
        })

        refObj.languages.push(langRef);

    })

    refObj.meta.count = refObj.languages.length;

    let returnObj = {
        meta: {
            count: 0
        },
        languages: [
            
        ]
    } 

    returnObj.meta.count = refObj.meta.count

    for(let i = 0; i < returnObj.meta.count; i++){

        let languageObj = {
            name:"",
            etymology: "",
            pronunciation: ""
        }
        
        let langRef = refObj.languages[i]

        let nameID = langRef.nameRef
        let nameSpan = ch(nameID)
        languageObj.name = nameSpan.text()


        let etyID = langRef.etyRef[0]
        let etyHeader = ch(etyID);
        languageObj.etymology = etyHeader.parent().next().text().replace(/[\r\n]/gm, '');

        let proID = langRef.proRef
        let proHeader = ch(proID)
        let proList = []
        proHeader.parent().next().children().each(function(){
            let listItem = ch(this)
            proList.push(listItem.find('.IPA').text().replace(/[\r\n]/gm, ''))
        });

        languageObj.pronunciation = proList[0]


        returnObj.languages.push(languageObj)

    }

    
    // console.log(returnObj.languages[selectedLanguage])
    console.log(returnObj.languages)

});

    // function getChildText(parent){
    //     let text = parent.text()
    // }


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
