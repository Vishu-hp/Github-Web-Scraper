const request = require("request");
const cheerio = require("cheerio");
const getReposPageHtml = require("./repospage");

let url = "https://github.com/topics";

request(url,cb);

function cb(err,response,html){
    if(err){
        console.log(err);
    }
    else if (response.statusCode == 404) {
        console.log("page not found");
    }
    else{
        extractHTML(html);
    }
}

function extractHTML(html){
    let $ = cheerio.load(html);
    let topics = $(".no-underline.d-flex.flex-column.flex-justify-center");
    for(let i=0;i<topics.length;i++){
        let topicLink = $(topics[i]).attr("href");
        let topic = $(topics[i]).find("p");
        topic = $(topic[0]).text().trim();
        topicLink = `https://github.com${topicLink}`;
        getReposPageHtml(topicLink,topic);
    }
}