// https://newsapi.org/v2/top-headlines?country=us&apiKey=
// 3368b8c619324aa4a43614c628f5af68

const key = `3368b8c619324aa4a43614c628f5af68`;
// create xhm html request




const data = new Promise(function (resolve, reject) {
    setTimeout(() => {
        let error = false;
        if (!error) {
            let xhm = new XMLHttpRequest();
            xhm.open('GET', `https://newsapi.org/v2/top-headlines?country=us&apiKey=${key}`, true);
            xhm.getResponseHeader("content-type", 'application/x-www-form-urlencoded')

            xhm.onload = function () {
                if (this.status === 200) {
                    let jsondata = JSON.parse(this.responseText);
                    let articles = jsondata.articles;
                    console.log(articles);
                    let html = "";
                    // calling the foreach lopp to display the news in browser
                    articles.forEach(function (element, index) {
                        console.log(element)
                        let news = `
                        <div class="accordion-item">
                        <h2 class="accordion-header" id="headingOne">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                data-bs-target="#collapse${index}" aria-expanded="true" aria-controls="collapse${index}">
                             <b>Breaking News : ${index + 1} </b>   ${element['title']}
                            </button>
                        </h2>
                        <div id="collapse${index}" class="accordion-collapse collapse" aria-labelledby="headingOne"
                            data-bs-parent="#accordionExample">
                            <div class="accordion-body">
                                <strong>${element['publishedAt']}.</strong> 
                                ${element['description']}. <a href="${element['url']}" target="_blank"><strong>Read more here!</strong></a>
                                <img style="height: 500px; width: 100%" class="my-4" src='${element['urlToImage']}'/>
                            </div>
                        </div>
                    </div>
                        `
                        html += news;
                    })
                    let newsAccordian = document.getElementById('newsAccordian');
                    newsAccordian.innerHTML = html
                } else {
                    console.error('some error')
                }
            }
            xhm.send();
            console.log('Data is good');
            resolve('Your News Api is Fetched!');
        } else {
            reject('Your Api is Rejected!')
        }
    }, 1000);
})


data.then(function (res) {
    errorData(`success`, `${res}`)
}).catch(function (error) {
    errorData(`danger`, `${error}`)
})
// Error function
const errorData = function (type, message) {
    let alertmessage = document.getElementById('message');
    alertmessage.innerHTML = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
  <strong>Message!</strong> ${message}.
  <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
</div>
    `
    setTimeout(() => {
        alertmessage.innerHTML = '';
    }, 3000);
}