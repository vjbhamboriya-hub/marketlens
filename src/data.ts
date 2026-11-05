import type {Product} from "./types";
const seed = [
["B0DEMO1001","Bamboo Drawer Organizer Set","Storage",29.99,4.5,1280,410,"Low"],
["B0DEMO1002","Oil Sprayer Bottle for Cooking","Home & Kitchen",14.99,4.3,840,760,"Medium"],
["B0DEMO1003","Floating Wood Wall Shelves Set of 3","Furniture",34.99,4.6,940,530,"Low"],
["B0DEMO1004","Orthopedic Memory Foam Dog Bed","Pet",54.99,4.4,1680,2300,"High"],
["B0DEMO1005","Expandable Under Sink Organizer","Storage",27.99,4.2,1120,980,"Medium"],
["B0DEMO1006","Resistance Bands Set with Door Anchor","Sports",22.99,4.5,2140,5200,"High"],
["B0DEMO1007","Satin Pillowcase Pair","Beauty",18.99,4.4,760,640,"Low"],
["B0DEMO1008","Mid Century Accent Side Table","Furniture",69.99,4.7,420,180,"Low"],
["B0DEMO1009","Stainless Steel Insulated Bottle","Sports",24.99,4.3,1850,3400,"High"],
["B0DEMO1010","Cable Management Box with Lid","Electronics",19.99,4.2,1320,870,"Medium"],
["B0DEMO1011","Slow Feeder Dog Bowl","Pet",13.99,4.4,990,1100,"Medium"],
["B0DEMO1012","Heatless Hair Curling Set","Beauty",11.99,4.1,1530,1700,"High"]
] as const;
export const products:Product[] = seed.flatMap((p,i)=>["US","UK","CA","IN"].map((m,j)=>({id:`${i}-${m}`,asin:p[0],title:p[1],category:p[2],price:Math.round(p[3]*([1,.79,1.37,83][j])*100)/100, currency:["USD","GBP","CAD","INR"][j],rating:p[4],reviews:p[5]+j*83,monthlySales:p[6]+j*90,competition:p[7] as Product["competition"],score:Math.max(22,Math.min(96,88-Math.floor(p[5]/120)+j*2)),marketplace:m as Product["marketplace"],source:"DEMO" as const})));
