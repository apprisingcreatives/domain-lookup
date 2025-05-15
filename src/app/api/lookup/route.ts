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

    const { WhoisRecord } = data || {};
    const {
      contactEmail,
      technicalContact,
      administrativeContact,
      domainName,
      registrarName,
      createdDate,
      expiresDate,
      estimatedDomainAge,
      nameServers,
      registrant,
    } = WhoisRecord || {};

    if (type === 'contact') {
      return new Response(
        JSON.stringify({
          contactEmail: contactEmail ?? 'No contact email found.',
          technicalContactName: technicalContact?.name,
          administrativeContactName: administrativeContact?.name,
          registrantName: registrant?.name,
        }),
        { status: 200 }
      );
    } else {
      return new Response(
        JSON.stringify({
          domainName,
          registrarName,
          createdDate,
          expiresDate,
          estimatedDomainAge,
          nameServers,
          registrant,
          technicalContact,
          administrativeContact,
          contactEmail,
        }),
        { status: 200 }
      );
    }
  } catch (error) {
    const errorMessage =
      error instanceof Error ? error.message : 'Error fetching domain info';
    return new Response(JSON.stringify({ message: errorMessage }), {
      status: 500,
    });
  }
}
