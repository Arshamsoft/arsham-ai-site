// frontend/src/components/VisitTracker.js
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../lib/api';

function getVisitorId() {
  let id = localStorage.getItem('visitor_id');
  if (!id) {
    id = crypto.randomUUID();
    localStorage.setItem('visitor_id', id);
  }
  return id;
}

export default function VisitTracker() {
  const location = useLocation();

  useEffect(() => {
    const visitorId = getVisitorId();
    api.post('/analytics/track', { path: location.pathname, visitorId }).catch(() => {});
  }, [location.pathname]);

  useEffect(() => {
    const visitorId = getVisitorId();
    const ping = () => api.post('/analytics/heartbeat', { visitorId }).catch(() => {});
    ping();
    const interval = setInterval(ping, 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return null;
}