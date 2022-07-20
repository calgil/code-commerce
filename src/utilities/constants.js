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


export const SHOPPER_URL = "https://api.chec.io/v1/products";
export const SHOPPER_API = process.env.REACT_APP_SHOPPER_API;

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

export const months = [ 
    {value: '', name: "Month"} , 
	{value: '01' , name: "January"} , 
	{value: '02', name: "February"} , 
	{value: '03', name: "March"} , 
	{value: '04', name: "April"} , 
	{value: '05', name: "May"} , 
	{value: '06', name: "June"} ,
    {value: '07', name: "July"} , 
	{value: '08', name: "August"} , 
	{value: '09', name: "September"} , 
	{value: '10', name: "October"} , 
	{value: '11', name: "November"} , 
	{value: '12', name: "December"} 
];

export const years = [
    {value: '', name:'Year' },
	{value: 22, name: 22 }, 
	{value: 23, name: 23 }, 
	{value: 24, name: 24 }, 
	{value: 25, name: 25 }, 
	{value: 26, name: 26 }, 
	{value: 27, name: 27 }, 
	{value: 28, name: 28 }, 
	{value: 29, name: 29 }, 
	{value: 30, name: 30 },
];

export const countryList = [
    "Select a Country",
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];
