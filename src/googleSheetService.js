import axios from 'axios';

const SHEET_ID = '1eSQ0m5OCLYud_JBhkW26v-geKuCMOxEM-FCjIBxuuAw';
const API_KEY = 'AIzaSyAnWS12-i37cqFBWIqfHA8XASrU-0ahD80';
const RANGE = 'Sheet1!A2:G2';

export async function getInvestmentData() {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SHEET_ID}/values/${RANGE}?key=${API_KEY}`;

  try {
    const response = await axios.get(url);
    const values = response.data.values[0];

    return {
      currentValue: values[0],
      totalReturns: values[1],
      returnsPercent: values[2],
      invested: values[3],
      xirr: values[4],
      dayReturn: values[5],
      dayReturnPercent: values[6],
    };
  } catch (error) {
    console.error('Error fetching data from Google Sheets:', error);
    return {
      currentValue: '-',
      totalReturns: '-',
      returnsPercent: '-',
      invested: '-',
      xirr: '-',
      dayReturn: '-',
      dayReturnPercent: '-',
    };
  }
}
