export function getHeaderText() {
  return {
    status: 'success',
    code: 200,
    result: {logo: 'KDDI Admin', text: 'レンタル衣装と中古販売'}
  };
}

export function getTopNavItemText() {
  return {
    status: 'success',
    code: 200,
    result: [
      {
        name: 'Logout',
        url: 'void:javascript',
        color: 'rental-item',
        badge: ''
      },
      {
        name: 'Notification',
        url: 'void:javascript',
        color: 'purchace-item',
        badge: '99'
      }
    ]
  };
}
