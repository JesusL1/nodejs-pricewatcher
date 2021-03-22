const axios = require('axios')
const jsdom = require('jsdom')
const { JSDOM } = jsdom;

const stores = {"93brand.com":"scrape_93Brand", "www.adidas.com": "scrape_Adidas", "www.microcenter.com":"scrape_Microcenter"}

stores.scrape_93Brand = (productUrl, data) => {
    const dom = loadDoc(data)
    const productName = dom.title
    const productPrice = dom.querySelector("meta[property='product:price:amount'").getAttribute('content')
    const productImg = dom.getElementsByTagName("img")[2].src
    const productObject = {url: productUrl, name: productName, price: productPrice, img: productImg}
    return productObject
}

stores.scrape_Adidas = (productUrl, data) => {
    const dom = loadDoc(data)
    const productName = dom.title
    const productPrice = dom.getElementsByClassName("gl-price-item")[0].textContent.substring(1)
    const productImg = dom.getElementsByClassName("content___1wmQY")[0].querySelector("img").src
    const productObject = {url: productUrl, name: productName, price: productPrice, img: productImg}
    return productObject
}

stores.scrape_Microcenter = (productUrl, data) => {
    const dom = loadDoc(data)
    const productName = dom.title
    let productPrice = dom.getElementById('pricing').textContent.substring(1)
    productPrice = parseFloat(productPrice.replace(/,/g, ''))
    const productImg = dom.querySelectorAll('.productImageZoom')[0].getAttribute('src').replace('thumbnail', 'zoom') // gets a larger image
    const productObject = {url: productUrl, name: productName, price: productPrice, img: productImg}
    return productObject
}

const selectParse = (url_link) => {
    console.log(url_link)
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