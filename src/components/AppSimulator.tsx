import React, { useState } from 'react';
import { Language, Transaction, Biller, MobileOperator } from '../types/sheba';
import { TRANSLATIONS } from '../data/translations';
import { BILLERS, MOBILE_OPERATORS, INITIAL_TRANSACTIONS, SAVINGS_SCHEMES } from '../data/shebaData';
import {
  Send,
  Zap,
  ArrowDownToLine,
  Receipt,
  PiggyBank,
  Globe,
  QrCode,
  Hash,
  Eye,
  EyeOff,
  CheckCircle2,
  X,
  Copy,
  Check,
  Search,
  RefreshCw,
  PhoneCall,
  User,
  Bell
} from 'lucide-react';

interface AppSimulatorProps {
  lang: Language;
  initialAction?: string | null;
}

export const AppSimulator: React.FC<AppSimulatorProps> = ({ lang, initialAction }) => {
  const t = TRANSLATIONS[lang];

  // Simulator State
  const [balance, setBalance] = useState<number>(14850.5);
  const [isBalanceVisible, setIsBalanceVisible] = useState<boolean>(false);
  const [balanceTapping, setBalanceTapping] = useState<boolean>(false);
  const [transactions, setTransactions] = useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [activeTab, setActiveTab] = useState<string>(initialAction || 'overview');

  // Modal / Action Flows
  const [selectedAction, setSelectedAction] = useState<string | null>(null);
  const [copiedTrxId, setCopiedTrxId] = useState<string | null>(null);

  // Send Money Form
  const [sendRecipient, setSendRecipient] = useState<string>('01712-445566');
  const [sendAmount, setSendAmount] = useState<number>(500);
  const [sendPin, setSendPin] = useState<string>('');
  const [isPriyo, setIsPriyo] = useState<boolean>(true);
  const [isHolding, setIsHolding] = useState<boolean>(false);
  const [holdProgress, setHoldProgress] = useState<number>(0);
  const [holdInterval, setHoldInterval] = useState<any>(null);

  // Recharge Form
  const [selectedOperator, setSelectedOperator] = useState<MobileOperator>(MOBILE_OPERATORS[0]);
  const [rechargeNumber, setRechargeNumber] = useState<string>('01711-223344');
  const [rechargeAmount, setRechargeAmount] = useState<number>(168);

  // Bill Pay Form
  const [selectedBiller, setSelectedBiller] = useState<Biller>(BILLERS[0]);
  const [billAccountNo, setBillAccountNo] = useState<string>('1029384756');
  const [billAmount, setBillAmount] = useState<number>(1850);

  // USSD Dial Simulator
  const [ussdInput, setUssdInput] = useState<string>('*266#');
  const [ussdDialog, setUssdDialog] = useState<string | null>(null);

  // Success Receipt
  const [lastReceipt, setLastReceipt] = useState<Transaction | null>(null);

  // Tap balance effect
  const handleTapBalance = () => {
    setBalanceTapping(true);
    setIsBalanceVisible(true);
    setTimeout(() => {
      setBalanceTapping(false);
    }, 400);

    // Auto-hide balance after 5 seconds to match genuine MFS app behavior
    setTimeout(() => {
      setIsBalanceVisible(false);
    }, 5000);
  };

  // Hold-to-confirm logic for Send Money
  const startHolding = () => {
    if (!sendPin || sendPin.length < 4) {
      alert(lang === 'bn' ? 'দয়া করে ৪ বা ৫ ডিজিটের গোপন পিন দিন' : 'Please enter 4 or 5-digit PIN');
      return;
    }
    if (sendAmount <= 0 || sendAmount > balance) {
      alert(lang === 'bn' ? 'পর্যাপ্ত ব্যালেন্স নেই বা ভুল পরিমাণ' : 'Insufficient balance or invalid amount');
      return;
    }

    setIsHolding(true);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setHoldProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        finalizeSendMoney();
      }
    }, 80);
    setHoldInterval(interval);
  };

  const stopHolding = () => {
    if (holdInterval) {
      clearInterval(holdInterval);
      setHoldInterval(null);
    }
    setIsHolding(false);
    setHoldProgress(0);
  };

  const finalizeSendMoney = () => {
    const fee = isPriyo ? 0 : 5;
    const totalDeducted = sendAmount + fee;
    const updatedBalance = balance - totalDeducted;
    setBalance(updatedBalance);

    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      trxId: `SHB${randomSuffix}`,
      type: 'send_money',
      titleBn: isPriyo ? 'টাকা পাঠানো - প্রিয় নম্বর (ফ্রি)' : 'টাকা পাঠানো - রেগুলার নম্বর',
      titleEn: isPriyo ? 'Send Money - Priyo (Free)' : 'Send Money - Regular',
      recipient: sendRecipient,
      amount: sendAmount,
      fee: fee,
      date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
      status: 'completed',
      balanceAfter: updatedBalance
    };

    setTransactions([newTrx, ...transactions]);
    setLastReceipt(newTrx);
    setSelectedAction(null);
    setSendPin('');
    setIsHolding(false);
    setHoldProgress(0);
  };

  const finalizeRecharge = () => {
    if (rechargeAmount <= 0 || rechargeAmount > balance) {
      alert(lang === 'bn' ? 'পর্যাপ্ত ব্যালেন্স নেই' : 'Insufficient balance');
      return;
    }

    const updatedBalance = balance - rechargeAmount;
    setBalance(updatedBalance);

    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      trxId: `SHB${randomSuffix}`,
      type: 'mobile_recharge',
      titleBn: `মোবাইল রিচার্জ (${selectedOperator.name})`,
      titleEn: `Mobile Recharge (${selectedOperator.name})`,
      recipient: rechargeNumber,
      amount: rechargeAmount,
      fee: 0,
      date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
      status: 'completed',
      balanceAfter: updatedBalance
    };

    setTransactions([newTrx, ...transactions]);
    setLastReceipt(newTrx);
    setSelectedAction(null);
  };

  const finalizeBillPay = () => {
    if (billAmount <= 0 || billAmount > balance) {
      alert(lang === 'bn' ? 'পর্যাপ্ত ব্যালেন্স নেই' : 'Insufficient balance');
      return;
    }

    const updatedBalance = balance - billAmount;
    setBalance(updatedBalance);

    const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
    const newTrx: Transaction = {
      id: `trx-${Date.now()}`,
      trxId: `SHB${randomSuffix}`,
      type: 'pay_bill',
      titleBn: `${selectedBiller.nameBn} পরিশোধ`,
      titleEn: `${selectedBiller.nameEn} Payment`,
      recipient: `অ্যাকাউন্ট নং: ${billAccountNo}`,
      amount: billAmount,
      fee: 0,
      date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
      status: 'completed',
      balanceAfter: updatedBalance
    };

    setTransactions([newTrx, ...transactions]);
    setLastReceipt(newTrx);
    setSelectedAction(null);
  };

  // USSD Dialing
  const handleDialUssd = () => {
    if (ussdInput.trim() === '*266#') {
      setUssdDialog(
        lang === 'bn'
          ? `সেবা ইউএসএসডি মেনু (*266#):\n1. সেন্ড মানি\n2. মোবাইল রিচার্জ\n3. ক্যাশ আউট\n4. পে বিল\n5. ডিপিএস ও সঞ্চয়\n6. রেমিট্যান্স তথ্য\n7. মাই সেবা (ব্যালেন্স ও পিন)`
          : `Sheba USSD Menu (*266#):\n1. Send Money\n2. Buy Airtime\n3. Cash Out\n4. Pay Bill\n5. Savings & DPS\n6. Remittance Info\n7. My Sheba (Balance & PIN)`
      );
    } else {
      setUssdDialog(
        lang === 'bn'
          ? `ভুল ইউএসএসডি কোড। সেবা ব্যবহার করতে *266# ডায়াল করুন।`
          : `Invalid USSD code. Dial *266# for Sheba MFS.`
      );
    }
  };

  const handleCopyTrx = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedTrxId(text);
    setTimeout(() => setCopiedTrxId(null), 2000);
  };

  return (
    <section id="simulator" className="py-20 bg-neutral-100 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="text-xs font-semibold text-emerald-800 tracking-wide mb-2">
            {lang === 'bn' ? 'লাইভ ইন্টারঅ্যাক্টিভ পোর্টাল' : 'LIVE INTERACTIVE SIMULATOR'}
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900">
            {t.simulator.title}
          </h2>
          <p className="text-base text-neutral-600 mt-2">
            {t.simulator.subtitle}
          </p>
        </div>

        {/* Simulator Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive Mobile Frame */}
          <div className="lg:col-span-6 xl:col-span-5 flex justify-center">
            <div className="w-full max-w-[390px] bg-neutral-900 rounded-[44px] p-3 shadow-2xl border-4 border-neutral-800 relative">
              {/* Phone Speaker Notch */}
              <div className="w-32 h-5 bg-neutral-950 rounded-full mx-auto mb-2 flex items-center justify-center">
                <div className="w-3 h-3 rounded-full bg-neutral-800 mr-2" />
                <div className="w-10 h-1 bg-neutral-800 rounded-full" />
              </div>

              {/* Inside Phone Screen */}
              <div className="bg-white rounded-[36px] overflow-hidden min-h-[640px] flex flex-col border border-neutral-100 text-neutral-900">
                {/* App Top Bar */}
                <div className="bg-emerald-800 text-white px-5 pt-4 pb-5">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white font-bold text-sm">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-[10px] text-emerald-300 font-bold font-mono-numbers">
                          shebabd.org
                        </div>
                        <div className="text-sm font-bold tracking-tight">
                          {lang === 'bn' ? 'তানভীর আহমেদ' : 'Tanvir Ahmed'}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setSelectedAction('ussd')}
                        className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                        title="USSD *266#"
                      >
                        <Hash className="w-4 h-4 text-emerald-100" />
                      </button>
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center">
                        <Bell className="w-4 h-4 text-emerald-100" />
                      </div>
                    </div>
                  </div>

                  {/* Tap to Reveal Balance (Authentic Bangladeshi MFS Experience) */}
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleTapBalance}
                      className={`relative flex items-center gap-2 px-5 py-2 rounded-full text-xs font-semibold tracking-wide transition-all cursor-pointer ${
                        isBalanceVisible
                          ? 'bg-emerald-950/40 text-emerald-100 border border-emerald-500/40'
                          : 'bg-white text-emerald-900 shadow-md hover:bg-emerald-50'
                      }`}
                    >
                      {balanceTapping && (
                        <span className="absolute inset-0 rounded-full bg-white/20 animate-ping" />
                      )}
                      {isBalanceVisible ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5 text-emerald-300" />
                          <span className="font-mono-numbers text-sm font-bold">
                            ৳ {balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                          </span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5 text-emerald-700" />
                          <span>{t.simulator.tapBalance}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Main Screen Content */}
                <div className="flex-1 p-4 bg-neutral-50 space-y-4 overflow-y-auto max-h-[500px]">
                  {/* Quick Action 8-Grid */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200/80">
                    <div className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider mb-3">
                      {lang === 'bn' ? 'সেবা সার্ভিসেস' : 'SHEBA SERVICES'}
                    </div>

                    <div className="grid grid-cols-4 gap-3 text-center">
                      {/* Send Money */}
                      <button
                        onClick={() => setSelectedAction('send')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 group-hover:bg-emerald-100 text-emerald-800 flex items-center justify-center transition-colors">
                          <Send className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.send}
                        </span>
                      </button>

                      {/* Recharge */}
                      <button
                        onClick={() => setSelectedAction('recharge')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-orange-100 text-orange-700 flex items-center justify-center transition-colors">
                          <Zap className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.recharge}
                        </span>
                      </button>

                      {/* Cash Out */}
                      <button
                        onClick={() => setSelectedAction('cashout')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-blue-50 group-hover:bg-blue-100 text-blue-800 flex items-center justify-center transition-colors">
                          <ArrowDownToLine className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.cashout}
                        </span>
                      </button>

                      {/* Pay Bill */}
                      <button
                        onClick={() => setSelectedAction('paybill')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-amber-50 group-hover:bg-amber-100 text-amber-800 flex items-center justify-center transition-colors">
                          <Receipt className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.paybill}
                        </span>
                      </button>

                      {/* Savings */}
                      <button
                        onClick={() => setSelectedAction('savings')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-teal-50 group-hover:bg-teal-100 text-teal-800 flex items-center justify-center transition-colors">
                          <PiggyBank className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.savings}
                        </span>
                      </button>

                      {/* Remittance */}
                      <button
                        onClick={() => setSelectedAction('remittance')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-indigo-50 group-hover:bg-indigo-100 text-indigo-800 flex items-center justify-center transition-colors">
                          <Globe className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.remittance}
                        </span>
                      </button>

                      {/* QR Pay */}
                      <button
                        onClick={() => setSelectedAction('qr')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-purple-50 group-hover:bg-purple-100 text-purple-800 flex items-center justify-center transition-colors">
                          <QrCode className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.qr}
                        </span>
                      </button>

                      {/* USSD Dial */}
                      <button
                        onClick={() => setSelectedAction('ussd')}
                        className="flex flex-col items-center group cursor-pointer"
                      >
                        <div className="w-12 h-12 rounded-2xl bg-neutral-100 group-hover:bg-neutral-200 text-neutral-800 flex items-center justify-center transition-colors">
                          <Hash className="w-5 h-5" />
                        </div>
                        <span className="text-[11px] font-semibold text-neutral-700 mt-1.5 line-clamp-1">
                          {t.simulator.quickActions.ussd}
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Promotional Offer Banner inside App */}
                  <div className="bg-gradient-to-r from-emerald-800 to-teal-800 text-white rounded-2xl p-4">
                    <div className="text-xs font-bold text-emerald-300">
                      {lang === 'bn' ? 'প্রিয় নম্বর অফার' : 'PRIYO NUMBER OFFER'}
                    </div>
                    <div className="text-sm font-semibold mt-1">
                      {lang === 'bn'
                        ? 'প্রিয় ৫টি নম্বরে সেন্ড মানি সম্পূর্ণ ফ্রি!'
                        : 'Free Send Money to your top 5 Priyo numbers!'}
                    </div>
                    <div className="text-[11px] text-emerald-100/80 mt-1">
                      {lang === 'bn' ? 'মাসে ২৫,০০০ টাকা পর্যন্ত ৳০ চার্জ' : 'Up to ৳25,000 per month with 0 charge'}
                    </div>
                  </div>

                  {/* Recent Transactions in App */}
                  <div className="bg-white rounded-2xl p-4 shadow-sm border border-neutral-200/80">
                    <div className="flex items-center justify-between mb-3">
                      <div className="text-xs font-bold text-neutral-900">
                        {t.simulator.recentTrx}
                      </div>
                      <span className="text-[11px] text-emerald-700 font-semibold cursor-pointer">
                        {t.simulator.viewAll}
                      </span>
                    </div>

                    <div className="divide-y divide-neutral-100">
                      {transactions.slice(0, 3).map((item) => (
                        <div key={item.id} className="py-2.5 flex items-center justify-between">
                          <div>
                            <div className="text-xs font-semibold text-neutral-900">
                              {lang === 'bn' ? item.titleBn : item.titleEn}
                            </div>
                            <div className="text-[10px] text-neutral-500 font-mono-numbers">
                              {item.recipient} · {item.date}
                            </div>
                          </div>
                          <div className="text-right">
                            <div
                              className={`text-xs font-bold font-mono-numbers ${
                                item.type === 'remittance' || item.type === 'cash_in'
                                  ? 'text-emerald-700'
                                  : 'text-neutral-900'
                              }`}
                            >
                              {item.type === 'remittance' || item.type === 'cash_in' ? '+' : '-'}
                              ৳ {item.amount.toLocaleString()}
                            </div>
                            <div className="text-[9px] text-neutral-400 font-mono-numbers">
                              Trx: {item.trxId}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Modals & Transaction Manager */}
          <div className="lg:col-span-6 xl:col-span-7 space-y-6">
            {/* Context Box / Action Card */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
              {/* If an action is selected, render interactive flow */}
              {selectedAction === 'send' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Send className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {t.simulator.sendMoneyTitle}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.simulator.enterMobile}
                      </label>
                      <input
                        type="text"
                        value={sendRecipient}
                        onChange={(e) => setSendRecipient(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-mono-numbers"
                        placeholder="017XXXXXXXX"
                      />
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                      <div>
                        <div className="text-xs font-bold text-emerald-900">
                          {lang === 'bn' ? 'প্রিয় নম্বর স্ট্যাটাস' : 'Priyo Number Status'}
                        </div>
                        <div className="text-[11px] text-emerald-700">
                          {isPriyo
                            ? lang === 'bn'
                              ? '০ টাকা চার্জ (ফ্রি)'
                              : '৳0 Charge (Free transfer)'
                            : lang === 'bn'
                            ? 'রেগুলার চার্জ ৫ টাকা'
                            : 'Regular ৳5 fee'}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setIsPriyo(!isPriyo)}
                        className="text-xs font-semibold text-emerald-800 underline cursor-pointer"
                      >
                        {isPriyo
                          ? lang === 'bn'
                            ? 'রেগুলার করুন'
                            : 'Make Regular'
                          : lang === 'bn'
                          ? 'প্রিয় করুন'
                          : 'Set Priyo'}
                      </button>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.simulator.enterAmount}
                      </label>
                      <div className="relative">
                        <span className="absolute left-3.5 top-2.5 text-neutral-400 font-bold">৳</span>
                        <input
                          type="number"
                          value={sendAmount}
                          onChange={(e) => setSendAmount(Number(e.target.value))}
                          className="w-full pl-8 pr-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-mono-numbers font-bold"
                          min={10}
                          max={25000}
                        />
                      </div>
                      <div className="text-[11px] text-neutral-500 mt-1">
                        {lang === 'bn' ? 'উপলব্ধ ব্যালেন্স: ' : 'Available Balance: '}
                        <span className="font-mono-numbers font-semibold">৳ {balance.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-neutral-700 mb-1">
                        {t.simulator.enterPin}
                      </label>
                      <input
                        type="password"
                        maxLength={5}
                        value={sendPin}
                        onChange={(e) => setSendPin(e.target.value)}
                        placeholder="•••••"
                        className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 focus:outline-none focus:ring-2 focus:ring-emerald-600 text-sm font-mono-numbers tracking-widest"
                      />
                    </div>

                    {/* Press and Hold Confirmation Bar */}
                    <div className="pt-2">
                      <div className="text-xs text-center text-neutral-500 mb-2">
                        {t.simulator.confirmHold}
                      </div>
                      <button
                        type="button"
                        onMouseDown={startHolding}
                        onMouseUp={stopHolding}
                        onMouseLeave={stopHolding}
                        onTouchStart={startHolding}
                        onTouchEnd={stopHolding}
                        className="relative w-full h-12 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl overflow-hidden transition-all shadow-md cursor-pointer select-none"
                      >
                        <div
                          className="absolute left-0 top-0 bottom-0 bg-emerald-950/40 transition-all duration-75"
                          style={{ width: `${holdProgress}%` }}
                        />
                        <span className="relative z-10 flex items-center justify-center gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>
                            {holdProgress > 0
                              ? `${holdProgress}% ...`
                              : lang === 'bn'
                              ? 'চাপ দিয়ে ধরে রাখুন'
                              : 'Press & Hold to Confirm'}
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Recharge Action */}
              {selectedAction === 'recharge' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Zap className="w-5 h-5 text-orange-600" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'মোবাইল রিচার্জ' : 'Mobile Recharge'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Operator Selector */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-2">
                      {lang === 'bn' ? 'অপারেটর নির্বাচন করুন' : 'Select Mobile Operator'}
                    </label>
                    <div className="grid grid-cols-5 gap-2">
                      {MOBILE_OPERATORS.map((op) => (
                        <button
                          key={op.id}
                          onClick={() => setSelectedOperator(op)}
                          className={`p-2 rounded-lg border text-center transition-all cursor-pointer ${
                            selectedOperator.id === op.id
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900 font-bold shadow-sm'
                              : 'border-neutral-200 hover:border-neutral-300 text-neutral-700'
                          }`}
                        >
                          <div className="text-xs">{op.name}</div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Number */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'মোবাইল নম্বর' : 'Mobile Number'}
                    </label>
                    <input
                      type="text"
                      value={rechargeNumber}
                      onChange={(e) => setRechargeNumber(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-mono-numbers"
                    />
                  </div>

                  {/* Popular Packs */}
                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'জনপ্রিয় ইন্টারনেট ও বান্ডেল প্যাক' : 'Popular Data & Minute Packs'}
                    </label>
                    <div className="space-y-2">
                      {selectedOperator.popularPacks.map((pack, idx) => (
                        <div
                          key={idx}
                          onClick={() => setRechargeAmount(pack.price)}
                          className={`p-3 rounded-lg border flex items-center justify-between cursor-pointer transition-all ${
                            rechargeAmount === pack.price
                              ? 'border-emerald-600 bg-emerald-50'
                              : 'border-neutral-200 hover:border-neutral-300'
                          }`}
                        >
                          <div>
                            <div className="text-xs font-bold text-neutral-900">
                              {pack.data} {pack.minutes !== '0 Min' ? `+ ${pack.minutes}` : ''}
                            </div>
                            <div className="text-[11px] text-neutral-500">
                              {lang === 'bn' ? `মেয়াদ: ${pack.validity}` : `Validity: ${pack.validity}`}
                              {pack.cashback && (
                                <span className="ml-2 font-semibold text-emerald-700">
                                  +{pack.cashback} ৳ {lang === 'bn' ? 'ক্যাশব্যাক' : 'Cashback'}
                                </span>
                              )}
                            </div>
                          </div>
                          <div className="text-sm font-bold text-neutral-900 font-mono-numbers">
                            ৳ {pack.price}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={finalizeRecharge}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? `৳ ${rechargeAmount} রিচার্জ করুন` : `Recharge ৳ ${rechargeAmount}`}
                  </button>
                </div>
              )}

              {/* Pay Bill Action */}
              {selectedAction === 'paybill' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Receipt className="w-5 h-5 text-amber-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'ইউটিলিটি ও শিক্ষা বিল পরিশোধ' : 'Pay Utility & Education Bill'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'প্রতিষ্ঠান নির্বাচন করুন' : 'Select Biller / Organization'}
                    </label>
                    <select
                      value={selectedBiller.id}
                      onChange={(e) => {
                        const biller = BILLERS.find((b) => b.id === e.target.value);
                        if (biller) {
                          setSelectedBiller(biller);
                          setBillAccountNo(biller.sampleBillNumber);
                        }
                      }}
                      className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 text-sm focus:ring-2 focus:ring-emerald-600"
                    >
                      {BILLERS.map((b) => (
                        <option key={b.id} value={b.id}>
                          {lang === 'bn' ? b.nameBn : b.nameEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'গ্রাহক / মিটার / স্টুডেন্ট আইডি' : 'Customer / Meter / Student ID'}
                    </label>
                    <input
                      type="text"
                      value={billAccountNo}
                      onChange={(e) => setBillAccountNo(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-mono-numbers"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-neutral-700 mb-1">
                      {lang === 'bn' ? 'বিলের পরিমাণ (৳)' : 'Bill Amount (৳)'}
                    </label>
                    <input
                      type="number"
                      value={billAmount}
                      onChange={(e) => setBillAmount(Number(e.target.value))}
                      className="w-full px-3.5 py-2 rounded-lg border border-neutral-300 text-sm font-mono-numbers font-bold"
                    />
                  </div>

                  <div className="p-3 bg-neutral-50 rounded-lg text-xs text-neutral-600">
                    <span className="font-semibold text-emerald-800">
                      {lang === 'bn' ? selectedBiller.feeTextBn : selectedBiller.feeTextEn}
                    </span>
                  </div>

                  <button
                    onClick={finalizeBillPay}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? `৳ ${billAmount} বিল পে নিশ্চিত করুন` : `Confirm Pay Bill ৳ ${billAmount}`}
                  </button>
                </div>
              )}

              {/* Savings & DPS Info */}
              {selectedAction === 'savings' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <PiggyBank className="w-5 h-5 text-teal-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'সেবা সঞ্চয় ও ডিপিএস' : 'Sheba Savings & DPS'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <p className="text-xs text-neutral-600">
                    {lang === 'bn'
                      ? 'বাংলাদেশ ব্যাংক নির্দেশিত শীর্ষস্থানীয় ব্যাংক ও আর্থিক প্রতিষ্ঠানের সাথে ঝামেলাহীন ডিজিটাল ডিপিএস।'
                      : 'Hassle-free digital micro-DPS integrated with Bangladesh Bank licensed financial institutions.'}
                  </p>

                  <div className="space-y-3">
                    {SAVINGS_SCHEMES.map((scheme) => (
                      <div
                        key={scheme.id}
                        className="p-3.5 rounded-xl border border-neutral-200 hover:border-emerald-500 transition-colors bg-neutral-50/50"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-xs font-bold text-neutral-900">
                            {lang === 'bn' ? scheme.titleBn : scheme.titleEn}
                          </div>
                          <span className="text-xs font-bold text-emerald-700 font-mono-numbers">
                            {scheme.profitRate}
                          </span>
                        </div>
                        <div className="text-[11px] text-neutral-500 mt-1">
                          {scheme.partnerBank} · {scheme.tenureMonths} Months · Min ৳{scheme.minMonthlyDeposit}/mo
                        </div>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => {
                      alert(lang === 'bn' ? 'নতুন ডিপিএস স্কিম সেবা অ্যাপে প্রক্রিয়াধীন।' : 'New DPS Scheme is processing in Sheba app.');
                      setSelectedAction(null);
                    }}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'নতুন ডিপিএস শুরু করুন' : 'Start New DPS Scheme'}
                  </button>
                </div>
              )}

              {/* Remittance Info */}
              {selectedAction === 'remittance' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <Globe className="w-5 h-5 text-indigo-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'প্রবাসী রেমিট্যান্স ও বোনাস' : 'Inward Remittance & Bonus'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-200">
                    <div className="text-xs font-bold text-emerald-950">
                      {lang === 'bn' ? 'বাংলাদেশ সরকারের ২.৫% সরাসরি নগদ প্রণোদনা' : '2.5% Direct Bangladesh Govt Incentive'}
                    </div>
                    <p className="text-xs text-emerald-800 mt-1">
                      {lang === 'bn'
                        ? 'প্রতি ১,০০,০০০ টাকা রেমিট্যান্সে গ্রাহক অতিরিক্ত ২,৫০০ টাকা বোনাস পাবেন সরাসরি সেবা ওয়ালেটে।'
                        : 'Receive ৳2,500 extra bonus for every ৳100,000 sent straight into your Sheba Wallet.'}
                    </p>
                  </div>

                  <div className="space-y-2 text-xs text-neutral-600">
                    <div><strong>সহযোগী এক্সচেঞ্জ:</strong> Western Union, MoneyGram, Ria, TapTap Send, Al Ansari</div>
                    <div><strong>সময়কাল:</strong> মাত্র কয়েক সেকেন্ডে ব্যাংক টু ওয়ালেট জমা</div>
                  </div>

                  <button
                    onClick={() => {
                      setBalance(balance + 5000);
                      const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
                      const remTrx: Transaction = {
                        id: `trx-${Date.now()}`,
                        trxId: `SHB${randomSuffix}`,
                        type: 'remittance',
                        titleBn: 'প্রবাসী রেমিট্যান্স ও সরকারি প্রণোদনা',
                        titleEn: 'Foreign Remittance + 2.5% Incentive',
                        recipient: 'Ria Money Transfer (রিয়াদ এক্সচেঞ্জ)',
                        amount: 5000,
                        fee: 0,
                        date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
                        status: 'completed',
                        balanceAfter: balance + 5000
                      };
                      setTransactions([remTrx, ...transactions]);
                      setLastReceipt(remTrx);
                      setSelectedAction(null);
                    }}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'সিমুলেট করুন: ৫,০০০ টাকা রেমিট্যান্স রিসিভ' : 'Simulate Receiving ৳5,000 Remittance'}
                  </button>
                </div>
              )}

              {/* QR Pay / Merchant Scanner Info */}
              {selectedAction === 'qr' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <QrCode className="w-5 h-5 text-purple-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'বাংলা কিউআর স্ক্যানার' : 'Bangla QR Scanner'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="text-center p-6 border-2 border-dashed border-neutral-300 rounded-xl space-y-3">
                    <div className="w-16 h-16 mx-auto bg-purple-50 text-purple-700 rounded-2xl flex items-center justify-center">
                      <QrCode className="w-8 h-8" />
                    </div>
                    <div className="text-xs text-neutral-600 max-w-sm mx-auto">
                      {lang === 'bn'
                        ? 'ক্যামেরা চালু করে যেকোনো বাংলা কিউআর (Bangla QR) স্ট্যান্ড স্ক্যান করুন'
                        : 'Point your camera at any interoperable Bangla QR merchant stand'}
                    </div>
                    <button
                      onClick={() => {
                        const paidAmount = 350;
                        setBalance(balance - paidAmount);
                        const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
                        const qrTrx: Transaction = {
                          id: `trx-${Date.now()}`,
                          trxId: `SHB${randomSuffix}`,
                          type: 'merchant_pay',
                          titleBn: 'আগামী গ্রোসারি বাংলা কিউআর পেমেন্ট',
                          titleEn: 'Agami Grocery Bangla QR Pay',
                          recipient: 'আউটলেট #3928, গুলশান',
                          amount: paidAmount,
                          fee: 0,
                          date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
                          status: 'completed',
                          balanceAfter: balance - paidAmount
                        };
                        setTransactions([qrTrx, ...transactions]);
                        setLastReceipt(qrTrx);
                        setSelectedAction(null);
                      }}
                      className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-lg text-xs cursor-pointer"
                    >
                      {lang === 'bn' ? 'টেস্ট কিউআর পেমেন্ট · shebabd.org (৳৩৫০)' : 'Scan & Pay · shebabd.org (৳350)'}
                    </button>
                  </div>
                </div>
              )}

              {/* Cash Out Info */}
              {selectedAction === 'cashout' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <ArrowDownToLine className="w-5 h-5 text-blue-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'ক্যাশ আউট (উদ্যোক্তা ও এটিএম)' : 'Cash Out (Agent & ATM)'}
                      </h3>
                    </div>
                    <button
                      onClick={() => setSelectedAction(null)}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-xl border border-emerald-500 bg-emerald-50/50">
                      <div className="text-xs font-bold text-emerald-900">
                        {lang === 'bn' ? 'সেবা অ্যাপ থেকে' : 'From Sheba App'}
                      </div>
                      <div className="text-lg font-extrabold text-emerald-700 font-mono-numbers mt-1">
                        ১.৪৯%
                      </div>
                      <div className="text-[11px] text-emerald-800">
                        {lang === 'bn' ? 'প্রতি হাজারে মাত্র ১৪.৯০ টাকা' : '৳14.90 per thousand'}
                      </div>
                    </div>

                    <div className="p-3.5 rounded-xl border border-neutral-200 bg-neutral-50/50">
                      <div className="text-xs font-bold text-neutral-800">
                        {lang === 'bn' ? 'ইউএসএসডি *266# থেকে' : 'Via USSD *266#'}
                      </div>
                      <div className="text-lg font-extrabold text-neutral-700 font-mono-numbers mt-1">
                        ১.৮৫%
                      </div>
                      <div className="text-[11px] text-neutral-500">
                        {lang === 'bn' ? 'প্রতি হাজারে ১৮.৫০ টাকা' : '৳18.50 per thousand'}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      const amount = 1000;
                      const fee = 14.90;
                      setBalance(balance - amount - fee);
                      const randomSuffix = Math.floor(10000000 + Math.random() * 90000000);
                      const cashOutTrx: Transaction = {
                        id: `trx-${Date.now()}`,
                        trxId: `SHB${randomSuffix}`,
                        type: 'cash_out',
                        titleBn: 'ক্যাশ আউট - মায়ের দোয়া টেলিকম এজেন্ট',
                        titleEn: 'Cash Out - Mayer Doa Telecom Agent',
                        recipient: 'এজেন্ট কোড: SHB-DHK-4012',
                        amount: amount,
                        fee: fee,
                        date: lang === 'bn' ? 'এইমাত্র' : 'Just now',
                        status: 'completed',
                        balanceAfter: balance - amount - fee
                      };
                      setTransactions([cashOutTrx, ...transactions]);
                      setLastReceipt(cashOutTrx);
                      setSelectedAction(null);
                    }}
                    className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-xl text-sm transition-colors cursor-pointer"
                  >
                    {lang === 'bn' ? 'সিমুলেট করুন: ১,০০০ টাকা ক্যাশ আউট' : 'Simulate ৳1,000 Cash Out'}
                  </button>
                </div>
              )}

              {/* USSD Dial Action */}
              {selectedAction === 'ussd' && (
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-3 border-b border-neutral-200">
                    <div className="flex items-center gap-2">
                      <PhoneCall className="w-5 h-5 text-emerald-700" />
                      <h3 className="text-lg font-bold text-neutral-900">
                        {lang === 'bn' ? 'বাটন ফোনের ইউএসএসডি কোড ডায়ালার' : 'Offline USSD Dial Simulator'}
                      </h3>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedAction(null);
                        setUssdDialog(null);
                      }}
                      className="text-neutral-400 hover:text-neutral-600 cursor-pointer"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="max-w-xs mx-auto text-center space-y-3">
                    <input
                      type="text"
                      value={ussdInput}
                      onChange={(e) => setUssdInput(e.target.value)}
                      className="w-full text-center text-2xl font-bold tracking-widest font-mono-numbers py-2 rounded-lg border border-neutral-300 bg-neutral-50"
                    />

                    <div className="grid grid-cols-3 gap-2">
                      {['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'].map((k) => (
                        <button
                          key={k}
                          onClick={() => setUssdInput((prev) => prev + k)}
                          className="py-2.5 bg-neutral-100 hover:bg-neutral-200 rounded-lg text-sm font-bold font-mono-numbers transition-colors cursor-pointer"
                        >
                          {k}
                        </button>
                      ))}
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                      <button
                        onClick={() => setUssdInput('')}
                        className="flex-1 py-2 text-xs font-semibold text-neutral-600 border border-neutral-300 rounded-lg cursor-pointer"
                      >
                        {lang === 'bn' ? 'মুছুন' : 'Clear'}
                      </button>
                      <button
                        onClick={handleDialUssd}
                        className="flex-1 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg cursor-pointer flex items-center justify-center gap-1.5"
                      >
                        <PhoneCall className="w-3.5 h-3.5" />
                        <span>{lang === 'bn' ? 'ডায়াল করুন' : 'Dial'}</span>
                      </button>
                    </div>

                    {ussdDialog && (
                      <div className="mt-4 p-4 bg-neutral-900 text-emerald-400 rounded-xl font-mono text-xs text-left whitespace-pre-line border border-neutral-700 shadow-inner">
                        {ussdDialog}
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Default View: Instructions & Quick Guides */}
              {!selectedAction && (
                <div className="space-y-4">
                  <div className="text-xs font-semibold text-emerald-800 uppercase tracking-wider">
                    {lang === 'bn' ? 'সিমুলেটরের নির্দেশিকা' : 'HOW TO TEST THIS SIMULATOR'}
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900">
                    {lang === 'bn'
                      ? 'বাস্তব এমএফএস লেনদেনের অভিজ্ঞতা'
                      : 'Experience Real-Time MFS Workflows'}
                  </h3>
                  <p className="text-sm text-neutral-600 leading-relaxed">
                    {lang === 'bn'
                      ? 'মোবাইল স্ক্রিনে "ব্যালেন্স জানতে ট্যাপ করুন" চেপে দেখুন। এরপর সেন্ড মানি, রিচার্জ, অথবা বিল পে বাটনে ক্লিক করে পিন দিয়ে লেনদেন করুন এবং ডিজিটাল রসিদ সংগ্রহ করুন।'
                      : 'Tap the oval button to view the unmasked balance. Choose any service from the phone grid to test the authentic flow, PIN validation, hold-to-confirm, and printable receipt.'}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <button
                      onClick={() => setSelectedAction('send')}
                      className="p-3 rounded-xl border border-neutral-200 hover:border-emerald-600 text-left transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center group-hover:bg-emerald-100">
                        <Send className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          {lang === 'bn' ? 'সেন্ড মানি টেস্ট' : 'Test Send Money'}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {lang === 'bn' ? '০ টাকা প্রিয় নম্বর ফি' : '0 BDT Priyo fee'}
                        </div>
                      </div>
                    </button>

                    <button
                      onClick={() => setSelectedAction('recharge')}
                      className="p-3 rounded-xl border border-neutral-200 hover:border-emerald-600 text-left transition-colors flex items-center gap-3 cursor-pointer group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 flex items-center justify-center group-hover:bg-orange-100">
                        <Zap className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="text-xs font-bold text-neutral-900">
                          {lang === 'bn' ? 'মোবাইল রিচার্জ' : 'Mobile Recharge'}
                        </div>
                        <div className="text-[11px] text-neutral-500">
                          {lang === 'bn' ? 'বান্ডেল ও ক্যাশব্যাক' : 'Bundles & Cashback'}
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Success Receipt Modal / Card (When transaction is made) */}
            {lastReceipt && (
              <div className="bg-emerald-50 border-2 border-emerald-500/50 rounded-2xl p-6 shadow-sm relative animate-in fade-in zoom-in-95 duration-200">
                <button
                  onClick={() => setLastReceipt(null)}
                  className="absolute top-4 right-4 text-neutral-400 hover:text-neutral-700 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-emerald-800 mb-3">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                  <span className="text-base font-bold">{t.simulator.successTitle}</span>
                </div>

                <div className="bg-white rounded-xl p-4 border border-emerald-100 space-y-2.5 text-xs text-neutral-700">
                  <div className="flex justify-between items-center pb-2 border-b border-neutral-100">
                    <span className="text-neutral-500">{t.simulator.trxId}:</span>
                    <div className="flex items-center gap-1.5 font-mono-numbers font-bold text-neutral-900">
                      <span>{lastReceipt.trxId}</span>
                      <button
                        onClick={() => handleCopyTrx(lastReceipt.trxId)}
                        className="text-neutral-400 hover:text-emerald-700 cursor-pointer"
                        title="Copy Transaction ID"
                      >
                        {copiedTrxId === lastReceipt.trxId ? (
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                        ) : (
                          <Copy className="w-3.5 h-3.5" />
                        )}
                      </button>
                    </div>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">{lang === 'bn' ? 'লেনদেনের ধরন:' : 'Type:'}</span>
                    <span className="font-semibold text-neutral-900">
                      {lang === 'bn' ? lastReceipt.titleBn : lastReceipt.titleEn}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">{lang === 'bn' ? 'প্রাপক / রেফারেন্স:' : 'Recipient:'}</span>
                    <span className="font-semibold font-mono-numbers text-neutral-900">
                      {lastReceipt.recipient}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">{lang === 'bn' ? 'টাকার পরিমাণ:' : 'Amount:'}</span>
                    <span className="font-bold text-emerald-700 font-mono-numbers text-sm">
                      ৳ {lastReceipt.amount.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-neutral-500">{t.simulator.fee}:</span>
                    <span className="font-mono-numbers text-neutral-900">
                      ৳ {lastReceipt.fee.toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center pt-2 border-t border-neutral-100">
                    <span className="font-semibold text-neutral-900">{t.simulator.newBalance}:</span>
                    <span className="font-bold text-neutral-900 font-mono-numbers text-sm">
                      ৳ {lastReceipt.balanceAfter.toLocaleString('en-US', { minimumFractionDigits: 2 })}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => setLastReceipt(null)}
                    className="px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                  >
                    {t.simulator.done}
                  </button>
                </div>
              </div>
            )}

            {/* Complete Statement Explorer */}
            <div className="bg-white rounded-2xl border border-neutral-200 p-6 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-neutral-900">
                  {lang === 'bn' ? 'লাইভ ডিজিটাল স্টেটমেন্ট ও হিস্টোরি' : 'Live Transaction Statement'}
                </h3>
                <button
                  onClick={() => {
                    setTransactions(INITIAL_TRANSACTIONS);
                    setBalance(14850.5);
                  }}
                  className="flex items-center gap-1 text-xs text-neutral-500 hover:text-emerald-700 cursor-pointer"
                  title="Reset demo data"
                >
                  <RefreshCw className="w-3.5 h-3.5" />
                  <span>{lang === 'bn' ? 'রিসেট' : 'Reset'}</span>
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-neutral-200 text-neutral-500 font-semibold">
                      <th className="pb-2">{lang === 'bn' ? 'বিবরণ' : 'Description'}</th>
                      <th className="pb-2">{lang === 'bn' ? 'প্রাপক/অ্যাকাউন্ট' : 'Recipient'}</th>
                      <th className="pb-2 text-right">{lang === 'bn' ? 'পরিমাণ' : 'Amount'}</th>
                      <th className="pb-2 text-right">{lang === 'bn' ? 'সময়' : 'Date'}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-neutral-100">
                    {transactions.map((trx) => (
                      <tr key={trx.id} className="hover:bg-neutral-50/60 transition-colors">
                        <td className="py-2.5 font-medium text-neutral-900">
                          {lang === 'bn' ? trx.titleBn : trx.titleEn}
                          <div className="text-[10px] text-neutral-400 font-mono-numbers">
                            TrxID: {trx.trxId}
                          </div>
                        </td>
                        <td className="py-2.5 font-mono-numbers text-neutral-600">
                          {trx.recipient}
                        </td>
                        <td
                          className={`py-2.5 text-right font-bold font-mono-numbers ${
                            trx.type === 'remittance' || trx.type === 'cash_in'
                              ? 'text-emerald-700'
                              : 'text-neutral-900'
                          }`}
                        >
                          {trx.type === 'remittance' || trx.type === 'cash_in' ? '+' : '-'}৳{' '}
                          {trx.amount.toLocaleString()}
                        </td>
                        <td className="py-2.5 text-right text-neutral-500 font-mono-numbers">
                          {trx.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
