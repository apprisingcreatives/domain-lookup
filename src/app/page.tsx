'use client';
import React, { useMemo, useState } from 'react';
import { useGetDomainInfo } from '@/hooks';
import ContactInformationTable from '@/components/result/ContactInformationTable';
import DomainInformationTable from '@/components/result/DomainInformationTable';
import { isValidDomain } from '@/utils/stringHelper';
import CircularLoading from '@/components/common/CircularLoading';

export default function DomainLookupPage() {
  const [submittedInfoType, setSubmittedInfoType] = useState<
    'domain' | 'contact'
  >('domain');
  const [domain, setDomain] = useState('');
  const [infoType, setInfoType] = useState<'domain' | 'contact'>('domain');
  const [touched, setTouched] = useState(false);
  const { sendRequest, error, loading, result } = useGetDomainInfo();

  const isDomainValid = useMemo(() => {
    return isValidDomain(domain);
  }, [domain]);

  const onLookUpClick = () => {
    if (!isDomainValid) return;
    sendRequest({ domain, infoType });
    setSubmittedInfoType(infoType);
  };

  const onChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInfoType(e.target.value as 'domain' | 'contact');
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDomain(e.target.value);
  };

  const onInputBlur = () => {
    setTouched(true);
  };

  const renderResultTable = () => {
    if (loading) {
      return <CircularLoading size='lg' />;
    }

    if (!result) return null;

    if (submittedInfoType === 'contact') {
      return (
        <ContactInformationTable
          administrativeContactName={result.administrativeContactName}
          contactEmail={result.contactEmail}
          registrantName={result.registrantName}
          technicalContactName={result.technicalContactName}
        />
      );
    } else {
      return (
        <DomainInformationTable
          createdDate={result.createdDate}
          domainName={result.domainName}
          estimatedDomainAge={result.estimatedDomainAge}
          expiresDate={result.expiresDate}
          hostNames={result.nameServers.hostNames}
          registrarName={result.registrarName}
        />
      );
    }
  };

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-blue-100'>
        <h1 className='text-3xl font-bold text-center text-blue-700'>
          🔍 Domain Lookup Tool
        </h1>

        <div className='space-y-3'>
          <input
            type='text'
            placeholder='e.g. example.com'
            value={domain}
            onChange={onInputChange}
            onBlur={onInputBlur}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          />
          {touched && domain && !isDomainValid && (
            <p className='text-red-500 text-sm'>Please enter a valid domain.</p>
          )}
          <select
            value={infoType}
            onChange={onChangeSelect}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition'
          >
            <option value='domain'>Domain Information</option>
            <option value='contact'>Contact Information</option>
          </select>
          <button
            onClick={onLookUpClick}
            disabled={!domain || !isDomainValid || loading}
            className='w-full py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition font-medium cursor-pointer disabled:pointer-events-none'
          >
            {loading ? 'Looking up...' : 'Submit'}
          </button>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        </div>
        <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner space-y-4'>
          {renderResultTable()}
        </div>
      </div>
    </div>
  );
}
