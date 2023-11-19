export function toWords(num) {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine'];
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];
    const teens = ['Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen'];
  
    if (num === 0) {
      return 'zero';
    }
  
    let words = [];
  
    if (num >= 1000) {
      words.push(`${ones[Math.floor(num / 1000)]} thousand`);
      num %= 1000;
    }
  
    if (num >= 100) {
      words.push(`${ones[Math.floor(num / 100)]} hundred`);
      num %= 100;
    }
  
    if (num >= 20) {
      words.push(tens[Math.floor(num / 10)]);
      num %= 10;
    }
  
    if (num > 0) {
      if (num >= 10 && num <= 19) {
        words.push(teens[num - 10]);
      } else {
        words.push(ones[num]);
      }
    }
  
    return words.join(' ');
}