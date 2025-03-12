import React, { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { FiCreditCard } from "react-icons/fi";
import { BiLogoPaypal } from "react-icons/bi";
import { FaApple } from "react-icons/fa";
import PaymentForm from '@/components/forms/payment-form';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import './Payment.css';
import Plans from './Plans';
function PaymentDetails() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="payment-details-container">
      <h3 className="text-3xl font-semibold tracking-normal sm:text-2xl">
        Payment
      </h3>
      <p className="pb-2 text-muted-foreground">
        You can add your card details below and begin your Prompt Canvas journey!
      </p>
      <Separator />
      <div className="payment-details">
        {/* Left Side: Plan Details */}
        <div className="plan-details">
          <h4 className="text-xl font-bold text-start">Plan detail</h4>
          <p className="text-muted-foreground text-start">$10 monthly, charged monthly</p>
          <p className="text-muted-foreground text-start">Unlimited prompts & response generation</p>
          <p className="text-muted-foreground text-start">Unlimited saved prompts & favorites</p>
          <div className='flex-start'>
            <Button onClick={openModal} className="mt-4 mx-auto">Change Plan</Button>
          </div>


          {/* Modal for changing the plan */}
          {isModalOpen && (
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Select the plan that suits you</DialogTitle>
                </DialogHeader>
                <Plans />
              </DialogContent>
            </Dialog>
          )}
        </div>
        {/* Right Side: Payment Form */}
        <div className="payment-methods">
          <div className="payment-buttons">
            <Button variant="outline" className="payment-button">
              <FiCreditCard className="text-2xl" />
              <span>Card</span>
            </Button>
            <Button variant="outline" className="payment-button">
              <BiLogoPaypal className="text-2xl" />
              <span>PayPal</span>
            </Button>
            <Button variant="outline" className="payment-button">
              <FaApple className="text-2xl" />
              <span>Apple</span>
            </Button>
          </div>
          <PaymentForm />
        </div>
      </div>
    </div>
  );
}

export default PaymentDetails;
