import React, { createContext, useContext, useState, ReactNode, useCallback, useEffect } from 'react';
import initialData from '@/assets/initContext.json';

interface CompletionContextType {
  completionStatus: Record<string, boolean>;
  setCompletionStatus: (page: string, status: boolean) => void;
  getFirstIncompletePage: () => string;
  getLastCompletePage: () => string;
}

interface ThresholdContextType {
  thresholdStatus: Record<string, boolean>;
  setThresholdStatus: (page: string, threshold: boolean) => void;
}

interface VisitedContextType {
  visitedStatus: Record<string, boolean>;
  setVisitedStatus: (page: string, visited: boolean) => void;
}

interface FileContextType {
  fileStatus: Record<string, boolean>;
  setFileStatus: (page: string, visited: boolean) => void;
}


interface OverrideContextType {
  overrideStatus: Record<string, boolean>;
  setOverrideStatus: (page: string, override: boolean) => void;
}


const CompletionContext = createContext<CompletionContextType | undefined>(undefined);
const ThresholdContext = createContext<ThresholdContextType | undefined>(undefined);
const VisitedContext = createContext<VisitedContextType | undefined>(undefined);
const FileContext = createContext<FileContextType | undefined>(undefined);
const OverrideContext = createContext<OverrideContextType | undefined>(undefined);

export const CompletionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

  const [completionStatus, setCompletionStatusState] = useState<Record<string, boolean>>(initialData.completionStatus);
  const [thresholdStatus, setThresholdStatusState] = useState<Record<string, boolean>>(initialData.thresholdStatus);
  const [visitedStatus, setVisitedStatusState] = useState<Record<string, boolean>>(initialData.visitedStatus);
  const [fileStatus, setFileStatusState] = useState<Record<string, boolean>>(initialData.fileStatus);
  const [overrideStatus, setOverrideStatusState] = useState<Record<string, boolean>>(initialData.overrideStatus);

  
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

  const setVisitedStatus = useCallback((page: string, visited: boolean) => {
    setVisitedStatusState((prevStatus) => ({
      ...prevStatus,
      [page]: visited,
    }));
  }, []);

  const setFileStatus = useCallback((page: string, file: boolean) => {
    setFileStatusState((prevStatus) => ({
      ...prevStatus,
      [page]: file,
    }));
  }, []);

  const setOverrideStatus = useCallback((page: string, override: boolean) => {
    setOverrideStatusState((prevStatus) => ({
      ...prevStatus,
      [page]: override,
    }));
  }, []);

  const getFirstIncompletePage = useCallback(() => {
    const pages = ['cci', 'ss', 'asa', 'frailty', 'result'];
    return pages.find((page) => !completionStatus[page]) || 'cci';
  }, [completionStatus]);

  const getLastCompletePage = useCallback(() => {
    const pages = ['frailty', 'asa', 'ss', 'cci'];
    return pages.find((page) => completionStatus[page]) || 'cci';
  }, [completionStatus]);

  return (
    <CompletionContext.Provider value={{ completionStatus, setCompletionStatus, getFirstIncompletePage, getLastCompletePage }}>
      <ThresholdContext.Provider value={{ thresholdStatus, setThresholdStatus }}>
        <VisitedContext.Provider value={{ visitedStatus, setVisitedStatus }}>
          <OverrideContext.Provider value={{ overrideStatus, setOverrideStatus }}>
            <FileContext.Provider value={{ fileStatus, setFileStatus }}>
              {children}
            </FileContext.Provider>
          </OverrideContext.Provider>
        </VisitedContext.Provider>
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

export const useVisitedStatus = () => {
  const context = useContext(VisitedContext);
  if (!context) {
    throw new Error('useVisitedStatus must be used within a CompletionProvider');
  }
  return context;
};

export const useOverrideStatus = () => {
  const context = useContext(OverrideContext);
  if (!context) {
    throw new Error('useOverrideStatus must be used within a CompletionProvider');
  }
  return context;
}

export const useFileStatus = () => {
  const context = useContext(FileContext);
  if (!context) {
    throw new Error('useFileStatus must be used within a CompletionProvider');
  }
  return context;
}