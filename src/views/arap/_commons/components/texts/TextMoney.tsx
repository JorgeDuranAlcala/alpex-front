import { TextBody2 } from '../../styles/TextBody2';

interface TextMoneyProps {
  amount: number | null;
  currency?: string;
}

export const TextMoney = ({ amount, currency }: TextMoneyProps) => {

  if (!amount) return null;

  return (
    <TextBody2>
      ${amount.toLocaleString('en-US', { minimumFractionDigits: 2 })} {currency}
    </TextBody2>
  )
}
