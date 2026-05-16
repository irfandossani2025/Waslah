"use client";

import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis } from "recharts";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export function AnalyticsChart({
  title,
  description,
  data
}: {
  title: string;
  description: string;
  data: Array<{ month: string; revenue: number }>;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.36} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#e5ebe8" strokeDasharray="4 4" />
            <XAxis dataKey="month" stroke="#7a8480" />
            <Tooltip />
            <Area dataKey="revenue" fill="url(#chartFill)" stroke="#059669" strokeWidth={3} type="monotone" />
          </AreaChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
