import React, { useMemo } from 'react';

type Props = {
  registrantName: string;
  technicalContactName: string;
  administrativeContactName: string;
  contactEmail: string;
};

const ContactInformation = ({
  contactEmail,
  registrantName,
  technicalContactName,
  administrativeContactName,
}: Props) => {
  const contactInfo = useMemo(() => {
    return [
      { label: 'Registrant Name', value: registrantName || 'N/A' },
      { label: 'Technical Contact Name', value: technicalContactName || 'N/A' },
      {
        label: 'Administrative Contact Name',
        value: administrativeContactName || 'N/A',
      },
      { label: 'Contact Email', value: contactEmail },
    ];
  }, [
    registrantName,
    contactEmail,
    technicalContactName,
    administrativeContactName,
  ]);

  return (
    <div>
      <p className='text-lg font-semibold mb-2'>Contact Information</p>
      <table className='table-auto w-full text-sm border'>
        <tbody>
          {contactInfo.map(({ label, value }) => (
            <tr className='border-t ' key={label}>
              <td className='px-2 py-1 font-semibold text-gray-600 border-r'>
                {label}
              </td>
              <td className='px-2 py-1 text-wrap'>{value || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContactInformation;
