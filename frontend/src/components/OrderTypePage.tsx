import React from 'react';

type OrderType = 'DINE_IN' | 'TAKEAWAY'; // match App.tsx and backend

interface Props {
  onSelectOrderType: (type: OrderType) => void;
}

const OrderTypePage: React.FC<Props> = ({ onSelectOrderType }) => {
  const orderTypes: { type: OrderType; label: string; emoji: string; desc: string }[] = [
    { type: 'DINE_IN', label: 'Dine In', emoji: '🍽️', desc: 'Enjoy your meal at the restaurant' },
    { type: 'TAKEAWAY', label: 'Take Away', emoji: '🥡', desc: 'Quick pickup, no waiting' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full">
        <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
          Choose Your Order Type
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {orderTypes.map((ot) => (
            <button
              key={ot.type}
              onClick={() => onSelectOrderType(ot.type)}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-xl transform hover:scale-105 transition-all border-2 border-transparent hover:border-red-500"
            >
              <div className="text-6xl mb-4">{ot.emoji}</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">{ot.label}</h3>
              <p className="text-gray-600">{ot.desc}</p>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OrderTypePage;
