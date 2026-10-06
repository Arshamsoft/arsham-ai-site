// تیکت‌هایی که مهمان‌ها (بدون حساب) فرستادن، تو همین مرورگر نگه داشته می‌شن تا بشه دوباره دیدشون
const KEY = 'arshamai_guest_tickets';

export function guestTickets() {
  try {
    const list = JSON.parse(window.localStorage.getItem(KEY) || '[]');
    return Array.isArray(list) ? list : [];
  } catch (e) {
    return [];
  }
}

export function rememberGuestTicket(ticket) {
  try {
    const list = guestTickets().filter((item) => item.id !== ticket.id);
    list.unshift(ticket);
    window.localStorage.setItem(KEY, JSON.stringify(list.slice(0, 30)));
  } catch (e) {
    // اگه ذخیره نشد، لینک پیگیری همچنان روی صفحه نمایش داده می‌شه
  }
}

export function ticketLink(ticket) {
  return ticket.key ? `/support/${ticket.id}?key=${ticket.key}` : `/support/${ticket.id}`;
}
