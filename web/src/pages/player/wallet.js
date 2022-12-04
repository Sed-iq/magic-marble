import React, { useEffect } from 'react';

import { GetUser } from '../../utils';

export default function Wallet({ socket, username, isAdmin, changeUrl }) {
    useEffect(() => {
        const asyncFunc = async () => {
            const user = await GetUser(socket);
            if (!user || user.isAdmin === true) {
                changeUrl('/login');
            }
        }
        asyncFunc();
    }, [socket]);

    return (
        <main className="h-full overflow-y-auto">
            <div className="container px-6 mx-auto grid">
                <h2 className="my-6 text-2xl font-semibold text-gray-200">
                    Wallet
                </h2>
                <div className="px-4 py-3 mb-4 rounded-lg shadow-md bg-green-500">
                    <p className="text-sm text-white">
                        You can make a deposit or withdraw money from your wallet.
                    </p>
                </div>
                <div className='grid md:grid-cols-3 gap-2'>
                    <div className="md:col-span-1 px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800">
                        <h4 className="font-semibold text-gray-300">
                            Total value
                        </h4>
                        <div className='w-full h-full px-2 pt-2 pb-4'>
                            <h3 className="mt-2 text-2xl font-semibold text-gray-300">
                                0.00000000000 <span className='text-sm text-purple-500'>USDT</span>
                            </h3>
                            <p className="text-gray-400 my-2 mt-4">
                                =0.00000000000 <span className='text-sm'>BTC</span>
                            </p>
                            <p className="text-gray-400 my-2">
                                =0.00000000000 <span className='text-sm'>ETH</span>
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-2 px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800 overflow-hidden">
                        {/* TABLE OF transactions */}
                        <h4 className="font-semibold text-gray-300">
                            Transactions
                        </h4>
                        <div className='w-full h-full px-2 py-4'>
                            <table className="block w-full whitespace-no-wrap overflow-auto max-h-56 rounded">
                                <thead>
                                    <tr className="text-xs font-semibold tracking-wide text-left w-full text-gray-500 uppercase bg-gray-900 rounded">
                                        <th className="px-4 py-3">Action</th>
                                        <th className="px-4 py-3">Status</th>
                                        <th className="px-4 py-3">Amount</th>
                                        <th className="px-4 py-3 w-60">Date</th>
                                        <th className="px-4 py-3">Wallet</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-gray-800">
                                    <tr className="text-gray-100">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-purple-500">Deposit</p>
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            Completed
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0.00000000000
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            2021-01-01
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0x0000000000000000000000000000000000000000
                                        </td>
                                    </tr>
                                    <tr className="text-gray-100">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-purple-500">Deposit</p>
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            Completed
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0.00000000000
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            2021-01-01
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0x0000000000000000000000000000000000000000
                                        </td>
                                    </tr>
                                    <tr className="text-gray-100">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-purple-500">Deposit</p>
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            Completed
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0.00000000000
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            2021-01-01
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0x0000000000000000000000000000000000000000
                                        </td>
                                    </tr>
                                    <tr className="text-gray-100">
                                        <td className="px-4 py-3">
                                            <p className="font-semibold text-purple-500">Deposit</p>
                                        </td>
                                        <td className="px-4 py-3 text-xs">
                                            Completed
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0.00000000000
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            2021-01-01
                                        </td>
                                        <td className="px-4 py-3 text-sm">
                                            0x0000000000000000000000000000000000000000
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className='grid md:grid-cols-2 gap-2'>
                    <div className="w-full md:col-span-1 px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800">
                        <h4 className="font-semibold text-gray-300">
                            Deposit
                        </h4>
                        <div className='w-full h-full px-2 pt-2 pb-4'>
                            <h3 className="mt-2 text-sm text-center font-semibold text-gray-300">
                                Address
                            </h3>
                            <img src="/images/QR Code.png" alt="QR Code" className='w-32 h-32 mx-auto my-4' />
                            <p className="text-gray-400 text-center my-2 mt-4">
                                asfaskjlhakjfhalkfbakfhsakjfhakfhsafhsafa
                                <button className='text-purple-500 ml-2'>
                                    <i class="fa-regular fa-copy"></i>
                                </button>
                            </p>
                            <div className='text-center'>
                                <button className="bg-purple-500 text-gray-100 font-semibold rounded px-6 py-2 mt-2">Deposit</button>
                            </div>
                            <p className="text-gray-400 text-sm my-2 mt-4">
                                Send only USDT on this address, otherwise you will lost your coins forever.
                            </p>
                        </div>
                    </div>
                    <div className="md:col-span-1 px-4 py-3 mb-8 rounded-lg shadow-md bg-gray-800 overflow-hidden">
                        {/* TABLE OF transactions */}
                        <h4 className="font-semibold text-gray-300">
                            Withdraw
                        </h4>
                        <div className='w-full h-full px-2 py-4'>
                            {/* input box for address and amount  and then button of withdraw*/}
                            <div className="flex flex-col">
                                <label className="text-gray-300 text-sm font-semibold mb-2">Address</label>
                                <input type="text" className="border border-gray-900 bg-gray-900 rounded px-2 py-1 text-gray-300 focus:outline-none focus:border-purple-500" />
                            </div>
                            <div className="flex flex-col mt-4">
                                <label className="text-gray-300 text-sm font-semibold mb-2">Amount</label>
                                <input type="text" className="border border-gray-900 bg-gray-900 rounded px-2 py-1 text-gray-300 focus:outline-none focus:border-purple-500" />
                                <span className="text-gray-400 text-xs mt-2">Available Balance: 0.00000000000</span>
                            </div>
                            <div className='text-center'>
                                <button className="bg-purple-500 text-gray-100 font-semibold rounded px-6 py-2 mt-4">Withdraw</button>
                                <span className="text-gray-400 text-xs mt-2 block">Withdrawal fee: 2.5%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}