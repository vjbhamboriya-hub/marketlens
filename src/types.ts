export type Marketplace = "US"|"UK"|"CA"|"IN";
export type Product = {id:string;asin:string;title:string;marketplace:Marketplace;category:string;price:number;currency:string;rating:number;reviews:number;monthlySales:number;competition:"Low"|"Medium"|"High";score:number;source:"DEMO"|"MANUAL"|"CONNECTED"};
