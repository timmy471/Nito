import { assets } from '@src/assets';
import { IFundManagerTableDataType, ISPVListTableDataType, ISPVTAbleDataType } from 'types';

export const countries = [
  {
    name: 'Afghanistan',
    nationality: 'Afghan',
  },
  {
    name: 'Aland Islands',
    nationality: 'Aland Island',
  },
  {
    name: 'Albania',
    nationality: 'Albanian',
  },
  {
    name: 'Algeria',
    nationality: 'Algerian',
  },
  {
    name: 'American',
    nationality: 'American',
  },
  {
    name: 'Andorra',
    nationality: 'Andorran',
  },
  {
    name: 'Angola',
    nationality: 'Angolan',
  },
  {
    name: 'Anguilla',
    nationality: 'Anguillan',
  },
  {
    name: 'Antarctica',
    nationality: 'Antarctic',
  },
  {
    name: 'Antigua and Barbuda',
    nationality: 'Antiguan or Barbudan',
  },
  {
    name: 'Argentina',
    nationality: 'Argentine',
  },
  {
    name: 'Armenia',
    nationality: 'Armenian',
  },
  {
    name: 'Aruba',
    nationality: 'Aruban',
  },
  {
    name: 'Australia',
    nationality: 'Australian',
  },
  {
    name: 'Austria',
    nationality: 'Austrian',
  },
  {
    name: 'Azerbaijan',
    nationality: 'Azerbaijani, Azeri',
  },
  {
    name: 'Bahamas',
    nationality: 'Bahamian',
  },
  {
    name: 'Bahrain',
    nationality: 'Bahraini',
  },
  {
    name: 'Bangladesh',
    nationality: 'Bangladeshi',
  },
  {
    name: 'Barbados',
    nationality: 'Barbadian',
  },
  {
    name: 'Belarus',
    nationality: 'Belarusian',
  },
  {
    name: 'Belgium',
    nationality: 'Belgian',
  },
  {
    name: 'Belize',
    nationality: 'Belizean',
  },
  {
    name: 'Benin',
    nationality: 'Beninese, Beninois',
  },
  {
    name: 'Bermuda',
    nationality: 'Bermudian, Bermudan',
  },
  {
    name: 'Bhutan',
    nationality: 'Bhutanese',
  },
  {
    name: 'Bolivia (Plurinational State of)',
    nationality: 'Bolivian',
  },
  {
    name: 'Bonaire, Sint Eustatius and Saba',
    nationality: 'Bonaire',
  },
  {
    name: 'Bosnia and Herzegovina',
    nationality: 'Bosnian or Herzegovinian',
  },
  {
    name: 'Botswana',
    nationality: 'Motswana, Botswanan',
  },
  {
    name: 'Bouvet Island',
    nationality: 'Bouvet Island',
  },
  {
    name: 'Brazil',
    nationality: 'Brazilian',
  },
  {
    name: 'British Indian Ocean Territory',
    nationality: 'BIOT',
  },
  {
    name: 'Brunei Darussalam',
    nationality: 'Bruneian',
  },
  {
    name: 'Bulgaria',
    nationality: 'Bulgarian',
  },
  {
    name: 'Burkina Faso',
    nationality: 'Burkinabé',
  },
  {
    name: 'Burundi',
    nationality: 'Burundian',
  },
  {
    name: 'Cabo Verde',
    nationality: 'Cabo Verdean',
  },
  {
    name: 'Cambodia',
    nationality: 'Cambodian',
  },
  {
    name: 'Cameroon',
    nationality: 'Cameroonian',
  },
  {
    name: 'Canada',
    nationality: 'Canadian',
  },
  {
    name: 'Cayman Islands',
    nationality: 'Caymanian',
  },
  {
    name: 'Central African Republic',
    nationality: 'Central African',
  },
  {
    name: 'Chad',
    nationality: 'Chadian',
  },
  {
    name: 'Chile',
    nationality: 'Chilean',
  },
  {
    name: 'China',
    nationality: 'Chinese',
  },
  {
    name: 'Christmas Island',
    nationality: 'Christmas Island',
  },
  {
    name: 'Cocos (Keeling) Islands',
    nationality: 'Cocos Island',
  },
  {
    name: 'Colombia',
    nationality: 'Colombian',
  },
  {
    name: 'Comoros',
    nationality: 'Comoran, Comorian',
  },
  {
    name: 'Congo (Republic of the)',
    nationality: 'Congolese',
  },
  {
    name: 'Congo (Democratic Republic of the)',
    nationality: 'Congolese',
  },
  {
    name: 'Cook Islands',
    nationality: 'Cook Island',
  },
  {
    name: 'Costa Rica',
    nationality: 'Costa Rican',
  },
  {
    name: "Côte d'Ivoire",
    nationality: 'Ivorian',
  },
  {
    name: 'Croatia',
    nationality: 'Croatian',
  },
  {
    name: 'Cuba',
    nationality: 'Cuban',
  },
  {
    name: 'Curaçao',
    nationality: 'Curaçaoan',
  },
  {
    name: 'Cyprus',
    nationality: 'Cypriot',
  },
  {
    name: 'Czech Republic',
    nationality: 'Czech',
  },
  {
    name: 'Denmark',
    nationality: 'Danish',
  },
  {
    name: 'Djibouti',
    nationality: 'Djiboutian',
  },
  {
    name: 'Dominica',
    nationality: 'Dominican',
  },
  {
    name: 'Dominican Republic',
    nationality: 'Dominican',
  },
  {
    name: 'Ecuador',
    nationality: 'Ecuadorian',
  },
  {
    name: 'Egypt',
    nationality: 'Egyptian',
  },
  {
    name: 'El Salvador',
    nationality: 'Salvadoran',
  },
  {
    name: 'Equatorial Guinea',
    nationality: 'Equatorial Guinean, Equatoguinean',
  },
  {
    name: 'Eritrea',
    nationality: 'Eritrean',
  },
  {
    name: 'Estonia',
    nationality: 'Estonian',
  },
  {
    name: 'Ethiopia',
    nationality: 'Ethiopian',
  },
  {
    name: 'Falkland Islands (Malvinas)',
    nationality: 'Falkland Island',
  },
  {
    name: 'Faroe Islands',
    nationality: 'Faroese',
  },
  {
    name: 'Fiji',
    nationality: 'Fijian',
  },
  {
    name: 'Finland',
    nationality: 'Finnish',
  },
  {
    name: 'France',
    nationality: 'French',
  },
  {
    name: 'French Guiana',
    nationality: 'French Guianese',
  },
  {
    name: 'French Polynesia',
    nationality: 'French Polynesian',
  },
  {
    name: 'French Southern Territories',
    nationality: 'French Southern Territories',
  },
  {
    name: 'Gabon',
    nationality: 'Gabonese',
  },
  {
    name: 'Gambia',
    nationality: 'Gambian',
  },
  {
    name: 'Georgia',
    nationality: 'Georgian',
  },
  {
    name: 'Germany',
    nationality: 'German',
  },
  {
    name: 'Ghana',
    nationality: 'Ghanaian',
  },
  {
    name: 'Gibraltar',
    nationality: 'Gibraltar',
  },
  {
    name: 'Greece',
    nationality: 'Greek, Hellenic',
  },
  {
    name: 'Greenland',
    nationality: 'Greenlandic',
  },
  {
    name: 'Grenada',
    nationality: 'Grenadian',
  },
  {
    name: 'Guadeloupe',
    nationality: 'Guadeloupe',
  },
  {
    name: 'Guam',
    nationality: 'Guamanian, Guambat',
  },
  {
    name: 'Guatemala',
    nationality: 'Guatemalan',
  },
  {
    name: 'Guernsey',
    nationality: 'Channel Island',
  },
  {
    name: 'Guinea',
    nationality: 'Guinean',
  },
  {
    name: 'Guinea-Bissau',
    nationality: 'Bissau-Guinean',
  },
  {
    name: 'Guyana',
    nationality: 'Guyanese',
  },
  {
    name: 'Haiti',
    nationality: 'Haitian',
  },
  {
    name: 'Heard Island and McDonald Islands',
    nationality: 'Heard Island or McDonald Islands',
  },
  {
    name: 'Vatican City State',
    nationality: 'Vatican',
  },
  {
    name: 'Honduras',
    nationality: 'Honduran',
  },
  {
    name: 'Hong Kong',
    nationality: 'Hong Kong, Hong Kongese',
  },
  {
    name: 'Hungary',
    nationality: 'Hungarian, Magyar',
  },
  {
    name: 'Iceland',
    nationality: 'Icelandic',
  },
  {
    name: 'India',
    nationality: 'Indian',
  },
  {
    name: 'Indonesia',
    nationality: 'Indonesian',
  },
  {
    name: 'Iran',
    nationality: 'Iranian, Persian',
  },
  {
    name: 'Iraq',
    nationality: 'Iraqi',
  },
  {
    name: 'Ireland',
    nationality: 'Irish',
  },
  {
    name: 'Isle of Man',
    nationality: 'Manx',
  },
  {
    name: 'Israel',
    nationality: 'Israeli',
  },
  {
    name: 'Italy',
    nationality: 'Italian',
  },
  {
    name: 'Jamaica',
    nationality: 'Jamaican',
  },
  {
    name: 'Japan',
    nationality: 'Japanese',
  },
  {
    name: 'Jersey',
    nationality: 'Channel Island',
  },
  {
    name: 'Jordan',
    nationality: 'Jordanian',
  },
  {
    name: 'Kazakhstan',
    nationality: 'Kazakhstani, Kazakh',
  },
  {
    name: 'Kenya',
    nationality: 'Kenyan',
  },
  {
    name: 'Kiribati',
    nationality: 'I-Kiribati',
  },
  {
    name: "Korea (Democratic People's Republic of)",
    nationality: 'North Korean',
  },
  {
    name: 'Korea (Republic of)',
    nationality: 'South Korean',
  },
  {
    name: 'Kuwait',
    nationality: 'Kuwaiti',
  },
  {
    name: 'Kyrgyzstan',
    nationality: 'Kyrgyzstani, Kyrgyz, Kirgiz, Kirghiz',
  },
  {
    name: "Lao People's Democratic Republic",
    nationality: 'Lao, Laotian',
  },
  {
    name: 'Latvia',
    nationality: 'Latvian',
  },
  {
    name: 'Lebanon',
    nationality: 'Lebanese',
  },
  {
    name: 'Lesotho',
    nationality: 'Basotho',
  },
  {
    name: 'Liberia',
    nationality: 'Liberian',
  },
  {
    name: 'Libya',
    nationality: 'Libyan',
  },
  {
    name: 'Liechtenstein',
    nationality: 'Liechtenstein',
  },
  {
    name: 'Lithuania',
    nationality: 'Lithuanian',
  },
  {
    name: 'Luxembourg',
    nationality: 'Luxembourg, Luxembourgish',
  },
  {
    name: 'Macao',
    nationality: 'Macanese, Chinese',
  },
  {
    name: 'Macedonia (the former Yugoslav Republic of)',
    nationality: 'Macedonian',
  },
  {
    name: 'Madagascar',
    nationality: 'Malagasy',
  },
  {
    name: 'Malawi',
    nationality: 'Malawian',
  },
  {
    name: 'Malaysia',
    nationality: 'Malaysian',
  },
  {
    name: 'Maldives',
    nationality: 'Maldivian',
  },
  {
    name: 'Mali',
    nationality: 'Malian, Malinese',
  },
  {
    name: 'Malta',
    nationality: 'Maltese',
  },
  {
    name: 'Marshall Islands',
    nationality: 'Marshallese',
  },
  {
    name: 'Martinique',
    nationality: 'Martiniquais, Martinican',
  },
  {
    name: 'Mauritania',
    nationality: 'Mauritanian',
  },
  {
    name: 'Mauritius',
    nationality: 'Mauritian',
  },
  {
    name: 'Mayotte',
    nationality: 'Mahoran',
  },
  {
    name: 'Mexico',
    nationality: 'Mexican',
  },
  {
    name: 'Micronesia (Federated States of)',
    nationality: 'Micronesian',
  },
  {
    name: 'Moldova (Republic of)',
    nationality: 'Moldovan',
  },
  {
    name: 'Monaco',
    nationality: 'Monégasque, Monacan',
  },
  {
    name: 'Mongolia',
    nationality: 'Mongolian',
  },
  {
    name: 'Montenegro',
    nationality: 'Montenegrin',
  },
  {
    name: 'Montserrat',
    nationality: 'Montserratian',
  },
  {
    name: 'Morocco',
    nationality: 'Moroccan',
  },
  {
    name: 'Mozambique',
    nationality: 'Mozambican',
  },
  {
    name: 'Myanmar',
    nationality: 'Burmese',
  },
  {
    name: 'Namibia',
    nationality: 'Namibian',
  },
  {
    name: 'Nauru',
    nationality: 'Nauruan',
  },
  {
    name: 'Nepal',
    nationality: 'Nepali, Nepalese',
  },
  {
    name: 'Netherlands',
    nationality: 'Dutch, Netherlandic',
  },
  {
    name: 'New Caledonia',
    nationality: 'New Caledonian',
  },
  {
    name: 'New Zealand',
    nationality: 'New Zealand, NZ',
  },
  {
    name: 'Nicaragua',
    nationality: 'Nicaraguan',
  },
  {
    name: 'Niger',
    nationality: 'Nigerien',
  },
  {
    name: 'Nigeria',
    nationality: 'Nigerian',
  },
  {
    name: 'Niue',
    nationality: 'Niuean',
  },
  {
    name: 'Norfolk Island',
    nationality: 'Norfolk Island',
  },
  {
    name: 'Northern Mariana Islands',
    nationality: 'Northern Marianan',
  },
  {
    name: 'Norway',
    nationality: 'Norwegian',
  },
  {
    name: 'Oman',
    nationality: 'Omani',
  },
  {
    name: 'Pakistan',
    nationality: 'Pakistani',
  },
  {
    name: 'Palau',
    nationality: 'Palauan',
  },
  {
    name: 'Palestine, State of',
    nationality: 'Palestinian',
  },
  {
    name: 'Panama',
    nationality: 'Panamanian',
  },
  {
    name: 'Papua New Guinea',
    nationality: 'Papua New Guinean, Papuan',
  },
  {
    name: 'Paraguay',
    nationality: 'Paraguayan',
  },
  {
    name: 'Peru',
    nationality: 'Peruvian',
  },
  {
    name: 'Philippines',
    nationality: 'Philippine, Filipino',
  },
  {
    name: 'Pitcairn',
    nationality: 'Pitcairn Island',
  },
  {
    name: 'Poland',
    nationality: 'Polish',
  },
  {
    name: 'Portugal',
    nationality: 'Portuguese',
  },
  {
    name: 'Puerto Rico',
    nationality: 'Puerto Rican',
  },
  {
    name: 'Qatar',
    nationality: 'Qatari',
  },
  {
    name: 'Réunion',
    nationality: 'Réunionese, Réunionnais',
  },
  {
    name: 'Romania',
    nationality: 'Romanian',
  },
  {
    name: 'Russian Federation',
    nationality: 'Russian',
  },
  {
    name: 'Rwanda',
    nationality: 'Rwandan',
  },
  {
    name: 'Saint Barthélemy',
    nationality: 'Barthélemois',
  },
  {
    name: 'Saint Helena, Ascension and Tristan da Cunha',
    nationality: 'Saint Helenian',
  },
  {
    name: 'Saint Kitts and Nevis',
    nationality: 'Kittitian or Nevisian',
  },
  {
    name: 'Saint Lucia',
    nationality: 'Saint Lucian',
  },
  {
    name: 'Saint Martin (French part)',
    nationality: 'Saint-Martinoise',
  },
  {
    name: 'Saint Pierre and Miquelon',
    nationality: 'Saint-Pierrais or Miquelonnais',
  },
  {
    name: 'Saint Vincent and the Grenadines',
    nationality: 'Saint Vincentian, Vincentian',
  },
  {
    name: 'Samoa',
    nationality: 'Samoan',
  },
  {
    name: 'San Marino',
    nationality: 'Sammarinese',
  },
  {
    name: 'Sao Tome and Principe',
    nationality: 'São Toméan',
  },
  {
    name: 'Saudi Arabia',
    nationality: 'Saudi, Saudi Arabian',
  },
  {
    name: 'Senegal',
    nationality: 'Senegalese',
  },
  {
    name: 'Serbia',
    nationality: 'Serbian',
  },
  {
    name: 'Seychelles',
    nationality: 'Seychellois',
  },
  {
    name: 'Sierra Leone',
    nationality: 'Sierra Leonean',
  },
  {
    name: 'Singapore',
    nationality: 'Singaporean',
  },
  {
    name: 'Sint Maarten (Dutch part)',
    nationality: 'Sint Maarten',
  },
  {
    name: 'Slovakia',
    nationality: 'Slovak',
  },
  {
    name: 'Slovenia',
    nationality: 'Slovenian, Slovene',
  },
  {
    name: 'Solomon Islands',
    nationality: 'Solomon Island',
  },
  {
    name: 'Somalia',
    nationality: 'Somali, Somalian',
  },
  {
    name: 'South Africa',
    nationality: 'South African',
  },
  {
    name: 'South Georgia and the South Sandwich Islands',
    nationality: 'South Georgia or South Sandwich Islands',
  },
  {
    name: 'South Sudan',
    nationality: 'South Sudanese',
  },
  {
    name: 'Spain',
    nationality: 'Spanish',
  },
  {
    name: 'Sri Lanka',
    nationality: 'Sri Lankan',
  },
  {
    name: 'Sudan',
    nationality: 'Sudanese',
  },
  {
    name: 'Suriname',
    nationality: 'Surinamese',
  },
  {
    name: 'Svalbard and Jan Mayen',
    nationality: 'Svalbard',
  },
  {
    name: 'Swaziland',
    nationality: 'Swazi',
  },
  {
    name: 'Sweden',
    nationality: 'Swedish',
  },
  {
    name: 'Switzerland',
    nationality: 'Swiss',
  },
  {
    name: 'Syrian Arab Republic',
    nationality: 'Syrian',
  },
  {
    name: 'Taiwan, Province of China',
    nationality: 'Chinese, Taiwanese',
  },
  {
    name: 'Tajikistan',
    nationality: 'Tajikistani',
  },
  {
    name: 'Tanzania, United Republic of',
    nationality: 'Tanzanian',
  },
  {
    name: 'Thailand',
    nationality: 'Thai',
  },
  {
    name: 'Timor-Leste',
    nationality: 'Timorese',
  },
  {
    name: 'Togo',
    nationality: 'Togolese',
  },
  {
    name: 'Tokelau',
    nationality: 'Tokelauan',
  },
  {
    name: 'Tonga',
    nationality: 'Tongan',
  },
  {
    name: 'Trinidad and Tobago',
    nationality: 'Trinidadian or Tobagonian',
  },
  {
    name: 'Tunisia',
    nationality: 'Tunisian',
  },
  {
    name: 'Turkey',
    nationality: 'Turkish',
  },
  {
    name: 'Turkmenistan',
    nationality: 'Turkmen',
  },
  {
    name: 'Turks and Caicos Islands',
    nationality: 'Turks and Caicos Island',
  },
  {
    name: 'Tuvalu',
    nationality: 'Tuvaluan',
  },
  {
    name: 'Uganda',
    nationality: 'Ugandan',
  },
  {
    name: 'Ukraine',
    nationality: 'Ukrainian',
  },
  {
    name: 'United Arab Emirates',
    nationality: 'Emirati, Emirian, Emiri',
  },
  {
    name: 'United Kingdom of Great Britain and Northern Ireland',
    nationality: 'British, UK',
  },
  {
    name: 'United States Minor Outlying Islands',
    nationality: 'American',
  },
  {
    name: 'United States of America',
    nationality: 'American',
  },
  {
    name: 'Uruguay',
    nationality: 'Uruguayan',
  },
  {
    name: 'Uzbekistan',
    nationality: 'Uzbekistani, Uzbek',
  },
  {
    name: 'Vanuatu',
    nationality: 'Ni-Vanuatu, Vanuatuan',
  },
  {
    name: 'Venezuela (Bolivarian Republic of)',
    nationality: 'Venezuelan',
  },
  {
    name: 'Vietnam',
    nationality: 'Vietnamese',
  },
  {
    name: 'Virgin Islands (British)',
    nationality: 'British Virgin Island',
  },
  {
    name: 'Virgin Islands (U.S.)',
    nationality: 'U.S. Virgin Island',
  },
  {
    name: 'Wallis and Futuna',
    nationality: 'Wallis and Futuna, Wallisian or Futunan',
  },
  {
    name: 'Western Sahara',
    nationality: 'Sahrawi, Sahrawian, Sahraouian',
  },
  {
    name: 'Yemen',
    nationality: 'Yemeni',
  },
  {
    name: 'Zambia',
    nationality: 'Zambian',
  },
  {
    name: 'Zimbabwe',
    nationality: 'Zimbabwean',
  },
];

export const incomeOptions = [
  { value: '< $10000', label: 'Below $10,000' },
  { value: '$10000 - $49000', label: '$10,000 - $49,000' },
  { value: '$50000 - $99000', label: '$50,000 - $99,000' },
  { value: '$100000 - $149000', label: '$100,000 - $149,000' },
  { value: '$150000 - $199000', label: '$150,000 - $199,000' },
  { value: '$200000 - $499000', label: '$200,000 - $499,000' },
  { value: '$500000 - $999000', label: '$500,000 - $990,000' },
  { value: '> $1Million', label: 'Above $1Million' },
];

//Temporary Data

export const fundLeadTableData: ISPVListTableDataType[] = [
  {
    key: '1',
    company: 'Reflective Learning Fund',
    stage: 'Series A',
    date: 'Feb 14',
    target: '$50,000',
    status: 'Raising',
    fundManager: 'Denike Johnson',
    syndicate: 'Future Africa',
    allocation: '$250,000',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam metus commodo, volutpat morbi amet, purus, diam aliquam. Risus ultricies aliquet.',
  },
  {
    key: '2',
    company: 'Mama’s Cook SPV Fund',
    stage: 'Series A',
    date: 'Feb 14',
    target: '$50,000',
    status: 'Closing',
    fundManager: 'Abdul-Qudus Jide',
    allocation: '$250,000',
    syndicate: 'Pinterest',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam metus commodo, volutpat morbi amet, purus, diam aliquam. Risus ultricies aliquet.',
  },
  {
    key: '3',
    company: 'Eden SPV Fund',
    stage: 'Series A',
    date: 'Feb 14',
    target: '$50,000',
    status: 'Wired',
    fundManager: 'Timmy Michael',
    syndicate: 'Eden',
    allocation: '$250,000',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam metus commodo, volutpat morbi amet, purus, diam aliquam. Risus ultricies aliquet.',
  },
  {
    key: '4',
    company: 'Anyworka SPV',
    stage: 'Pre-Seed',
    date: 'Apr 27',
    target: '$150,000',
    status: 'Closing',
    fundManager: 'Jide Abdul-Qudus',
    syndicate: 'Anyworka',
    allocation: '$50,000',
    info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Bibendum quam metus commodo, volutpat morbi amet, purus, diam aliquam. Risus ultricies aliquet.',
  },
];

export const spvDetailsTableData: ISPVTAbleDataType[] = [
  {
    key: '1',
    subscriber: 'Wade Warrent',
    amount: '$50, 000',
    status: 'Raising',
    date: 'Feb 14, 2022',
    img: '/assets/images/dashboard/darrell-avatar.png',
    logo: '/assets/images/dashboard/darrell-avatar.png',
    yourCarry: '20%',
    ffCarry: '2%',
    investorSince: 'Apr 2022',
    syndicateNumber: 10,
    lastInvestment: '3 Days ago',
    address: '4517 Washingtom Street, Ilasamaja, Lagos.',
    phoneNumber: '08130351992',
    dob: 'May 20, 2015',
    email: 'jide@future.africa',
    investorsAccreditation: 'I have at least $5M in investments',
    verificationProofLink: '',
    idProofLink: '',
    addressProofLink: '',
    investingActivity: '12 Months',
    totalInvested: '$25k - $50k',
    totalNumberOfInvestments: 43,
    investmentPercentage: '3%',
    commitmentAmount: '$50,000',
  },
  {
    key: '2',
    subscriber: 'Cameron Wilson',
    amount: '$50, 000',
    status: 'Raising',
    img: '/assets/images/dashboard/cameron-avatar.png',
    date: 'Feb 14, 2022',
    logo: '/assets/images/dashboard/darrell-avatar.png',
    yourCarry: '20%',
    ffCarry: '2%',
    investorSince: 'Apr 2022',
    syndicateNumber: 10,
    lastInvestment: '3 Days ago',
    address: '4517 Washingtom Street, Ilasamaja, Lagos.',
    phoneNumber: '08130351992',
    dob: 'May 20, 2015',
    email: 'jide@future.africa',
    investorsAccreditation: 'I have at least $5M in investments',
    verificationProofLink: '',
    idProofLink: '',
    addressProofLink: '',
    investingActivity: '12 Months',
    totalInvested: '$25k - $50k',
    totalNumberOfInvestments: 43,
    investmentPercentage: '3%',
    commitmentAmount: '$50,000',
  },
  {
    key: '3',
    subscriber: 'Darrel Steward',
    amount: '$50, 000',
    status: 'Raising',
    img: '/assets/images/dashboard/wade-avatar.png',
    date: 'Feb 14, 2022',
    logo: '/assets/images/dashboard/darrell-avatar.png',
    yourCarry: '20%',
    ffCarry: '2%',
    investorSince: 'Apr 2022',
    syndicateNumber: 10,
    lastInvestment: '3 Days ago',
    address: '4517 Washingtom Street, Ilasamaja, Lagos.',
    phoneNumber: '08130351992',
    dob: 'May 20, 2015',
    email: 'jide@future.africa',
    investorsAccreditation: 'I have at least $5M in investments',
    verificationProofLink: '',
    idProofLink: '',
    addressProofLink: '',
    investingActivity: '12 Months',
    totalInvested: '$25k - $50k',
    totalNumberOfInvestments: 43,
    investmentPercentage: '3%',
    commitmentAmount: '$50,000',
  },
  {
    key: '3',
    subscriber: 'Darrel Steward',
    amount: '$50, 000',
    status: 'Raising',
    img: '/assets/images/dashboard/wade-avatar.png',
    date: 'Feb 14, 2022',
    logo: '/assets/images/dashboard/darrell-avatar.png',
    yourCarry: '20%',
    ffCarry: '2%',
    investorSince: 'Apr 2022',
    syndicateNumber: 10,
    lastInvestment: '3 Days ago',
    address: '4517 Washingtom Street, Ilasamaja, Lagos.',
    phoneNumber: '08130351992',
    dob: 'May 20, 2015',
    email: 'jide@future.africa',
    investorsAccreditation: 'I have at least $5M in investments',
    verificationProofLink: '',
    idProofLink: '',
    addressProofLink: '',
    investingActivity: '12 Months',
    totalInvested: '$25k - $50k',
    totalNumberOfInvestments: 43,
    investmentPercentage: '3%',
    commitmentAmount: '$50,000',
  },
];

export const fundManagerTableData: IFundManagerTableDataType[] = [
  {
    key: '1',
    name: 'Jide Abdul-Qudus',
    nationality: 'Nigerian',
    email: 'jide@future.africa',
    joined: 'Mar 2022',
    registrationFormat: 'Individual',
    status: 'Raising',
    img: '/assets/images/dashboard/wade-avatar.png',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phoneNumber: '13123121123',
    details: 'Future Africa 4517 Washington Ave. Manchester, Kentucky 39495',
    noOfSpvs: 10,
    existingNetwork: 'No',
    verificationProofLink: '',
    idProofLink: '',
  },
  {
    key: '2',
    name: 'Denike Johnson',
    nationality: 'Ivorien',
    email: 'denike@future.africa',
    registrationFormat: 'VC Behalf',
    status: 'Raising',
    joined: 'Mar 2022',
    img: '/assets/images/dashboard/cameron-avatar.png',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phoneNumber: '13123121123',
    details: 'Future Africa 4517 Washington Ave. Manchester, Kentucky 39495',
    noOfSpvs: 10,
    existingNetwork: 'No',
    verificationProofLink: '',
    idProofLink: '',
  },
  {
    key: '3',
    name: 'Abbey Ismail',
    nationality: 'Chadian',
    email: 'abbey@future.africa',
    registrationFormat: 'Individual',
    status: 'Raising',
    joined: 'Mar 2022',
    img: '/assets/images/dashboard/darrell-avatar.png',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    phoneNumber: '13123121123',
    details: 'Future Africa 4517 Washington Ave. Manchester, Kentucky 39495',
    noOfSpvs: 10,
    existingNetwork: 'No',
    verificationProofLink: '',
    idProofLink: '',
  },
];

export const investmentTerms = [
  'I understand that by completing the below, I will be subscribed to the set of closing documents that corresponds with the accreditation information I have previously provided. If I have indicated that I am a qualified purchaser (QP), I will be subscribing to the AngelList Access Fund advised by SAX Capital QP, LP. If I have indicated that I am an accredited investor, I will be subscribing to the AngelList Access Fund advised by SAX Capital, LP.',
  "I agree that I am legally committing to invest my subscription amount for at least 4 quarters and that there may be consequences, including the loss of prior quarterly contributions, if I don't fulfill my commitment.",
  'I understand that I will be subscribed to the set of closing documents that corresponds with the accreditation information I have previously provided. If I have indicated that I am a qualified purchaser (QP), I will be subscribing to the AngelList Access Fund advised by SAX Capital QP, LP. If I have indicated that I am an accredited investor, I will be subscribing to the AngelList Access Fund advised by SAX Capital, LP.',
  "I agree that I am legally to invest my subscription amount for at least 4 quarters and that there may be consequences, including the loss of prior quarterly contributions, if I don't fulfill my commitment.",
  "I agree that I am legally subscribing to invest my subscription amount for at least 4 quarters and that there may be consequences, including the loss of prior quarterly contributions, if I don't fulfill my commitment.",
];
