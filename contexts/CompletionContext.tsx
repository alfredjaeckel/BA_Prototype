import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';

interface CompletionContextType {
  completionStatus: Record<string, boolean>;
  setCompletionStatus: (page: string, status: boolean) => void;
  getFirstIncompletePage: () => string;
}

interface ThresholdContextType {
  thresholdStatus: Record<string, boolean>;
  setThresholdStatus: (page: string, threshold: boolean) => void;
}

const CompletionContext = createContext<CompletionContextType | undefined>(undefined);
const ThresholdContext = createContext<ThresholdContextType | undefined>(undefined);

export const CompletionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [completionStatus, setCompletionStatusState] = useState<Record<string, boolean>>({
    cci: false,
    ss: false,
    asa: false,
    frailty: false,
    result: false,
  });

  const [thresholdStatus, setThresholdStatusState] = useState<Record<string, boolean>>({
    cci: false,
    ss: false,
    asa: false,
    frailty: false,
    result: false,
  });

  const setCompletionStatus = useCallback((page: string, status: boolean) => {
    setCompletionStatusState((prevStatus) => ({
      ...prevStatus,
      [page]: status,
    }));
  }, []);

  const setThresholdStatus = useCallback((page: string, threshold: boolean) => {
    setThresholdStatusState((prevStatus) => ({
      ...prevStatus,
      [page]: threshold,
    }));
  }, []);

  const getFirstIncompletePage = useCallback(() => {
    const pages = ['cci', 'ss', 'asa', 'frailty', 'result'];
    return pages.find((page) => !completionStatus[page]) || 'cci';
  }, [completionStatus]);

  return (
    <CompletionContext.Provider value={{ completionStatus, setCompletionStatus, getFirstIncompletePage }}>
      <ThresholdContext.Provider value={{ thresholdStatus, setThresholdStatus }}>
        {children}
      </ThresholdContext.Provider>
    </CompletionContext.Provider>
  );
};

export const useCompletionStatus = () => {
  const context = useContext(CompletionContext);
  if (!context) {
    throw new Error('useCompletionStatus must be used within a CompletionProvider');
  }
  return context;
};

export const useThresholdStatus = () => {
  const context = useContext(ThresholdContext);
  if (!context) {
    throw new Error('useThresholdStatus must be used within a CompletionProvider');
  }
  return context;
};
