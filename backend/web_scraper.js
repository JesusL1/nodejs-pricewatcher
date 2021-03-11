const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

const stores = {"93brand.com":"scrape_93Brand", "www.amazon.com": "scrape_Amazon", "bananarepublic.gap.com":"scrape_Bananarepublic", "www.microcenter.com":"scrape_Microcenter"}

stores.scrape_Microcenter = (productUrl, data) => {
    console.log('scrape_Microcenter function')
    const dom = loadDoc(data)
    const productName = dom.title
    let productPrice = dom.getElementById('pricing').textContent.substring(1)
    productPrice = parseFloat(productPrice.replace(/,/g, ''))
    const productImg = dom.querySelectorAll('.productImageZoom')[0].getAttribute('src').replace('thumbnail', 'zoom') // gets a larger image
    const productObject = {url: productUrl, name: productName, price: productPrice, img: productImg}
    return productObject
}

stores.scrape_93Brand = (productUrl, data) => {
    console.log('scrape_93Brand function')
    const dom = loadDoc(data)
    const productName = dom.title
    const productPrice = dom.querySelector("meta[property='product:price:amount'").getAttribute('content')
    const productImg = dom.getElementsByTagName("img")[2].src
    const productObject = {url: productUrl, name: productName, price: productPrice, img: productImg}
    return productObject
}

const selectParse = (url_link) => {
    const promise = axios.get(url_link)
    .then((res) => {
        const url = new URL(url_link)
        if (url.hostname in stores) {
            const scrape_function = stores[url.hostname]
            console.log(scrape_function)
            const product = stores[scrape_function](url.href, res.data)
            return product
        }
    })
    .catch(error=> {
        //console.log('selectParse: ', error.message)
        return Promise.reject(error)
    })
    return promise
}

const loadDoc = (data) => {
    const domPreParse = new JSDOM(data, { pretendToBeVisual: true })
    const dom = domPreParse.window.document
    return dom
}


module.exports = {stores, selectParse};