import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import api from '../lib/api';

// حساب کاربری بازدیدکننده‌های سایت (جدا از ادمین‌ها)
const TOKEN_KEY = 'arshamai_customer_token';
const CustomerContext = createContext(null);

function readToken() {
  try {
    return window.localStorage.getItem(TOKEN_KEY) || '';
  } catch (e) {
    return '';
  }
}

function writeToken(value) {
  try {
    if (value) window.localStorage.setItem(TOKEN_KEY, value);
    else window.localStorage.removeItem(TOKEN_KEY);
  } catch (e) {
    // اگه ذخیره نشد، فقط تا بستن صفحه وارد می‌مونه
  }
}

export function authHeaders(token) {
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export function errorCode(error) {
  return (error && error.response && error.response.data && error.response.data.code) || 'generic';
}

export function CustomerProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [customer, setCustomer] = useState(null);
  const [ready, setReady] = useState(false);

  const saveToken = useCallback((value) => {
    writeToken(value);
    setToken(value);
  }, []);

  useEffect(() => {
    let alive = true;
    if (!token) {
      setCustomer(null);
      setReady(true);
      return undefined;
    }
    api
      .get('/customers/me', { headers: authHeaders(token) })
      .then((res) => {
        if (alive) setCustomer(res.data);
      })
      .catch((err) => {
        if (alive && err.response && err.response.status === 401) {
          writeToken('');
          setToken('');
          setCustomer(null);
        }
      })
      .finally(() => {
        if (alive) setReady(true);
      });
    return () => {
      alive = false;
    };
  }, [token]);

  const value = useMemo(() => {
    const headers = authHeaders(token);
    return {
      customer,
      token,
      ready,
      headers,
      async login(email, password) {
        const res = await api.post('/customers/login', { email, password });
        setCustomer(res.data.customer);
        saveToken(res.data.token);
        return res.data.customer;
      },
      async register(data) {
        const res = await api.post('/customers/register', data);
        setCustomer(res.data.customer);
        saveToken(res.data.token);
        return res.data.customer;
      },
      logout() {
        saveToken('');
        setCustomer(null);
      },
      async updateProfile(data) {
        const res = await api.put('/customers/me', data, { headers });
        setCustomer(res.data);
        return res.data;
      },
      async changePassword(currentPassword, newPassword) {
        await api.put('/customers/me/password', { currentPassword, newPassword }, { headers });
      },
    };
  }, [customer, token, ready, saveToken]);

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>;
}

export function useCustomer() {
  return useContext(CustomerContext);
}
