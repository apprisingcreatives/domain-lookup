import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const domain = searchParams.get('domain');
  const type = searchParams.get('type');

  if (!domain) {
    return new Response(
      JSON.stringify({ message: 'Missing domain parameter' }),
      {
        status: 400,
      }
    );
  }

  const WHOIS_API_KEY = process.env.WHOIS_API_KEY;
  const endpoint = `https://www.whoisxmlapi.com/whoisserver/WhoisService`;
  const url = `${endpoint}?apiKey=${WHOIS_API_KEY}&domainName=${domain}&outputFormat=JSON`;

  try {
    const apiRes = await fetch(url);
    if (!apiRes.ok) {
      throw new Error('Failed to fetch from Whois API');
    }

    const data = await apiRes.json();
    if (!data)
      return new Response(JSON.stringify({ message: 'No data found.' }), {
        status: 400,
      });

    const WhoisRecord = data?.WhoisRecord ?? {};

    const domainInfo = {
      domainName: WhoisRecord.domainName ?? 'N/A',
      registrarName: WhoisRecord.registrarName ?? 'N/A',
      createdDate: WhoisRecord.createdDate ?? 'N/A',
      expiresDate: WhoisRecord.expiresDate ?? 'N/A',
      estimatedDomainAge: WhoisRecord.estimatedDomainAge,
      hostNames: WhoisRecord.nameServers?.hostNames ?? [],
    };

    const contactInfo = {
      contactEmail: WhoisRecord.contactEmail ?? 'N/A',
      technicalContactName: WhoisRecord.technicalContact?.name ?? 'N/A',
      administrativeContactName:
        WhoisRecord.administrativeContact?.name ?? 'N/A',
      registrantName: WhoisRecord.registrant?.name ?? 'N/A',
    };

    return new Response(
      JSON.stringify(type === 'contact' ? contactInfo : domainInfo),
      { status: 200 }
    );
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching domain info';
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }
}
