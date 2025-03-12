import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Separator } from '@/components/ui/separator';
import { Button } from '../ui/button';

function Plans() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const plans = [
    {
      id: 1,
      title: '',
      type:'Free',
      discount: '',
      description: 'Our Free Plan is great for getting a taste of what Prompt Canvas can do',
      features: ['Generate up to 5 prompts/month.', 'Limited to 5 saved prompts and favorites.'],
      button: "Start now"
    },
    {
      id: 2,
      title: '$100/year',
      type:'Pro',
      discount: '$120',
      description: 'The best option for users needing full access and value',
      features: ['$20 off for yearly subscribers. ', 'Unlimited prompts & response generation', 'Unlimited saved prompts', 'Unlimited saved favorites'],
      button: "Go pro now",
    },
    {
      id: 3,
      title: '$5/month',
      type:'Starter',
      discount: ' $10',
      description: 'For users looking for more freedom and flexibility',
      features: ['$5 off for first-time users ', 'Unlimited prompts & response generation', 'Unlimited saved prompts', 'Unlimited saved favorites'],
      button: "Get started"
    },
  ];

  const overlapPercentage = 0.04

  return (
    <div className="relative flex  lg:justify-center justify-start items-center overflow-x-scroll lg:overflow-hidden pb-6 pt-2  ">
      <div className="relative flex justify-center items-center">
        {plans.map((plan, index) => {
          const isMiddleCard = index === 1;
          const overlapValue = isMiddleCard ? '0%' : `${overlapPercentage * 100}%`;

          return (
            <motion.div
              key={plan.id}
              onMouseEnter={() => setHoveredCard(index)}
              onMouseLeave={() => setHoveredCard(null)}
              animate={{
                scale: hoveredCard === index ? 1.02 : 1,
                zIndex: hoveredCard === index ? 10 : isMiddleCard ? 5 : 1,
                backgroundColor: hoveredCard === index ? 'black' : 'white',
                color: hoveredCard === index ? 'white' : 'black',
              }}
              transition={{ duration: 0.1 }}
              className={`relative shadow-lg p-6 border rounded-lg transition-all cursor-pointer ${isMiddleCard ? 'z-10' : ''
                }`}
              style={{
                border: "1px solid #000000",
                width: '387px',
                textAlign: "center",
                height: isMiddleCard ? '564px' : '528px',
                marginLeft: index === 0 ? `-${overlapValue}` : 0,
                marginRight: index === 2 ? `-${overlapValue}` : 0,
                transformOrigin: isMiddleCard
                  ? 'center'
                  : index === 0
                    ? 'left'
                    : 'right',
              }}
            >
              <div className="flex flex-col h-full">
                <div className="flex-grow">
                  <h3 className="text-xl font-bold"><span>{plan.type}</span><span className='line-through ml-1 mr-1'>{plan.discount}</span>{plan.title}</h3>
                  <p className="text-xl mt-3 mb-4">{plan.description}</p>
                  <Separator />
                  <ul className="mt-4 space-y-2">
                    {plan.features.map((feature, i) => (
                      <React.Fragment key={i}>
                        <li className="text-sm">
                          <p className="mb-6 mt-8">{feature}</p>
                        </li>
                        <Separator />
                      </React.Fragment>
                    ))}
                  </ul>
                </div>
                    <div>
                <Button
                  className={`mt-8 transition-colors duration-300 inline-flex items-center justify-center px-4 py-2 ${hoveredCard === index
                      ? 'bg-white text-black hover:bg-white hover:text-black'
                      : 'bg-black text-white'
                    }`}
                >
                  {plan.button}
                </Button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>

  );
}

export default Plans;
