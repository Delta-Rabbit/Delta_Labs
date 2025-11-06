/**
 * Course Module - Route Guard
 * Protects routes and handles authorization
 */

import React, { useState, useEffect } from 'react';
import type { RouteGuard } from '../types/routeTypes';
import { LoadingSpinner } from '../../components/common/LoadingSpinner';

interface RouteGuardProps {
  guards?: RouteGuard[];
  routeParams?: Record<string, string>;
  children: React.ReactNode;
}

const RouteGuardComponent: React.FC<RouteGuardProps> = ({
  guards,
  routeParams = {},
  children,
}) => {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(true);
  const [redirectTo, setRedirectTo] = useState<string | null>(null);

  useEffect(() => {
    if (!guards || guards.length === 0) {
      setIsChecking(false);
      return;
    }

    const checkGuards = async () => {
      try {
        for (const guard of guards) {
          const result = await guard.check();
          
          if (!result) {
            setIsAuthorized(false);
            if (guard.redirectTo) {
              setRedirectTo(guard.redirectTo);
            }
            setIsChecking(false);
            return;
          }
        }
        
        setIsAuthorized(true);
      } catch (error) {
        console.error('Route guard error:', error);
        setIsAuthorized(false);
      } finally {
        setIsChecking(false);
      }
    };

    checkGuards();
  }, [guards]);

  if (isChecking) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <LoadingSpinner />
      </div>
    );
  }

  if (!isAuthorized) {
    if (redirectTo) {
      // In real implementation, would use navigation hook
      window.location.href = redirectTo;
      return null;
    }
    
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default RouteGuardComponent;

