import { AgentPoint, Biller, MobileOperator, SavingsScheme, Transaction } from '../types/sheba';

export const BILLERS: Biller[] = [
  {
    id: 'desco',
    nameBn: 'ডেসকো (DESCO Prepaid & Postpaid)',
    nameEn: 'DESCO (Prepaid & Postpaid)',
    category: 'electricity',
    logoPlaceholder: '⚡',
    sampleBillNumber: '1029384756',
    feeTextBn: 'মাসে প্রথম ৩টি বিল সম্পূর্ণ ফ্রি',
    feeTextEn: 'First 3 bills free every month'
  },
  {
    id: 'dpdc',
    nameBn: 'ডিপিডিসি (DPDC Electricity)',
    nameEn: 'DPDC Electricity',
    category: 'electricity',
    logoPlaceholder: '💡',
    sampleBillNumber: '2938471625',
    feeTextBn: 'মাসে প্রথম ৩টি বিল সম্পূর্ণ ফ্রি',
    feeTextEn: 'First 3 bills free every month'
  },
  {
    id: 'breb',
    nameBn: 'পল্লী বিদ্যুৎ (BREB Samity)',
    nameEn: 'Polli Bidyut (BREB)',
    category: 'electricity',
    logoPlaceholder: '🌾',
    sampleBillNumber: '8947261901',
    feeTextBn: 'বিনামূল্যে পে করুন',
    feeTextEn: 'Pay with zero fee'
  },
  {
    id: 'nesco',
    nameBn: 'নেসকো (NESCO Rajshahi & Rangpur)',
    nameEn: 'NESCO (Northern Zone)',
    category: 'electricity',
    logoPlaceholder: '⚡',
    sampleBillNumber: '4839201948',
    feeTextBn: 'মাসে প্রথম ৩টি বিল ফ্রি',
    feeTextEn: 'First 3 bills free'
  },
  {
    id: 'dwasa',
    nameBn: 'ঢাকা ওয়াসা (Dhaka WASA)',
    nameEn: 'Dhaka WASA',
    category: 'water',
    logoPlaceholder: '💧',
    sampleBillNumber: '5566778899',
    feeTextBn: 'তাৎক্ষণিক ডিজিটাল রশিদ',
    feeTextEn: 'Instant digital token'
  },
  {
    id: 'titas',
    nameBn: 'তিতাস গ্যাস (Titas Gas Prepaid/Postpaid)',
    nameEn: 'Titas Gas Transmission',
    category: 'gas',
    logoPlaceholder: '🔥',
    sampleBillNumber: '7788990011',
    feeTextBn: 'কোনো বাড়তি চার্জ নেই',
    feeTextEn: 'No hidden surcharge'
  },
  {
    id: 'carnival',
    nameBn: 'কার্নিভাল ইন্টারনেট (Carnival Broadband)',
    nameEn: 'Carnival Internet',
    category: 'internet',
    logoPlaceholder: '🌐',
    sampleBillNumber: 'CRNV-99482',
    feeTextBn: 'মিনিটেই সংযোগ রিনিউয়াল',
    feeTextEn: 'Instant connection renewal'
  },
  {
    id: 'link3',
    nameBn: 'লিংকথ্রি টেকনোলজিস (Link3)',
    nameEn: 'Link3 Technologies',
    category: 'internet',
    logoPlaceholder: '📡',
    sampleBillNumber: 'L3-10294',
    feeTextBn: 'জিরো কনভেনিয়েন্স ফি',
    feeTextEn: 'Zero convenience fee'
  },
  {
    id: 'du',
    nameBn: 'ঢাকা বিশ্ববিদ্যালয় ভর্তি ও পরীক্ষা ফি',
    nameEn: 'Dhaka University Fees',
    category: 'education',
    logoPlaceholder: '🎓',
    sampleBillNumber: 'DU-2026-8819',
    feeTextBn: 'বাংলাদেশ ব্যাংক অনুমোদিত গেটওয়ে',
    feeTextEn: 'Bangladesh Bank approved'
  }
];

export const MOBILE_OPERATORS: MobileOperator[] = [
  {
    id: 'gp',
    name: 'Grameenphone',
    color: '#0085EC',
    prefixes: ['017', '013'],
    popularPacks: [
      { data: '5 GB', minutes: '150 Min', validity: '7 Days', price: 168, cashback: 10 },
      { data: '25 GB', minutes: '450 Min', validity: '30 Days', price: 498, cashback: 25 },
      { data: 'Unlimited 40 GB', minutes: '0 Min', validity: '30 Days', price: 599, cashback: 30 }
    ]
  },
  {
    id: 'bl',
    name: 'Banglalink',
    color: '#FF6200',
    prefixes: ['019', '014'],
    popularPacks: [
      { data: '8 GB', minutes: '100 Min', validity: '7 Days', price: 149, cashback: 15 },
      { data: '30 GB', minutes: '500 Min', validity: '30 Days', price: 449, cashback: 30 },
      { data: '60 GB Dhamaka', minutes: '0 Min', validity: '30 Days', price: 549, cashback: 40 }
    ]
  },
  {
    id: 'robi',
    name: 'Robi',
    color: '#E31B23',
    prefixes: ['018'],
    popularPacks: [
      { data: '6 GB', minutes: '200 Min', validity: '7 Days', price: 159, cashback: 10 },
      { data: '35 GB', minutes: '600 Min', validity: '30 Days', price: 529, cashback: 35 },
      { data: 'Super Combo 20 GB', minutes: '300 Min', validity: '30 Days', price: 398, cashback: 20 }
    ]
  },
  {
    id: 'airtel',
    name: 'Airtel',
    color: '#ED1C24',
    prefixes: ['016'],
    popularPacks: [
      { data: '10 GB', minutes: '150 Min', validity: '7 Days', price: 139, cashback: 10 },
      { data: '28 GB', minutes: '400 Min', validity: '30 Days', price: 418, cashback: 25 }
    ]
  },
  {
    id: 'teletalk',
    name: 'Teletalk',
    color: '#34A853',
    prefixes: ['015'],
    popularPacks: [
      { data: '15 GB', minutes: '100 Min', validity: '15 Days', price: 129, cashback: 10 },
      { data: '40 GB Bornomala', minutes: '300 Min', validity: '30 Days', price: 349, cashback: 20 }
    ]
  }
];

export const INITIAL_TRANSACTIONS: Transaction[] = [
  {
    id: 'trx-1',
    trxId: 'SHB99281742',
    type: 'send_money',
    titleBn: 'টাকা পাঠানো - প্রিয় নম্বর',
    titleEn: 'Send Money - Priyo Number',
    recipient: '01712-445566 (রাকিব হাসান)',
    amount: 1500,
    fee: 0,
    date: 'আজ, ০৩:৪৫ অপরাহ্ন',
    status: 'completed',
    balanceAfter: 14850.50
  },
  {
    id: 'trx-2',
    trxId: 'SHB88219034',
    type: 'remittance',
    titleBn: 'প্রবাসী রেমিট্যান্স ও সরকারি বোনাস',
    titleEn: 'Foreign Remittance + 2.5% Govt Incentive',
    recipient: 'Western Union (দুবাই এক্সচেঞ্জ)',
    amount: 12500,
    fee: 0,
    date: 'গতকাল, ১১:২০ পূর্বাহ্ন',
    status: 'completed',
    balanceAfter: 16350.50
  },
  {
    id: 'trx-3',
    trxId: 'SHB77123490',
    type: 'pay_bill',
    titleBn: 'ডেসকো বিদ্যুৎ বিল পরিশোধ',
    titleEn: 'DESCO Prepaid Electricity Bill',
    recipient: 'মুনশিগঞ্জ আবাসিক মিটার #99482',
    amount: 2150,
    fee: 0,
    date: '০২ অক্টোবর, ২০২৬',
    status: 'completed',
    balanceAfter: 3850.50
  },
  {
    id: 'trx-4',
    trxId: 'SHB66284910',
    type: 'merchant_pay',
    titleBn: 'স্বপ্ন সুপারশপ বাংলা কিউআর পেমেন্ট',
    titleEn: 'Shwapno Super Shop Bangla QR',
    recipient: 'স্বপ্ন ধানমন্ডি আউটলেট',
    amount: 1840,
    fee: 0,
    date: '০১ অক্টোবর, ২০২৬',
    status: 'completed',
    balanceAfter: 6000.50
  },
  {
    id: 'trx-5',
    trxId: 'SHB55102934',
    type: 'mobile_recharge',
    titleBn: 'মোবাইল রিচার্জ (গ্রামীনফোন)',
    titleEn: 'Mobile Recharge (Grameenphone)',
    recipient: '01799-887766',
    amount: 198,
    fee: 0,
    date: '২৯ সেপ্টেম্বর, ২০২৬',
    status: 'completed',
    balanceAfter: 7840.50
  }
];

export const SAVINGS_SCHEMES: SavingsScheme[] = [
  {
    id: 'dps-brac',
    partnerBank: 'BRAC Bank PLC',
    type: 'general',
    titleBn: 'ব্র্যাক ব্যাংক ফিউচার সেভিংস ডিপিএস',
    titleEn: 'BRAC Bank Future Savings DPS',
    tenureMonths: 24,
    profitRate: '৮.৭৫%',
    minMonthlyDeposit: 500
  },
  {
    id: 'dps-city-islamic',
    partnerBank: 'The City Bank (City Islamic)',
    type: 'islamic',
    titleBn: 'সিটি ইসলামিক মুদারাবা সঞ্চয় স্কিম',
    titleEn: 'City Islamic Mudaraba Savings Scheme',
    tenureMonths: 36,
    profitRate: '৯.১০% (প্রত্যাশিত মুনাফা)',
    minMonthlyDeposit: 1000
  },
  {
    id: 'dps-idlc',
    partnerBank: 'IDLC Finance',
    type: 'general',
    titleBn: 'আইডিএলসি শিশু শিক্ষা ও প্রবৃদ্ধি সঞ্চয়',
    titleEn: 'IDLC Child Education & Growth DPS',
    tenureMonths: 60,
    profitRate: '৯.৫০%',
    minMonthlyDeposit: 1000
  }
];

export const AGENT_POINTS: AgentPoint[] = [
  {
    id: 'ag-dhk-1',
    nameBn: 'মায়ের দোয়া সেবা পয়েন্ট ও টেলিকম',
    nameEn: "Mayer Doa Sheba Point & Telecom",
    agentCode: 'SHB-DHK-4012',
    ownerName: 'মো: রফিকুল ইসলাম',
    division: 'Dhaka',
    district: 'Dhaka',
    thana: 'Dhanmondi',
    addressBn: 'রোড ৭/এ, বাড়ি ২৩ (সোবহানবাগ জামে মসজিদ সংলগ্ন), ধানমন্ডি, ঢাকা',
    addressEn: 'Road 7/A, House 23 (Near Sobhanbagh Mosque), Dhanmondi, Dhaka',
    phone: '01711-239841',
    services: ['cash_in', 'cash_out', 'sim_reg', 'utility_bill', 'remittance'],
    rating: 4.9,
    isOpenNow: true
  },
  {
    id: 'ag-dhk-2',
    nameBn: 'খান এন্টারপ্রাইজ ও শেবা ডিজিটাল সেবা',
    nameEn: 'Khan Enterprise & Sheba Digital Point',
    agentCode: 'SHB-DHK-5521',
    ownerName: 'মাহমুদুল হাসান খান',
    division: 'Dhaka',
    district: 'Dhaka',
    thana: 'Mirpur',
    addressBn: 'মিরপুর ১০ গোলচত্বর, আল-হেলাল হাসপাতাল বিপরীতে, ঢাকা',
    addressEn: 'Mirpur 10 Circle, Opp. Al-Helal Hospital, Dhaka',
    phone: '01914-778899',
    services: ['cash_in', 'cash_out', 'utility_bill', 'remittance'],
    rating: 4.8,
    isOpenNow: true
  },
  {
    id: 'ag-ctg-1',
    nameBn: 'কর্ণফুলী সেবা কেন্দ্র ও ভ্যারাইটিজ',
    nameEn: 'Karnaphuli Sheba Center & Varieties',
    agentCode: 'SHB-CTG-2091',
    ownerName: 'ফারুক আহমেদ চৌধুরী',
    division: 'Chittagong',
    district: 'Chittagong',
    thana: 'Panchlaish',
    addressBn: 'জিইসি মোড়, সেন্ট্রাল প্লাজার সামনে, পাঁচলাইশ, চট্টগ্রাম',
    addressEn: 'GEC Circle, In front of Central Plaza, Chittagong',
    phone: '01819-334455',
    services: ['cash_in', 'cash_out', 'remittance', 'utility_bill'],
    rating: 4.9,
    isOpenNow: true
  },
  {
    id: 'ag-syl-1',
    nameBn: 'সুরমা প্রবাসী সেবা ও রেমিট্যান্স কর্ণার',
    nameEn: 'Surma Expatriate Sheba & Remittance Point',
    agentCode: 'SHB-SYL-1108',
    ownerName: 'আনিসুর রহমান শামীম',
    division: 'Sylhet',
    district: 'Sylhet',
    thana: 'Kotwali',
    addressBn: 'জিন্দাবাজার, আল-হামরা শপিং সিটির নিচতলা, সিলেট',
    addressEn: 'Zindabazar, Al-Hamra Shopping City G-Floor, Sylhet',
    phone: '01712-889900',
    services: ['cash_in', 'cash_out', 'remittance', 'utility_bill', 'sim_reg'],
    rating: 5.0,
    isOpenNow: true
  },
  {
    id: 'ag-raj-1',
    nameBn: 'পদ্মা টেলিকম ও শেবা পয়েন্ট',
    nameEn: 'Padma Telecom & Sheba Uddokta',
    agentCode: 'SHB-RAJ-3312',
    ownerName: 'মো: আব্দুল আলিম',
    division: 'Rajshahi',
    district: 'Rajshahi',
    thana: 'Boalia',
    addressBn: 'সাহেব বাজার জিরো পয়েন্ট, রাজশাহী',
    addressEn: 'Shaheb Bazar Zero Point, Rajshahi',
    phone: '01730-112233',
    services: ['cash_in', 'cash_out', 'utility_bill'],
    rating: 4.7,
    isOpenNow: true
  },
  {
    id: 'ag-khl-1',
    nameBn: 'সুন্দরবন ডিজিটাল এক্সপ্রেস',
    nameEn: 'Sundarban Digital Express',
    agentCode: 'SHB-KHL-4490',
    ownerName: 'সুমন মন্ডল',
    division: 'Khulna',
    district: 'Khulna',
    thana: 'Sadar',
    addressBn: 'ডাকবাংলা মোড়, পিকচার প্যালেস সংলগ্ন, খুলনা',
    addressEn: 'Dakbangla Mor, Adjacent to Picture Palace, Khulna',
    phone: '01922-334411',
    services: ['cash_in', 'cash_out', 'remittance', 'utility_bill'],
    rating: 4.8,
    isOpenNow: true
  },
  {
    id: 'ag-bar-1',
    nameBn: 'কীর্তনখোলা সেবা এজেন্ট',
    nameEn: 'Kirtankhola Sheba Agent',
    agentCode: 'SHB-BAR-1920',
    ownerName: 'এইচ এম কামরুল',
    division: 'Barishal',
    district: 'Barishal',
    thana: 'Kotwali',
    addressBn: 'সদর রোড, টাউন হলের বিপরীতে, বরিশাল',
    addressEn: 'Sadar Road, Opposite Town Hall, Barishal',
    phone: '01714-556677',
    services: ['cash_in', 'cash_out', 'utility_bill'],
    rating: 4.8,
    isOpenNow: true
  },
  {
    id: 'ag-rng-1',
    nameBn: 'রংপুর তিস্তা ডিজিটাল সার্ভিস',
    nameEn: 'Rangpur Teesta Digital Service',
    agentCode: 'SHB-RNG-8812',
    ownerName: 'নুরুল ইসলাম নয়ন',
    division: 'Rangpur',
    district: 'Rangpur',
    thana: 'Sadar',
    addressBn: 'জাহাজ কোম্পানি মোড়, স্টেশন রোড, রংপুর',
    addressEn: 'Jahaj Company Mor, Station Road, Rangpur',
    phone: '01715-667788',
    services: ['cash_in', 'cash_out', 'remittance'],
    rating: 4.9,
    isOpenNow: true
  },
  {
    id: 'ag-mym-1',
    nameBn: 'ব্রহ্মপুত্র সেবা পয়েন্ট',
    nameEn: 'Brahmaputra Sheba Point',
    agentCode: 'SHB-MYM-5531',
    ownerName: 'সাইফুল ইসলাম রাসেল',
    division: 'Mymensingh',
    district: 'Mymensingh',
    thana: 'Sadar',
    addressBn: 'গাঙ্গিনার পাড় মোড়, ময়মনসিংহ',
    addressEn: 'Ganginar Par Mor, Mymensingh',
    phone: '01918-990011',
    services: ['cash_in', 'cash_out', 'utility_bill'],
    rating: 4.7,
    isOpenNow: true
  }
];

export const BANGLADESH_DIVISIONS = [
  'All Divisions',
  'Dhaka',
  'Chittagong',
  'Sylhet',
  'Rajshahi',
  'Khulna',
  'Barishal',
  'Rangpur',
  'Mymensingh'
];
