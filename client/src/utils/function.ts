import { ChangeEvent } from "react";

export const allowNumber = (e: ChangeEvent<HTMLInputElement>) => {
  const value = e.target.value;
  let sanitizedValue = value.replace(/[^0-9.]/g, '');
  if (sanitizedValue.startsWith('.')) {
    sanitizedValue = '0' + sanitizedValue;
  }
  sanitizedValue = sanitizedValue.replace(/(\..*?)\..*/g, '$1');
  e.target.value = sanitizedValue;
};

export function currencyFormatter(value: number) {
  const formatter = new Intl.NumberFormat('es-NI', {
    style: 'currency',
    minimumFractionDigits: 2,
    currency: "NIO"
  })
  return formatter.format(value)
}
