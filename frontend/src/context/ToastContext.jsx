import {
  createContext,
  useContext,
  useState,
  useCallback,
  useRef,
} from "react";
import { BadgeCheck, AlertCircle } from "lucide-react";

const ToastContext = createContext(null);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToasterProvider!!");
  }
  return context;
};

export const ToasterProvider = ({ children }) => {
  const [toast, settoast] = useState({
    show: false,
    message: "",
    type: "success",
  });

  const timeoutRef = useRef(null);

  const showToast = useCallback((message, type = "success") => {
    console.log("showToast called:", message, type); 
    settoast({ show: true, message, type });

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(() => {
      settoast((prev) => ({ ...prev, show: false }));
    }, 3000);
  }, []);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <div
        className={`fixed bottom-6 right-6 flex items-center gap-3 px-5 py-3.5 rounded-xl shadow-lg transition-all duration-300 transform z-[9999] ${
          toast.show
            ? "translate-y-0 opacity-100"
            : "translate-y-8 opacity-0 pointer-events-none"
        } ${
          toast.type === "success"
            ? "bg-slate-900 text-white"
            : "bg-red-600 text-white"
        }`}
      >
        {toast.type === "success" ? (
          <BadgeCheck className="w-5 h-5 text-emerald-400" />
        ) : (
          <AlertCircle className="w-5 h-5 text-white" />
        )}
        <p className="font-medium text-sm">{toast.message}</p>
      </div>
    </ToastContext.Provider>
  );
};
