export type Language = 'bn' | 'en';

export interface Transaction {
  id: string;
  trxId: string;
  type: 'send_money' | 'cash_out' | 'cash_in' | 'mobile_recharge' | 'pay_bill' | 'merchant_pay' | 'remittance';
  titleBn: string;
  titleEn: string;
  recipient: string;
  amount: number;
  fee: number;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  balanceAfter: number;
}

export interface Biller {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'electricity' | 'water' | 'gas' | 'internet' | 'education' | 'govt';
  logoPlaceholder: string;
  sampleBillNumber: string;
  feeTextBn: string;
  feeTextEn: string;
}

export interface MobileOperator {
  id: string;
  name: string;
  color: string;
  prefixes: string[];
  popularPacks: {
    data: string;
    minutes: string;
    validity: string;
    price: number;
    cashback?: number;
  }[];
}

export interface AgentPoint {
  id: string;
  nameBn: string;
  nameEn: string;
  agentCode: string;
  ownerName: string;
  division: string;
  district: string;
  thana: string;
  addressBn: string;
  addressEn: string;
  phone: string;
  services: ('cash_in' | 'cash_out' | 'sim_reg' | 'utility_bill' | 'remittance')[];
  rating: number;
  isOpenNow: boolean;
}

export interface SavingsScheme {
  id: string;
  partnerBank: string;
  type: 'islamic' | 'general';
  titleBn: string;
  titleEn: string;
  tenureMonths: number;
  profitRate: string;
  minMonthlyDeposit: number;
}
