import axios from "axios"
import {load} from "cheerio";


async function testFunction (){
    // let response = "hey";

    return await axios.get('https://en.wiktionary.org/w/api.php?action=parse&format=json&uselang=user&page=gato').then(resp => {
    
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
    
        let response = {
            statusCode: 200,
            body: returnObj
        }
    
    
        return response
    });
}


let output = await testFunction();

console.log(output)