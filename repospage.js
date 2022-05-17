const request = require("request");
const cheerio = require("cheerio");
const getIssuesPageHtml = require("./repoIssues");



function getReposPageHtml(url,topic){
    request(url, cb);

    function cb(err, response, html) {
        if (err) {
            console.log(err);
        }
        else if (response.statusCode == 404) {
            console.log("page not found");
        }
        else {
            extractRepoLink(html);
        }
    }

    function extractRepoLink(html) {
        let $ = cheerio.load(html);
        let repos = $(".f3.color-fg-muted.text-normal.lh-condensed");
        console.log(topic);
        for (let i = 0; i < 8; i++) {
            let repoAnchorTags = $(repos[i]).find("a");
            let repoLink = $(repoAnchorTags[1]).attr("href");
            repoLink = `https://github.com${repoLink}/issues` ;
            let repoName = $(repoAnchorTags[1]).text().trim();
            // console.log(repoName);
            // console.log(repoLink);
            getIssuesPageHtml(repoLink,topic,repoName);
        }
    }
}

module.exports = getReposPageHtml;

