
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', receita: 35000 },
  { name: 'Fev', receita: 42000 },
  { name: 'Mar', receita: 38000 },
  { name: 'Abr', receita: 45000 },
  { name: 'Mai', receita: 52000 },
  { name: 'Jun', receita: 48000 },
];

export const RevenueChart: React.FC = () => {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Receita Mensal</CardTitle>
        <CardDescription>Evolução da receita nos últimos 6 meses</CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip 
              formatter={(value) => [`R$ ${Number(value).toLocaleString('pt-BR')}`, 'Receita']}
            />
            <Line 
              type="monotone" 
              dataKey="receita" 
              stroke="hsl(var(--primary))" 
              strokeWidth={2}
              dot={{ fill: 'hsl(var(--primary))' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
