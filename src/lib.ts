export function calculate(input:{price:number;cost:number;referral:number;fulfilment:number;shipping:number;ads:number;units:number}) {
 const referralFee=input.price*input.referral/100;
 const profit=input.price-input.cost-referralFee-input.fulfilment-input.shipping-input.ads;
 const margin=input.price>0?profit/input.price*100:0;
 const roi=input.cost>0?profit/input.cost*100:0;
 const breakEvenAcos=input.price>0?(input.price-input.cost-referralFee-input.fulfilment-input.shipping)/input.price*100:0;
 return {profit,margin,roi,breakEvenAcos,monthlyProfit:profit*input.units};
}
export function opportunityScore(demand:number, margin:number, competition:number, rating:number) {
 const d=Math.max(0,Math.min(100,demand/30));
 const m=Math.max(0,Math.min(100,margin*2));
 const c=100-Math.max(0,Math.min(100,competition));
 const r=Math.max(0,Math.min(100,(rating/5)*100));
 return Math.round(d*.30+m*.35+c*.20+r*.15);
}
export function csvEscape(v:unknown){const s=String(v??"");return /[",\\n]/.test(s)?`"${s.replace(/"/g,'""')}"`:s;}
export function downloadCsv(name:string, rows:Record<string,unknown>[]){if(!rows.length)return;const keys=Object.keys(rows[0]);const csv=[keys.join(","),...rows.map(r=>keys.map(k=>csvEscape(r[k])).join(","))].join("\\n");const a=document.createElement("a");a.href=URL.createObjectURL(new Blob([csv],{type:"text/csv"}));a.download=name;a.click();URL.revokeObjectURL(a.href);}
