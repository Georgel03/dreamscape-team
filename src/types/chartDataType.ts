export type EmotionValues = {
  joy: number;
  fear: number;
  sadness: number;
  anger: number;
  surprise: number;
  calm: number;
};

export type ChartDataPoint = {
  occurredAt: string; 
  emotions: EmotionValues;
};