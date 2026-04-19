import React from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  CalendarDays, 
  Ticket, 
  Users, 
  Bell, 
  Settings, 
  LogOut,
  Menu,
  ChevronRight,
  Search,
  Command,
  HelpCircle
} from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import NotificationPanel from './NotificationPanel';

export default function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isNotificationsOpen, setIsNotificationsOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const menuItems = [
    { 
      label: 'Overview', 
      icon: LayoutDashboard, 
      path: '/dashboard', 
      roles: ['USER', 'ADMIN', 'TECHNICIAN'] 
    },
    { 
      label: 'Facility Bookings', 
      icon: CalendarDays, 
      path: '/dashboard/bookings', 
      roles: ['USER', 'ADMIN'] 
    },
    { 
      label: 'Maintenance Tickets', 
      icon: Ticket, 
      path: '/dashboard/tickets', 
      roles: ['TECHNICIAN', 'ADMIN', 'USER'] 
    },
    { 
      label: 'User Management', 
      icon: Users, 
      path: '/dashboard/users', 
      roles: ['ADMIN'] 
    },
  ];

  const filteredMenu = menuItems.filter(item => 
    !item.roles || (user && item.roles.includes(user.role))
  );

  const NavContent = () => (
    <div className="flex flex-col h-full bg-slate-50 border-r border-slate-200">
      <div className="flex items-center gap-3 px-6 py-10">
        <div className="flex h-8 w-8 items-center justify-center rounded bg-black text-white">
          <Command className="h-5 w-5" />
        </div>
        <span className="text-lg font-extrabold tracking-tighter text-slate-900 leading-none">SmartCampus.</span>
      </div>
      
      <div className="flex-1 px-4 space-y-8">
        <div>
          <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</p>
          <nav className="space-y-1">
            {filteredMenu.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2 text-sm font-semibold rounded-lg transition-all ${
                    isActive 
                      ? 'bg-white text-black shadow-sm border border-slate-200' 
                      : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${isActive ? 'text-blue-600' : 'text-slate-400'}`} />
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div>
           <p className="px-3 mb-2 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Administration</p>
           <nav className="space-y-1">
             <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
               <Settings className="h-4 w-4 text-slate-400" />
               Settings
             </button>
             <button className="w-full flex items-center gap-3 px-3 py-2 text-sm font-semibold text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all">
               <HelpCircle className="h-4 w-4 text-slate-400" />
               Support
             </button>
           </nav>
        </div>
      </div>

      <div className="p-4 border-t border-slate-200">
        <div className="flex items-center gap-3 p-2 rounded-xl border border-slate-200 bg-white">
          <Avatar className="h-9 w-9 border border-slate-100">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900 truncate">{user?.name}</p>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">{user?.role}</p>
          </div>
          <Button 
            variant="ghost" 
            size="icon-sm" 
            onClick={handleLogout}
            className="text-slate-400 hover:text-red-600 hover:bg-red-50"
          >
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-white">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 shrink-0">
        <NavContent />
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-slate-200 bg-white/80 backdrop-blur-md flex items-center justify-between px-6 sticky top-0 z-20">
          <div className="flex items-center gap-4">
            <Sheet>
              <SheetTrigger
                render={
                  <Button variant="ghost" size="icon" className="lg:hidden text-slate-500">
                    <Menu className="h-5 w-5" />
                  </Button>
                }
              />
              <SheetContent side="left" className="p-0 bg-slate-50 border-r border-slate-200 w-72">
                <NavContent />
              </SheetContent>
            </Sheet>
            
            <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-400 uppercase tracking-wider">
              <span>Operations</span>
              <ChevronRight className="h-3 w-3" />
              <span className="text-slate-900">
                {location.pathname.split('/').pop() || 'Overview'}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center bg-slate-100 rounded-full px-4 py-1.5 border border-slate-200 w-64 ring-offset-white focus-within:ring-1 focus-within:ring-slate-950 transition-all">
              <Search className="h-4 w-4 text-slate-400" />
              <input 
                type="text" 
                placeholder="Search anything..." 
                className="bg-transparent border-none text-xs text-slate-900 focus:ring-0 ml-2 w-full placeholder:text-slate-400 font-medium"
              />
            </div>
            
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setIsNotificationsOpen(true)}
              className="text-slate-500 hover:text-slate-900 relative"
            >
              <Bell className="h-5 w-5" />
              <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-blue-600 border-2 border-white" />
            </Button>
            
            <NotificationPanel 
              isOpen={isNotificationsOpen} 
              onClose={() => setIsNotificationsOpen(false)} 
            />
            
            <div className="lg:hidden h-8 w-8 rounded-full overflow-hidden border border-slate-200">
              <Avatar className="h-full w-full">
                <AvatarImage src={user?.avatar} />
                <AvatarFallback>{user?.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-slate-50/50">
          <div className="p-6 lg:p-12 max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
