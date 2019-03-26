

class FetchNewsData {
    defaultUrl = 'https://newsapi.org/v2/';
    constructor(apiKey) {
        this.apiKey = apiKey;
    }

    fetchData(url) {
        return fetch(`${this.defaultUrl}/${url}&apiKey=${this.apiKey}`)
            .then((resp) => resp.json())
            .then((data) => {
                return data;
            });
    }
}

class DisplayNews {

    constructor(apiKey) {
        this.apiKey = apiKey;
    }
    
    newsData = [];
    createNode(element) {
        return document.createElement(element);
    }

    appendElement(parent, el) {
        return parent.appendChild(el);
    }

    displaySources(apikey) {
        const channelsDropdown = document.getElementById("ddlchannelslist");
        const fetchDataObj = new FetchNewsData(apikey)
        fetchDataObj.fetchData("sources?language=en").then((data) => {
            this.newsData = data.sources;
            data.sources.map((item) => {
                let option = this.createNode('option');
                option.text = item.name;
                option.id = option.value = item.id;
                channelsDropdown.add(option);
            });
            this.sourcesOnChange();
        });
    }

    sourcesOnChange() {
        const channelsDropdown = document.getElementById("ddlchannelslist");

        const selectedItemId = channelsDropdown.options[document.getElementById("ddlchannelslist").selectedIndex].value;

        const selectedSourceName = document.getElementById("selectedSourceName");
        const selectedSourceCountry = document.getElementById("selectedSourceCountry");
        const selectedSourcedescription = document.getElementById("selectedSourcedescription");
        const selectedSourceLanguage = document.getElementById("selectedSourceLanguage");
        const selectedSourceUrl = document.getElementById("selectedSourceUrl");
        const filteredItem = this.newsData.filter(item => selectedItemId == item.id)[0];
        
        const { name, country, description, language, url } = filteredItem;

        selectedSourceName.innerText = name;
        selectedSourceCountry.innerText = country;
        selectedSourcedescription.innerText = description;
        selectedSourceLanguage.innerText = language;
        selectedSourceUrl.innerText = selectedSourceUrl.href = url;
    }
}



const apiKey = "c132a5c4ae714d27bdcc6b99f32c3c47";
const newsFeed = document.getElementById('newsFeedData');

let obj = new DisplayNews();
obj.displaySources(apiKey);
channelsOnchange = () => obj.sourcesOnChange();
