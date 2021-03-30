require('dotenv').config()
const web_scraper = require('../backend/utils/web_scraper')
const PriceAlert = require('../backend/models/priceAlert')
const nodemailer = require("nodemailer")


const transporter = nodemailer.createTransport({
    host: "smtp.mail.com",
    port: 587,
    secure: false,
    auth: {
        user: process.env.email,
        pass: process.env.pass
    }
})

PriceAlert.findAll({ raw: true })
.then((res) => {
    //console.log(res)
    return res
})
.then((priceAlerts) => {
    checkPrices(priceAlerts)
})
.catch(error => console.log(error))


const sendMessage = async (email, productName, productURL, productPrice, currentPrice) => {
    const message = await transporter.sendMail({
        from: `PriceWatcher <${process.env.email}>`, // sender address
        to: `${email}`,
        subject: `${productName} - $${currentPrice}`, // Subject line
        html: `
            <a href="${productURL}">${productName} - $${currentPrice}</a>
            <p> Previous Price: $${productPrice} </p>
            `,
    })
    console.log("Message sent: %s", message.messageId)
}

const notifyAndUpdate = (email, productName, productURL, productPrice, currentPrice) => {
    sendMessage(email, productName, productURL, productPrice, currentPrice)
    PriceAlert.update({productPrice: currentPrice}, {
        where: {
            productURL: productURL
        }
    })
    console.log(`price difference: ${currentPrice} < ${productPrice}`)
}

const checkPrices = async (priceAlerts) => {
    let scrapeTracker = {} // keeps track of productURL's that have already been scraped
    for (const priceAlert of priceAlerts) {
        if (priceAlert.productURL in scrapeTracker) {
            const scrapedPrice = scrapeTracker[priceAlert.productURL]
            if (scrapedPrice < priceAlert.productPrice) {
                notifyAndUpdate(priceAlert.user_email, priceAlert.productName, priceAlert.productURL, priceAlert.productPrice, scrapedPrice)
            }
        }
        else {
            const product = await web_scraper.selectParse(priceAlert.productURL)
            scrapeTracker[product.url] = product.price
            if (product.price < priceAlert.productPrice) { // if new checked price is lower than original
                notifyAndUpdate(priceAlert.user_email, priceAlert.productName, priceAlert.productURL, priceAlert.productPrice, product.price)  
            }
        }
    }
}
