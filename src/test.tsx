import { useEffect } from 'react';

export function Test() {
  useEffect(() => {
    console.log('App is mounted');
  }, []);

  return <div>Test Page</div>;
} 