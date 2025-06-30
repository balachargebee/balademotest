declare interface ChargebeeJsInstance {
    setPortalSession: (fn: () => Promise<any>) => void;
    createChargebeePortal: () => { open: () => void };
}

interface Window {
    cbInstance?: ChargebeeJsInstance;
} 