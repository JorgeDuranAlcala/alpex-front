import { useState } from 'react'
import { PaymentScheduleOption } from '../interfaces/PaymentScheduleOption'

type ScheduleFor = 'broker' | 'reinsurance'

export const usePaymentSchedule = () => {
  const [selectedPaymentSchedule, setSelectedPaymentSchedule] = useState<PaymentScheduleOption | null>(null)

  const [nextPaymentDate, setNextPaymentDate] = useState('')

  const handlePaymentScheduleChange = (value: PaymentScheduleOption, scheduleFor: ScheduleFor) => {
    setSelectedPaymentSchedule(value)

    if (scheduleFor === 'reinsurance') {
      // ?? Todo: se conectará a base de datos?
      setNextPaymentDate(new Date().toISOString())
    } else if (scheduleFor === 'broker') {
      // ?? Todo: se conectará a base de datos?
      setNextPaymentDate(new Date().toISOString())
    }
  }

  // const calculateDateByPaymentSchedule = () => {
  //   if (selectedPaymentSchedule === 'monthly') {
  //     return new Date();
  //   }

  return {
    selectedPaymentSchedule,
    nextPaymentDate,
    handlePaymentScheduleChange
  }
}
