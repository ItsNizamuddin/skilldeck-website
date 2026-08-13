import { Check, X } from 'lucide-react';

export const RenderValue = ({ value }: { value: any }) => {
    const isEnabled = value === true || value === 'enabled';
    const isDisabled = value === false || value === 'disabled';

    if (isEnabled) {
        return (
            <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Check className="w-4 h-4 text-green-600" />
                </div>
            </div>
        );
    }

    if (isDisabled) {
        return (
            <div className="flex justify-center">
                <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                    <X className="w-4 h-4 text-red-400" />
                </div>
            </div>
        );
    }

    if (value === null || value === undefined || value === '') {
        return (
            <div className="flex justify-center">
                <X className="w-4 h-4 text-red-300" />
            </div>
        );
    }
    return <span className="text-gray-900 font-medium text-center block">{String(value)}</span>;
};
