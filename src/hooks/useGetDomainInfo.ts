import axios, { AxiosError } from 'axios';
import { useState } from 'react';

type Result = {
  domainName: string;
  registrarName: string;
  createdDate: string | Date;
  expiresDate: string | Date;
  estimatedDomainAge: number;
  hostNames: string[];
  registrant: string;
  technicalContact: string;
  administrativeContact: string;
  contactEmail: string;
  technicalContactName: string;
  registrantName: string;
  administrativeContactName: string;
};

const useGetDomainInfo = () => {
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const sendRequest = async ({
    domain,
    infoType,
  }: {
    domain: string;
    infoType: 'domain' | 'contact';
  }) => {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const res = await axios.get(
        `/api/lookup?domain=${domain}&type=${infoType}`
      );
      if (res.status === 200) {
        setResult(res.data);
      }
    } catch (err) {
      const errorMessage =
        err instanceof AxiosError
          ? err?.response?.data.message
          : 'Failed to fetch domain information.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { sendRequest, error, loading, result };
};

export default useGetDomainInfo;
