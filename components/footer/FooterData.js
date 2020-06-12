import axios from 'axios'

const footerData = async () => {
    // Getting the contact information - array of objects
    const response = await axios.get(`https://wdev.be/wdev_roel/eindwerk/api/contacts`)
    const contactDetails = response.data['hydra:member']

    return contactDetails
}

module.exports = footerData;