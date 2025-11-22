import { motion } from "framer-motion";

export function AuthCard({ title, children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-xl border"
    >
      <h1 className="text-2xl font-semibold mb-6 text-center">{title}</h1>
      {children}
    </motion.div>
  );
}
