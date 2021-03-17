import "./styles.css";
import React from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ReferenceLine,
  AreaChart,
  Area
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
    pv: 2400,
    amt: 2400
  },
  {
    name: "Page B",
    uv: 3000,
    pv: 1398,
    amt: 2210
  },
  {
    name: "Page C",
    uv: 2000,
    pv: 9800,
    amt: 2290
  },
  {
    name: "Page D",
    uv: 2780,
    pv: 3908,
    amt: 2000
  },
  {
    name: "Page E",
    uv: 1890,
    pv: 4800,
    amt: 2181
  },
  {
    name: "Page F",
    uv: 2390,
    pv: 3800,
    amt: 2500
  },
  {
    name: "Page G",
    uv: 3490,
    pv: 4300,
    amt: 2100
  }
];


export default function App() {

  let avg = 0;
  let stddev = 0;
  const Min = Math.min(...data.map((i) => i.uv));
  const Max = Math.max(...data.map((i) => i.uv));
  
  for ( let i = 0; i < data.length; i++) {
      
      avg+= data[i].uv;
  }
  avg = avg / data.length;
  
     
  for ( let i = 0; i < data.length; i++) {
    
    stddev += (data[i].uv - avg)**2;
      
  }
  stddev = Math.sqrt(stddev / data.length);

  // can be "-", so Abs for All is mistake
  const  Offhigher = (Max - avg - stddev)/Math.abs(Max - Min); 
  
  const  Offinside = (2*stddev) / Math.abs(Max - Min);
  const  Offlower = Math.abs((Min - (avg - stddev))/(Max - Min));
  
 
return (

<AreaChart
      width={500}
      height={400}
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0
      }}
      
    >
      <CartesianGrid strokeDasharray="1 1" />
      <XAxis dataKey="name" />
      <YAxis 
      type="number" domain={ [dataMin => ((dataMin)), dataMax => (dataMax)]}
      />
      
      <Tooltip />
      <defs>
        <linearGradient id="splitColor" x1="0" y1="0" x2="0" y2="1">
      
        <stop offset={Offhigher} stopColor="red" stopOpacity={1} />
        <stop offset={Offhigher} stopColor="cyan" stopOpacity={1} />
        <stop offset={(Offhigher+Offinside)} stopColor="cyan" stopOpacity={1} />
        <stop offset={(Offhigher+Offinside)} stopColor="red" stopOpacity={1} />
        <stop offset={(Offhigher+Offinside+Offlower)} stopColor="red" stopOpacity={1} />
        <stop offset={(Offhigher+Offinside+Offlower)} stopColor="white" stopOpacity={1} />
       
        </linearGradient>
      </defs>
      <Area
        baseLine={avg}
        type="monotone"
        dataKey="uv"
        stroke="#000"
        fill="url(#splitColor)"
                
      />

      <ReferenceLine
          y={avg}
         label={{
           position: "center",
         value: "average"
          }}
          strokeDasharray="20 5"
        />

      <ReferenceLine
          y={avg+stddev}
         label={{
           position: "center",
         value: "average + stddeviation"
          }}
          stroke="#d99"
          strokeDasharray="20 5"
        />

      <ReferenceLine
          y={avg-stddev}
         label={{
           position: "center",
         value: "average - stddeviation"
          }}
          stroke="#d99"
          strokeDasharray="20 5"
      />

    </AreaChart>
 
  );
}
