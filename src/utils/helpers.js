import React from 'react';

export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'INR',
  }).format(number);
};

export const formatAddress = (data) => {
  const { address, city, state, country, pinCode } = data;
  return `${address}, ${city}, ${state} - ${pinCode}, ${country}`;
};

export const getOrderStatusColor = (status) => {
  if (status === 'processing') {
    return 'orange';
  }
  if (status === 'rejected') {
    return 'red';
  }
  return 'green';
};

export const getAdminPrivilegeColor = (privilege) => {
  if (privilege === 'super') {
    return 'green';
  }
  if (privilege === 'moderate') {
    return 'blue';
  }
  if (privilege === 'low') {
    return 'brown';
  }
};

export const FormattedDate = (dateString ) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'short' });
    const year = date.getFullYear();
    
    const hours = date.getHours();
    const minutes = date.getMinutes();
    
    // Convert 24-hour time to 12-hour time
    const ampm = hours >= 12 ? 'pm' : 'am';
    const formattedHour = hours % 12 || 12; // convert 0 to 12 for midnight
    
    return `${day} ${month} ${year} ${formattedHour}:${minutes.toString().padStart(2, '0')} ${ampm}`;
  };

  return (
    <span>{formatDate(dateString)}</span>
  );
};

