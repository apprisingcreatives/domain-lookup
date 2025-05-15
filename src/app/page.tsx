'use client';
import React, { useMemo, useState } from 'react';
import { useGetDomainInfo } from '@/hooks';
import ContactInformationTable from '@/components/result/ContactInformationTable';
import DomainInformationTable from '@/components/result/DomainInformationTable';
import { isValidDomain } from '@/utils/stringHelper';
import CircularLoading from '@/components/common/CircularLoading';
import Input from '@/components/common/Input';
import SelectInput from '@/components/common/SelectInput';
import Button from '@/components/common/Button';

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
          hostNames={result.hostNames}
          registrarName={result.registrarName}
        />
      );
    }
  };

  const options = useMemo(() => {
    return [
      { label: 'Domain Information', value: 'domain' },
      {
        label: 'Contact Information',
        value: 'contact',
      },
    ];
  }, []);

  return (
    <div className='min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6'>
      <div className='w-full max-w-lg bg-white shadow-xl rounded-2xl p-8 space-y-6 border border-blue-100'>
        <h1 className='text-3xl font-bold text-center text-blue-700'>
          🔍 Domain Lookup Tool
        </h1>

        <div className='space-y-3'>
          <Input
            error={touched && Boolean(domain) && !isDomainValid}
            onChange={onInputChange}
            value={domain}
            helperText='Please enter a valid domain.'
            placeholder='e.g. example.com'
            onBlur={onInputBlur}
          />

          <SelectInput
            onChange={onChangeSelect}
            value={infoType}
            options={options}
          />

          <Button
            onClick={onLookUpClick}
            disabled={!domain || !isDomainValid}
            loading={loading}
          >
            {loading ? 'Looking up...' : 'Submit'}
          </Button>

          {error && <p className='text-red-500 text-sm text-center'>{error}</p>}
        </div>
        <div className='bg-gray-50 p-4 rounded-xl border border-gray-200 shadow-inner space-y-4'>
          {renderResultTable()}
        </div>
      </div>
    </div>
  );
}
