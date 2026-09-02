import React from 'react';

const DrinkMarquee = () => {
  const text = 'Pop Cola  ·  Pop Apple  ·  Pop Orange  ·  Pop Chapman  ·  Pop Up  ·  Pop Green Apple  ·  Pop Power  ·  ';
  const repeatedText = text.repeat(3); // Ensure it is wide enough to scroll smoothly

  return (
    <div className="w-full overflow-hidden bg-pop-red text-white py-4 border-y border-white/10 relative z-10 flex items-center">
      <div className="animate-marquee flex whitespace-nowrap">
        <span className="font-black text-2xl uppercase tracking-widest px-2">{repeatedText}</span>
        <span className="font-black text-2xl uppercase tracking-widest px-2">{repeatedText}</span>
      </div>
    </div>
  );
};

export default DrinkMarquee;
