import React from 'react';
import Card from '../../components/ui/Card';

const Settings: React.FC = () => {
    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <h1 className="text-3xl font-black tracking-tight text-brand-black">Platform Settings</h1>
            <p className="text-sm font-medium text-brand-grey mt-1">Manage notifications, billing, and system preferences.</p>
            
            <Card className="flex h-64 items-center justify-center border-dashed border-2 bg-transparent shadow-none">
                <span className="text-brand-grey font-mono text-sm uppercase tracking-widest">[ Settings Form Construction ]</span>
            </Card>
        </div>
    );
};
export default Settings;
