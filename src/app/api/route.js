import { NextResponse } from "next/server";
import Airtable from "airtable";

const fetchAirtableData = async () => {
    const base = new Airtable({ apiKey: process.env.AIRTABLE_TOKEN }).base(process.env.AIRTABLE_BASE_ID);
    const records = await base('Cards').select({}).all();
    const processedData = records.map((record) => {
      return {
        id: record.id,
        name: record.fields.Name,
        acquisitionDate: record.fields.AcquisitionDate,
        function: record.fields.Function,
        storage: record.fields.Storage,
        fragility: record.fields.Fragility,
        exhibition: record.fields.OnExhibition,
        media: record.fields.Media,
      };
    });
    console.log('Processed Data:', processedData);
    return processedData;
}

export async function GET(request) {
    try {
        const airtableData = await fetchAirtableData();
        return new NextResponse(JSON.stringify({ result: airtableData }), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.error('Error fetching Airtable data:', error);
        return new NextResponse(JSON.stringify({ error: 'Failed to fetch Airtable data', details: error.toString() }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    }
}
