import * as React from "react";
const TabContext = React.createContext(null);

function useTabContext() {
  const context = React.useContext(TabContext);
  if (!context) {
    throw new Error("Tabs components must be used within a TabsProvider");
  }
  return context;
}

export function Tabs({ defaultTabId, children }) {
  const [activeTabId, setActiveTabId] = React.useState(defaultTabId);

  return (
    <TabContext.Provider value={{ activeTabId, setActiveTabId }}>
      {children}
    </TabContext.Provider>
  );
}

export function TabContent({ tabId, children }) {
  const { activeTabId } = useTabContext();

  if (activeTabId === tabId) {
    return <div className="tab-content">{children}</div>;
  }

  return null;
}

export function TabList({ children }) {
  return <div className="tab-list">{children}</div>;
}

export function TabTrigger({ tabId, children }) {
  const [isPending, startTransition] = React.useTransition();
  const { activeTabId, setActiveTabId } = useTabContext();

  const updateTab = () => {
    startTransition(() => {
      setActiveTabId(tabId);
    });
  };

  let className = "tab-button";

  if (tabId === activeTabId) {
    className += " active";
  }

  if (isPending) {
    className += " pending";
  }

  return (
    <button className={className} onClick={updateTab}>
      {children}
    </button>
  );
}
