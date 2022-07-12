import shirt_img from '../assets/shirt.jpeg';
import backpack_img from '../assets/backpack.jpeg';
import coffee_img from '../assets/coffee.jpeg';
import carabiner_img from '../assets/carabiner.jpeg';
import bikeHelmet_img from '../assets/bikeHelmet.jpeg';
import snowboard_img from '../assets/snowboard.jpeg';
import skiis_img from '../assets/skis.jpeg';
import rope_img from '../assets/rope.jpeg';

import VISA_ICON from '.././assets/cc-assets/visa.png'
import AMERICAN_EXPRESS_ICON from '.././assets/cc-assets/amex.png'
import MASTER_CARD_ICON from '.././assets/cc-assets/masterCard.png'
import DISCOVER_ICON from '.././assets/cc-assets/discover.png'


export const items = [
    { name: 'T-Shirt', quantity: 0, image: 'shirt', price: 19.99 },
    { name: 'Backpack', quantity: 0, image: 'backpack', price: 49.99 },
    { name: 'Coffee Maker', quantity: 0, image: 'coffee', price: 14.99 },
    { name: 'Carabiner', quantity: 0, image: 'carabiner', price: 7.99 },
    { name: 'Bike Helmet', quantity: 0, image: 'bikeHelmet', price: 59.99 },
    { name: 'Snowboard', quantity: 0, image: 'snowboard', price: 299.99 },
    { name: 'Skiis', quantity: 0, image: 'skiis', price: 499.99 },
    { name: 'Climbing Rope', quantity: 0, image: 'rope', price: 99.99 },
];

export const itemImgs = {
    shirt: shirt_img,
    backpack: backpack_img,
    coffee: coffee_img,
    carabiner: carabiner_img,
    bikeHelmet: bikeHelmet_img,
    snowboard: snowboard_img,
    skiis: skiis_img,
    rope: rope_img,
}

export const USER_DATA = {
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    postCode: '',
}

export const FAKE_USER = {
    email: 'person@email.com',
    password: 'Aaaaaaaa1!',
}

export const INIT_SHIPPING_DATA = {
    title: '',
    name: '',
    address: '',
    phone: '',
    city: '',
    state: '',
    postcode: '',
    country: '',
}

export const INIT_CARD_DATA = {
    cardHolderName: '',
    cardNumber: '',
    cardExpiration: '',
    cardSecurity: '',
}

export const OTHERCARDS = [
    /[1-9]/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
    ' ',
    /\d/,
    /\d/,
    /\d/,
    /\d/,
];

export const CARD = [
    'VISA',
    'MASTERCARD',
    'AMERICAN_EXPRESS',
    'DISCOVER'
];

export const CARDICON = {
    VISA: VISA_ICON,
    MASTERCARD: MASTER_CARD_ICON,
    AMERICAN_EXPRESS: AMERICAN_EXPRESS_ICON,
    DISCOVER: DISCOVER_ICON
}
