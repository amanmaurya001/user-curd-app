export default function UsersLayout({ children }) {
  return (
    <div className="min-h-screen bg-black">
  {/* Navbar */}
      <div className="bg-black h-[7vh]  flex items-center justify-center">
        <div
          className="h-[80%] w-[99%] rounded-2xl border border-white/10"
          style={{
            background: "rgba(30, 30, 46, 0.8)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
        ></div>
      </div>

  
      <div className="h-[93vh] bg-black  ">
        {children}
      </div>

    </div>
  )
}