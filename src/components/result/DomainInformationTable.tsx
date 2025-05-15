import { formatDate } from '@/utils/dateFormatter';
import { truncateName } from '@/utils/stringHelper';
import React, { useMemo } from 'react';

type Props = {
  domainName: string;
  registrarName: string;
  createdDate: string | Date;
  expiresDate: string | Date;
  estimatedDomainAge: number;
  hostNames: string[];
};

const DomainInformationTable = ({
  domainName,
  registrarName,
  createdDate,
  expiresDate,
  hostNames,
  estimatedDomainAge,
}: Props) => {
  const domainInfo = useMemo(() => {
    return [
      { label: 'Domain Name', value: domainName },
      { label: 'Registrar', value: registrarName },
      {
        label: 'Registration Date',
        value: formatDate({ date: createdDate }),
      },
      {
        label: 'Expiration Date',
        value: formatDate({ date: expiresDate }),
      },
      {
        label: 'Estimated Domain Age',
        value: estimatedDomainAge ? `${estimatedDomainAge} days` : 'N/A',
      },
      {
        label: 'Hostnames',
        value: truncateName(hostNames) || [],
      },
    ];
  }, [
    domainName,
    registrarName,
    createdDate,
    expiresDate,
    estimatedDomainAge,
    hostNames,
  ]);

  return (
    <div>
      <p className='text-lg font-semibold mb-2'>Domain Information</p>
      <table className='table-auto w-full text-sm border'>
        <tbody>
          {domainInfo.map(({ label, value }) => (
            <tr className='border-t' key={label}>
              <td className='px-2 py-1 font-semibold text-gray-600 border-r'>
                {label}
              </td>
              <td className='px-2 py-1'>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DomainInformationTable;
