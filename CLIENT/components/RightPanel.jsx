
import { MessageCircle, User, Search, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';

function RightPanel() {
    return (
        <div className='flex flex-col gap-2 justify-end p-4 w-full h-full'>
            {/* <Chah /> */}
            <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">WhatsApp Clone</h1>
            </div>
            <div className="flex items-center space-x-4">
                <User size={24} className="text-green-500" />
                <div className="flex-grow p-2 border rounded-lg">
                    {/* <MessageCircle size={24} className="text-gray-400" /> */}
                    <div className="flex gap-2">
                        <Input
                            type="text"
                            placeholder="Type a message"
                            className="w-full p-2 outline-none rounded-xl"
                        />
                        <button className="p-2 hover:bg-secondary"><Send size={24} className="text-gray-600" /></button></div>
                </div>
            </div></div>
    );
}



export default RightPanel;
