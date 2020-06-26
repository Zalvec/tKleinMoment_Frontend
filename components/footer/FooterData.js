import axios from 'axios'

const footerData = async () => {
    // Alle contact gegevens opvragen - array van objects
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_ENDPOINT}contacts`)
    const contactDetails = response.data['hydra:member']

    return contactDetails
}

module.exports = footerData;