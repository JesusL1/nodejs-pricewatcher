const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

const stores = {"93brand.com":"scrape_93Brand", "www.amazon.com": "scrape_Amazon", "bananarepublic.gap.com":"scrape_Bananarepublic", "www.microcenter.com":"scrape_Microcenter"}

stores.scrape_Microcenter = (url) => {
    console.log('microcenter running')
    const promise = loadDoc(url)
        .then((dom) => {
            const productName = dom.title
            let productPrice = dom.getElementById('pricing').textContent.substring(1)
            productPrice = parseFloat(productPrice.replace(/,/g, ''))
            const productImg = dom.querySelectorAll('.productImageZoom')[0].getAttribute('src').replace('thumbnail', 'zoom') // gets a larger image
            const productObject = {name: productName, price: productPrice, img: productImg}
            return productObject
        })
        .catch(error=> {
            console.log(error)
        })
        return promise
}

stores.scrape_93Brand = (url) => {
    console.log('scrape_93Brand function')
}

const selectParse = (url) => {
    const scrape_function = stores[url.hostname]
    console.log(scrape_function)
    const product = stores[scrape_function](url.href)
    return product
}

const loadDoc = (url) => {
    const promise = axios.get(url)
        .then(res => {
            const domPreParse = new JSDOM(res.data, { pretendToBeVisual: true })
            const dom = domPreParse.window.document
            return dom
        })
        .catch(error=> {
            console.log(error)
        })
     return promise
}



module.exports = {stores, selectParse};