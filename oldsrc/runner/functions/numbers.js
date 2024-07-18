/* 
  ┌─────────────────────────────────────────────────────────────────────────┐
  │ ECONSYS NUMBER FORMATTER.                                               │
  │ v1.0.0                                                                  │
  │ Copyright 2023-2024 Rafael S.R.                                        │
  │ Licensed under the Apache License, Version 2.0 (the "License");         │
  │                                                                         │        
  | The above copyright notice and this permission shall be included in all |
  | copies or substantial portions of the Software.                         |
  └─────────────────────────────────────────────────────────────────────────┘
 */

module.exports = (number) => {
  const numStr = number.toString();
  const [integerPart, decimalPart] = numStr.split(".");
  const integerPartWithCommas = parseInt(integerPart).toLocaleString();
  const result = `${integerPartWithCommas}.${decimalPart || "0"}`;
  return result;
};
