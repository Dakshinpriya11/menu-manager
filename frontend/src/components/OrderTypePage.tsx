import React from 'react';
import type { OrderType } from '../types';

interface Props {
  onSelectOrderType: (type: OrderType) => void;
}

const OrderTypePage: React.FC<Props> = ({ onSelectOrderType }) => {
  const orderTypes: (OrderType & {
    label: string;
    emoji: string;
    desc: string;
  })[] = [
    {
      id: 1,
      name: 'DINE_IN',
      price_modifier: 0,
      label: 'Dine In',
      emoji: '🍽️',
      desc: 'Enjoy your meal at the restaurant',
    },
    {
      id: 2,
      name: 'TAKEAWAY',
      price_modifier: 2,
      label: 'Take Away',
      emoji: '🥡',
      desc: 'Quick pickup, no waiting',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        {/* Page Title */}
        <h2 className="text-4xl md:text-5xl font-extrabold text-red-600 mb-12">
          Choose Your Order Type
        </h2>

        {/* Order Type Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {orderTypes.map((ot) => (
            <button
              key={ot.id}
              onClick={() => onSelectOrderType(ot)}
              className="bg-white rounded-2xl p-8 shadow-lg border-2 border-transparent hover:border-red-500 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-200"
            >
              <div className="text-6xl mb-4">{ot.emoji}</div>
              <h3 className="text-2xl font-bold text-red-600 mb-2">{ot.label}</h3>
              <p className="text-gray-600">{ot.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTypePage;
