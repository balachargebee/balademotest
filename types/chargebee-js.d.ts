declare interface ChargebeeJsInstance {
    setPortalSession: (fn: () => Promise<any>) => void;
    createChargebeePortal: () => { open: () => void };
}

declare interface ChargebeeConstructor {
    init: (config: {
        site: string;
        isItemsModel?: boolean;
    }) => ChargebeeJsInstance;
}

interface Window {
    cbInstance?: ChargebeeJsInstance;
    Chargebee: ChargebeeConstructor;
} 