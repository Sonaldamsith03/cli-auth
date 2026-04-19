import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Bell, 
  CheckCircle2, 
  AlertCircle, 
  Info, 
  X,
  Clock
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'warning' | 'info';
  timestamp: string;
}

export default function NotificationPanel({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [notifications, setNotifications] = React.useState<Notification[]>([
    {
      id: '1',
      title: 'Facility Booking Confirmed',
      message: 'Your request for Conference Room A has been approved for tomorrow.',
      type: 'success',
      timestamp: '2 mins ago'
    },
    {
      id: '2',
      title: 'System Maintenance',
      message: 'The Campus Hub will undergo scheduled maintenance at 02:00 AM UTC.',
      type: 'info',
      timestamp: '15 mins ago'
    },
    {
      id: '3',
      title: 'Ticket Priority escalated',
      message: 'Incident #4928 (Network Outage) has been escalated to HIGH priority.',
      type: 'warning',
      timestamp: '1 hour ago'
    }
  ]);

  const getIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle2 className="h-4 w-4 text-emerald-500" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-amber-500" />;
      default: return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/5 backdrop-blur-[2px] z-[99]"
          />
          <motion.div
            initial={{ opacity: 0, x: 20, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 20, scale: 0.95 }}
            className="absolute top-20 right-8 w-96 bg-white rounded-3xl border border-slate-200 shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] overflow-hidden z-[100] flex flex-col max-h-[600px]"
          >
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                  <Bell className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-extrabold tracking-tight text-slate-900 leading-none">Activity Stream</h3>
              </div>
              <Button 
                variant="ghost" 
                size="icon-sm" 
                onClick={onClose}
                className="text-slate-400 hover:text-slate-900 rounded-lg"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {notifications.map((n) => (
                <div 
                  key={n.id}
                  className="group flex gap-4 p-4 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-all cursor-pointer"
                >
                  <div className="mt-1">{getIcon(n.type)}</div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="text-sm font-bold text-slate-900">{n.title}</p>
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                        <Clock className="h-3 w-3" />
                        {n.timestamp}
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 font-medium leading-relaxed">{n.message}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-4 border-t border-slate-100 bg-slate-50/50">
              <Button className="w-full text-[11px] font-bold uppercase tracking-[0.1em] h-10 bg-black text-white rounded-xl">
                Archive All Notifications
              </Button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
